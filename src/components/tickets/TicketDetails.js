import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../customComponents/Loader";
import {
  getTicketHistory,
  setDetailModalOpen,
} from "../../features/ticketSlice";
import { baseUrl } from "../constants/baseUrls";
import DetailCard from "./DetailCard";
import { Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import ResponseModal from "./ResponseModal";

const useStyles = makeStyles(() => ({
  heading: {
    color: "#134696",
    fontSize: 35,
    fontFamily: "medium",
    margin: 0,
  },
  otherHeading: {
    color: "#134696",
    fontSize: 30,
    fontFamily: "medium",
    margin: 0,
  },
  dateText: {
    color: "#ADA7A7",
    fontSize: 22,
    fontFamily: "medium",
    margin: 0,
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: "30px 50px  0px 50px",
    color: "white",
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
  hideButton: {
    width: "100%",
    height: "45px",
    color: "#FFFFFF",
    background: "#134696",
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "18px",
    "&:hover": {
      backgroundColor: "#134696",
    },
  },
  shareButton: {
    width: "100%",
    height: "45px",
    color: "#FFFFFF",
    background: "#DBDBDB",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#DBDBDB",
    },
  },
  deleteButton: {
    width: "100%",
    height: "45px",
    color: "#FFFFFF",
    background: "#FF6161",
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    borderBottomRightRadius: "18px",
    borderBottomLeftRadius: "0px",
    "&:hover": {
      backgroundColor: "#FF6161",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TicketDetails = ({ data, navigateTo }) => {
  const classes = useStyles();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const {
    ticketDetails,
    ticketHistory,
    ticketHistoryApiInfo,
    ticketDetailsApiInfo,
    detailModalData,
    reponseModalData,
  } = useSelector((state) => state.tickets);

  const handleClose = () => {
    dispatch(
      setDetailModalOpen({
        ...detailModalData,
        isModalOpen: !detailModalData?.isModalOpen,
      })
    );
  };


  useEffect(() => {
    if (ticketDetails && ticketDetails?.result?.["listing"]?.id) {
      let type = ticketDetails?.result?.type.substring(
        0,
        ticketDetails?.result?.type.indexOf("-")
      );

    }
    dispatch(
      getTicketHistory({
        authToken: loggedInObject?.token,
        ticketID: parseInt(data?.id),
        dataURL: baseUrl + `/users/ticket/?listing=${data?.listing?.id}`,
      })
    );
    // eslint-disable-next-line
  }, [data?.id]);

  return (
    <>
      <Modal
        open={detailModalData?.isModalOpen}
        onClose={handleClose}
        scroll="paper"
      >
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "22%",
            backgroundColor: "white",
            margin: "auto",
            padding: "0",
            border: "1px solid #888",
            width: "70%",
            boxShadow:
              "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
            borderRadius: "20px",
          }}
        >
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
            >
              <span
                style={{
                  color: "#134696",
                  fontFamily: "heavy",
                  fontSize: "2.5rem",
                  textTransform: "capitalize",
                }}
              >
                Ticket
              </span>
            </div>
          </div>
          <div className={classes.modalBody}>
            {ticketDetailsApiInfo?.loading ? (
              <Loader />
            ) : (
              <DetailCard data={data} />

            )}
            {ticketHistoryApiInfo?.loading ? (
              <Loader />
            ) : ticketHistory && ticketHistory.result.count > 0 ? (
              ticketHistory?.result?.results?.map((ticket) => {
                return <DetailCard data={ticket} />;
              })
            ) : null}
          </div>
        </div>
      </Modal>
      {reponseModalData?.isModalOpen && (
        <ResponseModal data={reponseModalData?.data} navigateTo={navigateTo} />
      )}
    </>
  );

}

export default TicketDetails;
