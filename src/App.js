import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YouTubeIcon from "@material-ui/icons/YouTube";
import React, { useState } from "react";
import "./styles.css";

const resources = {
  headerText: "YouTube 재생목록 자동생성",
  titleLabel: "제목",
  titlePlaceholder: "재생목록의 제목을 입력하세요.",
  textAreaPlaceholder:
    "재생목록에 들어갈 영상의 링크를 전부 붙여넣기 하세요. 링크 외에 다른 텍스트가 섞여 들어가도 무방하며 엔터, 띄어쓰기, 콤마 등으로 구분하세요.",
  resultExampleTitle: "예시:",
  resultExampleText: [
    "[홍길동] [오후 12:38] https://youtu.be/XXXXXXXXXXX",
    "https://www.youtube.com/watch?v=YYYYYYYYYYY,https://www.youtube.com/watch?v=ZZZZZZZZZZZ",
  ],
  resultTitle: "자동생성 주소:",
  resultHelpText: [
    "* 마우스 오른쪽 버튼을 클릭하여 링크 복사를 선택하세요",
    "(YouTube 화면에서 공유해버리면 시간이 지나면 사라집니다.)",
  ],
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    padding: "2em 1em",
    width: "100%",
    "@media screen and (min-width: 800px)": {
      margin: "0 auto",
      maxWidth: "800px",
    },
  },
  titleField: {
    marginBottom: "1em",
  },
  playlistArea: {
    flex: "10em",
    minHeight: "2em",
  },
  submit: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    margin: "20px",
    padding: "0 30px",
  },
  result: {
    whiteSpace: "pre-line",
    overflowWrap: "break-word",
  },
});

export default function App() {
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [playlist, setPlayList] = useState();
  const [label, setLabel] = useState(resources.titleLabel);
  const [url, setUrl] = useState();

  function onSubmit() {
    let re = new RegExp(
      "(https://www.youtube.com/watch.v=|https://youtu.be/)(\\S{11})",
      "g"
    );
    var ids = [];
    console.log(playlist);
    var m;
    while ((m = re.exec(playlist)) !== null) {
      let id = m[2];
      console.log(id);
      if (id) ids.push(id);
    }
    ids = ids.join(",");
    var url = `http://www.youtube.com/watch_videos?video_ids=${ids}`;
    if (title) {
      url += "&title=" + encodeURI(title);
    }
    setUrl(url);
  }

  return (
    <Box className={`App ${classes.root}`} boxShadow={1}>
      <h2>
        <YouTubeIcon />
        {resources.headerText}
      </h2>
      <TextField
        className={classes.titleField}
        onChange={(e) => setTitle(e.target.value)}
        label={label}
        placeholder={resources.titlePlaceholder}
        size={800}
        value={title}
      />
      <TextareaAutosize
        className={classes.playlistArea}
        onChange={(e) => setPlayList(e.target.value)}
        placeholder={resources.textAreaPlaceholder}
        value={playlist}
      />
      {url ? (
        <div className={classes.result}>
          <h3>{resources.resultTitle}</h3>
          <a href={url} rel="noreferrer" target="_blank">
            {url}
          </a>
          {"\n"}
          {resources.resultHelpText.join("\n")}
        </div>
      ) : (
        <Typography className={classes.result}>
          <h3>{resources.resultExampleTitle}</h3>
          {resources.resultExampleText.join("\n")}
        </Typography>
      )}
    </Box>
  );
}
