import { useSelector } from "react-redux";
import TextTranslation from "../constants/TextTranslation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const PostFilter = ({
  postId,
  setPostId,
  postTitle,
  setPostTitle,
  handleReset,
}) => {
  const lang = useSelector((state) => state.language);

  const customBodyStyle = {
    padding: "15px 0 10px 0",
    display: "flex",
    flexDirection: lang.langIndex === 2 ? "row-reverse" : "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "static",
    flexWrap: "wrap",
    margin: "6px",
  };

  const outerStyle = {
    border: "1px solid #014493",
    borderRadius: "20px",
    marginTop: "10px",
  };

  const customPlaceholderStyle = {
    textAlign: lang.langIndex === 2 ? "right" : "left",
    paddingRight: 10,
  };

  return (
    <div style={{ padding: "30px", width: "fitContent" }}>
      <form>
        <Box style={outerStyle}>
          <div style={customBodyStyle}>
            <TextField
              id="outlined-basic"
              style={customPlaceholderStyle}
              label="Post ID"
              variant="outlined"
              value={postId}
              onChange={(e) => {
                setPostId(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              style={customPlaceholderStyle}
              label="Post Title"
              variant="outlined"
              value={postTitle}
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
            <Button
              variant="contained"
              style={{ margin: 10 }}
              onClick={handleReset}
            >
              {TextTranslation.reset[lang.langIndex]}
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default PostFilter;
