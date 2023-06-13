import { useState } from "react";
import { baseUrl } from "../constants/baseUrls";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateAgent } from "../../features/agentSlice";
import { setCurrentUser } from "../../features/authSlice";
import { toast } from "react-toastify";

const ProfileCard = ({ agentData }) => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);
  const handleImgUpload = (e) => {
    if (window.confirm("Do you want to update your profile picture?") == true) {
      if (e.currentTarget.files[0]) {
        let file = e.currentTarget.files[0];
        setProfileImage(file);
        let formData = new FormData();
        formData.append("photo", e.currentTarget.files[0]);
        dispatch(
          updateAgent({
            authToken: loggedInObject?.token,
            id: agentData?.id,
            data: formData,
          })
        ).then((response) => {
          console.log({ response })
          if (response.payload.status) {
            dispatch(setCurrentUser({ ...response, photo: response?.payload?.result?.photo }));
            toast.success(JSON.stringify(response.payload.message), {
              position: toast.POSITION.BOTTOM_RIGHT,
              progressStyle: { backgroundColor: "#014493" },
            });
          } else {
            toast.error(JSON.stringify(response.payload.message), {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={
              profileImage === null
                ? `${baseUrl}/${agentData?.photo}`
                : URL.createObjectURL(profileImage)
            }
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {agentData?.full_name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${agentData?.city}, ${agentData?.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            <Rating
              name="read-only"
              value={agentData?.rating?.average_rating}
              precision={0.5}
              readOnly
            />
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Divider />

      <CardActions>
        <Button variant="contained" component="label" color="primary" fullWidth>
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => {
              handleImgUpload(e);
            }}
          />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
