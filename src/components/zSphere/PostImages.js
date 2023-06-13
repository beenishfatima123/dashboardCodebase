import React from "react";
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { baseUrl } from "../constants/baseUrls";
const PostImages = ({ images }) => {

  return (
    <Box sx={{ width: "100%" }}>
      <ImageList variant="quilted" cols={images?.length >= 2 ? 2 : 1} gap={8}>
        {images?.map((item, index) => (
          <ImageListItem key={index}>
            <img
              src={`${baseUrl}/${item?.image}`}
              alt={item.name}
              loading="lazy"
              style={{
                borderRadius: 4,
                cursor: "pointer",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default PostImages;
