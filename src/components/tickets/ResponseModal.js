import React from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setResponseModalOpen } from "../../features/ticketSlice";
import {
  Modal,
  Button,
  IconButton,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputField from "../listing/edit/InputField";

const useStyles = makeStyles(() => ({
  heading: {
    color: "#134696",
    fontSize: 30,
    fontFamily: "medium",
    margin: 0,
  },
  dateText: {
    color: "#ADA7A7",
    fontSize: 20,
    fontFamily: "medium",
    margin: 0,
  },
  modalContent: {
    position: "absolute",
    top: "10%",
    left: "28%",
    backgroundColor: "white",
    margin: "auto",
    padding: "0",
    border: "1px solid #888",
    width: "50%",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
    borderRadius: "20px",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: "0px 30px 0px 0px",
    color: "white",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "20px",
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "top",
    padding: "0px 0px 0px 30px",
    color: "white",
    marginRight: "10px",
  },
  close: {
    color: "#FF6161",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
  },
  modalBody: {
    padding: "5px 40px",
    height: "60vh",
    overflowY: "scroll",
  },
  modalFooter: {
    padding: "0px 0px",
    backgroundColor: "green",
    color: "white",
  },
  title: {
    color: "#134696",
    fontFamily: "light",
    fontSize: "20px",
    textTransform: "capitalize",
  },
  author: {
    color: "#6b7b88",
    fontFamily: "light",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    transition: "height 0.5s",
  },

  submitButton: {
    fontSize: 15,
    fontFamily: "light",
    color: "#ffffff",
    backgroundColor: "#134696",
    borderRadius: 9,
    cursor: "pointer",
    border: "1px solid #707070",
    boxShadow: "0px 3px 2px rgba(0,0,0,0.16)",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#134696",
    },
  },
  cancelButton: {
    fontSize: 15,
    fontFamily: "light",
    color: "#134696",
    backgroundColor: "#ffffff",
    borderRadius: 9,
    cursor: "pointer",
    border: "1px solid #707070",
    boxShadow: "0px 3px 2px rgba(0,0,0,0.16)",
  },
}));



const ResponseModal = ({ data, navigateTo }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { reponseModalData } = useSelector((state) => state.tickets);

  const handleClose = () => {
    dispatch(setResponseModalOpen({ ...reponseModalData, isModalOpen: false }));
  };

  return (
    <React.Fragment>
      <Modal open={reponseModalData?.isModalOpen} onClose={handleClose}>
        <div className={classes.modalContent}>
          <div className={classes.modalHeader}>
            <span className={classes.close}>
              {" "}
              <DeleteIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                  color: "red",
                  width: "40px",
                  height: "40px",
                }}
                onClick={handleClose}
              />
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            ></div>
          </div>
          <div className={classes.topSection}>
            <Typography className={classes.heading}>
              Ticket No. {data?.id}
            </Typography>
            <div className={classes.descriptionContainer}>
              <Typography className={classes.heading}>Created</Typography>
              <Typography className={classes.dateText}>
                {" "}
                {moment(new Date(data?.created_at)).format("MMM DD, YYYY")}
              </Typography>
            </div>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
          <Divider sx={{ margin: "5px 20px" }} />

          <div
            style={{
              margin: "5px 20px",
            }}
          >
            <Grid container sx={{ mt: 2 }} columnSpacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <InputField
                  placeholder="Name"
                  value={data?.name}
                  type="text"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <InputField
                  placeholder="Email"
                  value={data?.email}
                  type="text"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <InputField
                  placeholder="Message"
                  value={data?.message}
                  type="area"
                  label="Message"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <InputField
                  placeholder="Response"
                  value={data?.message}
                  type="area"
                  label="Response"
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0px",
              }}
            >
              <Grid
                container
                sx={{ display: "flex", flex: 1, justifyContent: "center" }}
                spacing={2}
              >
                <Grid item xs={6} md={4} sm={6} lg={3}>
                  <Button
                    fullWidth
                    className={classes.submitButton}
                    onClick={() => {
                      history.push(`/${navigateTo}/${data?.listing?.id}`);
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={6} md={4} sm={6} lg={3}>
                  <Button
                    fullWidth
                    className={classes.cancelButton}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ResponseModal;
