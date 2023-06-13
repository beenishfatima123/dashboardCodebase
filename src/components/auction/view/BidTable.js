import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import { Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { baseUrl } from "../../constants/baseUrls";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import Loader from "../../../customComponents/Loader";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { acceptABid, resetBidsApi } from "../../../features/auctionSlice";


const cols = [
  ["", ""],
  ["Location", "Location"],
  ["Bid Amount", "Bid Amount"],
  ["", "", "", ""],
];

const useStyles = makeStyles(() => ({
  data: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
  },
  description: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
    height: 50,
    overflow: "hidden",
    textAlign: "center",
  },
  accept: {
    backgroundColor: "#134696",
    color: "#fff",
    fontSize: 12,
    fontFamily: "light",
    cursor: "pointer",
    border: "none",
    borderRadius: 5,
    height: 30,
    width: 100,
  },
  accepted: {
    backgroundColor: "#0ed864",
    color: "#fff",
    fontSize: 12,
    fontFamily: "light",
    cursor: "not-allowed",
    border: "none",
    borderRadius: 5,
    height: 30,
    width: 100,
  },
}));

const BidTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { auctionDetail, auctionBidsApiInfo, allAuctionsDataApiInfo } =
    useSelector((state) => state.auctions);

  const handleAcceptBid = (bid) => {
    const formData = new FormData();
    formData?.append("property_biding_fk", bid?.id);
    dispatch(
      acceptABid({
        transactionData: formData,
        authToken: loggedInObject?.token,
      })
    );
  };

  useEffect(() => {
    if (auctionBidsApiInfo?.response) {
      toast.success("Bid Accepted", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetBidsApi());
    }
    // eslint-disable-next-line
  }, [auctionBidsApiInfo?.response, auctionDetail]);

  useEffect(() => {
    if (auctionBidsApiInfo?.error) {
      toast.error(auctionBidsApiInfo?.error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetBidsApi());
    }
    // eslint-disable-next-line
  }, [auctionBidsApiInfo?.error]);

  return (
    <>
      {auctionBidsApiInfo?.loading ? (
        <Loader />
      ) : auctionDetail?.result?.bids?.length > 0 ? (
        <TableContainer component={Paper} sx={{ padding: 3, boxShadow: "none", mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                borderTop: "1.5px solid #0ed864",
                borderBottom: "1.5px solid #0ed864",
              }}
            >
              <TableRow>
                {cols?.map((item, index) => (
                  <TableCell
                    key={index}
                    align="left"
                    sx={{
                      color: "#134696",
                      fontSize: 17,
                      fontFamily: "medium",
                    }}
                  >
                    {item[0]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {auctionDetail?.result?.bids?.map((row, index) => {
                const acceptedBid = auctionDetail?.result?.closing_bid?.find(
                  (elem) => elem?.property_biding_fk === row?.id
                );
                //console.log({ row, acceptedBid });
                return (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "1px solid #8b8b8b" }}
                  >
                    <TableCell align="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Avatar
                          src={baseUrl + "/" + row?.user_fk?.photo}
                          sx={{ width: 50, height: 50, marginRight: 3 }}
                        />
                        <div className={classes.data}>
                          {row?.user_fk?.full_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div className={classes.data}>{`${row?.user_fk?.city}`} {row?.user_fk?.country !== null ? `${row?.user_fk?.country}` : ""}</div>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div className={classes.data}>{parseInt(row?.price)}</div>
                    </TableCell>
                    {loggedInObject?.id !==
                      auctionDetail?.result?.user_fk?.id &&
                      row?.id !== acceptedBid?.property_biding_fk ? (
                      <TableCell align="center">
                        <button className={classes.accepted}>Accepted</button>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        {(loggedInObject?.id ===
                          auctionDetail?.result?.user_fk?.id &&
                          row?.id !== acceptedBid?.property_biding_fk) ||
                          acceptedBid === undefined ? (
                          <button
                            className={classes.accept}
                            onClick={() => {
                              handleAcceptBid(row);
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <CheckCircleOutlineIcon
                                sx={{ fontSize: 14, marginRight: 0.5 }}
                              />
                              Aceept
                            </div>
                          </button>
                        ) : (
                          <button className={classes.accepted}>Accepted</button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};

export default BidTable;
