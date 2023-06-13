import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../constants/baseUrls";
import { MAX_IMAGE_SIZE, MAX_FILE_NAME_LENGTH } from "../../constants/global";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { setAuctionUpdateInfo } from "../../../features/auctionSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
    minHeight: "250px",
    backgroundPosition: "center !important",
    backgroundRepeat: "no-repeat !important",
    backgroundSize: "cover !important",
    width: "99%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
}));
const MainImage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { auctionToEdit, auctionUpdateInfo } = useSelector(
    (state) => state.auctions
  );

  const backgroundImage = useMemo(() => {
    if (auctionUpdateInfo?.photos)
      return URL.createObjectURL(auctionUpdateInfo?.photos);
    else if (auctionToEdit?.photos?.length > 0)
      return `${baseUrl}/${auctionToEdit?.photos[0]?.file_photo}`;
  }, [auctionToEdit, auctionUpdateInfo]);

  const handleImagePicker = (prop) => (event) => {
    if (
      event?.target?.files[0]?.name?.length < MAX_FILE_NAME_LENGTH &&
      event?.target?.files[0]?.size / 1024 ** 2 < MAX_IMAGE_SIZE
    ) {
      dispatch(
        setAuctionUpdateInfo({
          ...auctionUpdateInfo,
          [prop]: event?.target?.files[0],
        })
      );
    } else {
      toast.error("File name/size too large", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className={classes.container}>
      <img src={backgroundImage} alt="" className={classes.background} />
      <Button
        sx={{
          backgroundColor: "#134696",
          fontFamily: "heavy",
          borderRadius: 25,
          fontSize: 12,
          m: 2,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#134696",
          },
          zIndex: 10,
          padding: "4px 20px",
        }}
        endIcon={<EditIcon />}
        component="label"
      >
        Edit
        <input
          hidden
          accept="image/png, image/jpeg"
          type="file"
          onInput={handleImagePicker(`photos`)}
        />
      </Button>
    </div>
  );
};

export default MainImage;
