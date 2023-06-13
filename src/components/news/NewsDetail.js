import React, { useEffect } from "react";
import Layout from "../../customComponents/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewsDetail, newsDetail } from "../../features/newsSlice";
import { baseUrl } from "../constants/baseUrls";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../customComponents/Loader";
import { DEFAULT_AVATAR } from "../constants/global";
import {
  Avatar,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";

const NewsDetail = () => {
  const newsParams = useParams();

  const dispatch = useDispatch();
  const { dataDetail, isLoading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsDetail(newsParams.id));
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap="20px"
          padding={"10px"}
          width="100%"
          margin="20px auto"
        >
          {/* Thumbail Image */}
          <img
            width="100%"
            height="250px"
            style={{ objectFit: "cover" }}
            src={`${baseUrl}/${dataDetail?.result?.feature_photo}`}
            alt=""
          />
          {/* User Avatar */}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="10px"
            padding={"10px"}
            backgroundColor="#E8E8E8"
            width="100%"
            borderRadius={2}
          >
            <Avatar
              alt={dataDetail?.result?.user_name}
              src={
                dataDetail?.result?.author?.photo
                  ? `${baseUrl}/${dataDetail?.result?.author?.photo}`
                  : { DEFAULT_AVATAR }
              }
              sx={{ width: 56, height: 56 }}
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              padding={"10px"}
            >
              <Box component="span" fontWeight="bold">
                {dataDetail?.result?.author?.username}
              </Box>
              <Box component="span">
                Updated:{" "}
                {moment(new Date(dataDetail?.result?.updated_at)).format(
                  "MMM DD, YYYY"
                )}
              </Box>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", width: "5%", marginLeft: "auto"}}>
              <Link to={`/edit-news/${newsParams.id}`}>
                <Tooltip title="Edit News" placement="top">
                  <EditIcon sx={{ color: "green", cursor: "pointer" }} />
                </Tooltip>
              </Link>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            padding={"20px"}
            backgroundColor="#E8E8E8"
            width="100%"
            borderRadius={2}
          >
            <Typography variant="h4" sx={{ }} gutterBottom>
              {dataDetail?.result?.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "justify"}}
              gutterBottom
              dangerouslySetInnerHTML={{ __html: dataDetail?.result?.content }}
            ></Typography>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default NewsDetail;
