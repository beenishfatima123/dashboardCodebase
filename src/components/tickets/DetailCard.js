import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Typography,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { setResponseModalOpen } from "../../features/ticketSlice";

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
}));

const DetailCard = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { detailModalData, reponseModalData } = useSelector(
    (state) => state.tickets
  );

  function formatType(str) {
    // replace all "-" with whitespace
    let formattedType = str.replace(/-/g, " ");
    // capitalize first letter of each word
    formattedType = formattedType.replace(/\b\w/g, function (match) {
      return match?.toUpperCase();
    });
    return formattedType;
  }

  return (
    <>
      <Card
        sx={{
          margin: 5,
          maxWidth: "100%",
          border: "1px solid #000000",
          borderRadius: "15px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 8px",
        }}
        onClick={() => {
          dispatch(
            setResponseModalOpen({
              ...reponseModalData,
              isModalOpen: true,
              data,
            })
          );
        }}
      >
        <CardActionArea>
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography className={classes.heading}>
                Ticket No: {data?.id}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 20,
                  alignItems: "center",
                }}
              >
                <Typography className={classes.otherHeading}>
                  Created
                </Typography>
                <Typography className={classes.dateText}>
                  {" "}
                  {moment(new Date(data?.created_at)).format("MMM DD, YYYY")}
                </Typography>
              </div>
            </div>
            <Typography gutterBottom className={classes.otherHeading}>
              Subject: {data?.subject}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography className={classes.otherHeading}>
              {formatType(data?.type)}
            </Typography>
            <Chip
              label={data?.status}
              color={data?.status === "open" ? "success" : "error"}
            />
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default DetailCard;
