import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Button, CircularProgress } from "@mui/material";
import moment from "moment/moment";
import { baseUrl } from "../constants/baseUrls";
import defaultPost from "../../assets/misc/defaultPost.png";
import SubunitCardDetails from "./SubunitCardDetails";
import CustomTooltip from "../miscellaneousComponents/CustomTooltip";
import { useHistory } from "react-router-dom";
import IconsContainer from "./IconsContainer";
import { setAuctionVerificationDetail } from "../../features/auctionSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 5%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1,
  },
  backgroundContainer: {
    width: "100%",
    backgroundColor: "#DBDBDB",
    alignSelf: "center",
    objectFit: "fill",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userContainer: {
    display: "flex",
    width: "95%",
    marginBottom: 10,
  },
  priceTitle: {
    margin: 0,
    fontSize: 14,
    color: "#1A2954",
  },
  title: {
    fontSize: 14,
    color: "#7D7D7D",
    fontFamily: "light",
    margin: "5px 0px",
  },
  price: {
    margin: 0,
    fontSize: 26,
    color: "#134696",
    fontFamily: "heavy",
  },
  bottomContainer: {
    minHeight: "100px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: "10px 0px",
  },
  valueContainer: {
    display: "flex",
    margin: "5px 0px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    marginTop: 10,
    fontFamily: "medium",
    fontSize: 19,
    color: "#134696",
    textTransform: "capitalize",
  },
  value: {
    fontSize: 18,
    color: "#1A2954",
    marginTop: 0,
    fontFamily: "medium",
  },
  auctionEnd: {
    fontSize: 18,
    color: "#D0021B ",
    marginTop: 0,
    fontFamily: "medium",
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 10px",
    // width: 200,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 950px)": {
    price: {
      fontSize: 20,
    },
  },
}));
const buttonSx = {
  backgroundColor: "#FFFFFF",
  color: "#1A2954",
  borderRadius: "50px",
  height: 30,
  width: 120,
  fontSize: 14,
  fontFamily: "medium",
  textTransform: "capitalize",
  border: "1px solid #707070",
  alignSelf: "flex-end",
  p: 0,
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
};

const AuctionCard = ({ auction, verificationID }) => {
  const classes = useStyles();
  const containerRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const { updateRequestApiInfo } = useSelector((state) => state.verifications);

  const width = window.innerWidth;
  const [parentWidth, setParentWidth] = useState();
  const [selReqId, setSelReqId] = useState(null);

  const getCurrency = useMemo(() => {
    try {
      if (auction?.currency && auction?.price)
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: auction?.currency,
          maximumFractionDigits: 0,
        }).format(auction?.price);
      else return "$ 0";
    } catch (error) {
      // console.log({ error });
      return `${auction?.currency}${auction?.price}`;
    }
  }, [auction]);

  const getBackgroundImage = () => {
    if (auction?.photos?.length)
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${baseUrl}/${auction?.photos[0]?.file_photo})`;
    else
      return `linear-gradient(to bottom, rgba(255,255,255,0) 60%, rgba(255,255,255,1)),url(${defaultPost})`;
  };

  const getEndDate = (date) => {
    var test = new Date(date);
    var created = moment(test);
    var end = moment(test).add(7, "d");

    return created.to(end) || "7h 22min";
  };

  useEffect(() => {
    if (containerRef)
      setParentWidth(containerRef.current.parentElement.offsetWidth);
  }, [containerRef, width]);

  return (
    <div className={classes.container}>
      <div
        className={classes.backgroundContainer}
        style={{
          backgroundImage:
            auction?.auction_type === "bulk" ? "none" : getBackgroundImage(),
          backgroundColor:
            auction?.auction_type === "bulk" ? "#134696" : "none",
          height: auction?.auction_type === "bulk" ? 120 : 280,
          //padding: auction?.auction_type === 'bulk' ? '20px 0' : 'none',
          paddingBottom: auction?.auction_type === "bulk" ? 10 : "none",
          borderBottom:
            auction?.auction_type === "sub_unit" ? "none" : "1px solid #0ED864",
        }}
      >
        {auction?.auction_type === "bulk" && (
          <div
            style={{
              width: "95%",
              padding: "5px 0px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontFamily: "medium", color: "#fff", fontSize: 22 }}>
              {auction?.total_files}
              <span
                style={{
                  fontFamily: "medium",
                  color: "#fff",
                  fontSize: 14,
                  marginLeft: 5,
                }}
              >
                Total Files
              </span>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 22,
                  color: "#fff",
                  fontFamily: "medium",
                }}
              >
                {getCurrency}
              </p>
            </div>
          </div>
        )}
        <div></div>
        <div
          className={classes.userContainer}
          style={{
            justifyContent: "space-between",
            flexDirection: parentWidth > 300 ? "row" : "column",
            alignItems: parentWidth > 300 ? "center" : "flex-start",
          }}
          ref={containerRef}
        >
          <div>
            {auction?.auction_type !== "sub_unit" &&
              auction?.auction_type !== "bulk" && (
                <div>
                  <p className={classes.priceTitle}>Price</p>
                  <span className={classes.price}>{getCurrency}</span>
                </div>
              )}
          </div>
          {auction?.auction_type === "bulk" ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0px 5px",
                  width: 100,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    fontFamily: "light",
                    margin: "5px 0px",
                  }}
                >
                  Area Size
                </p>
                <span
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    marginTop: 0,
                    fontFamily: "medium",
                  }}
                >{`${parseInt(auction?.size) || "0"} ${auction?.unit === "Square Feet"
                    ? "Sqft"
                    : auction?.unit || "Sqft"
                  }`}</span>
              </div>
              <div className={classes.verticalContainer}>
                <p
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    fontFamily: "light",
                    margin: "5px 0px",
                  }}
                >
                  Society/Location
                </p>
                <CustomTooltip
                  title={`${auction?.area || "area"}, ${auction?.city || "city"
                    }`}
                >
                  <div
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      marginTop: 0,
                      fontFamily: "medium",
                      height: "20px",
                      overflow: "hidden",
                    }}
                  >{`${auction?.city || "city"}`}</div>
                </CustomTooltip>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={{ ...buttonSx, marginTop: 1 }}
                  onClick={() => {
                    dispatch(
                      setAuctionVerificationDetail({
                        isDirect: verificationID ? false : true,
                        verificationID: verificationID,
                      })
                    );
                    history.push(`/auction/${auction?.id}`);
                  }}
                >
                  Detail
                </Button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column-reverse",
              }}
            >
              <Button
                sx={{ ...buttonSx, marginTop: 1 }}
                onClick={() => {
                  dispatch(
                    setAuctionVerificationDetail({
                      isDirect: verificationID ? false : true,
                      verificationID: verificationID,
                    })
                  );
                  history.push(`/auction/${auction?.id}`);
                }}
              >
                Detail
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={classes.bottomContainer}>
        {auction?.auction_type === "sub_unit" ? (
          <>
            <SubunitCardDetails auction={auction} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: 70,
                margin: "0 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  src={baseUrl + "/" + auction?.user_fk?.photo}
                />
                <div
                  style={{
                    marginLeft: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className={classes.name}>
                    {auction?.user_fk?.full_name}
                  </div>
                  <div
                    style={{
                      fontFamily: "medium",
                      fontSize: 12,
                      color: "#707070",
                    }}
                  >
                    {auction?.user_fk?.area},&nbsp;{auction?.user_fk?.city}
                    ,&nbsp;
                    {auction?.user_fk?.country}
                  </div>
                </div>
              </div>
              {auction?.verification_status === "in_progress" ? (
                selReqId === auction?.id && updateRequestApiInfo?.loading ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      color: "#134696",
                    }}
                  />
                ) : (
                  <IconsContainer
                    requestActions={verificationID ? true : false}
                    customColor={"#134696"}
                    auction={auction}
                    type={"auction"}
                    verificationID={verificationID}
                    setSelId={setSelReqId}
                  />
                )
              ) : (
                auction?.verification_status !== "in_progress" &&
                !verificationID && (
                  <IconsContainer
                    requestActions={verificationID ? true : false}
                    auction={auction}
                    type={"auction"}
                    verificationID={verificationID}
                    setSelId={setSelReqId}
                  />
                )
              )}
            </div>
          </>
        ) : auction?.auction_type === "single" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 5px",
            }}
          >
            <div className={classes.verticalContainer}>
              <div>
                <div className={classes.title}>Auction End</div>
                <div className={classes.auctionEnd}>
                  {getEndDate(auction?.created_at)}
                </div>
              </div>
              <div style={{ marginTop: 3 }}>
                <div className={classes.title}>Area Size</div>
                <div className={classes.value}>{`${parseInt(auction?.size) || "0"
                  } ${auction?.unit === "Square Feet"
                    ? "Sqft"
                    : auction?.unit || "Sqft"
                  }`}</div>
              </div>
            </div>
            <div className={classes.verticalContainer}>
              <div>
                <div className={classes.title}>Society/Location</div>
                <div>
                  <CustomTooltip
                    title={`${auction?.area || "area"}, ${auction?.city || "city"
                      }`}
                  >
                    <div className={classes.value}>{`${auction?.city || "city"
                      }`}</div>
                  </CustomTooltip>
                </div>
              </div>
              <div style={{ marginTop: 3 }}>
                <div className={classes.title}>Listing By:</div>
                <div className={classes.value}>{`${auction?.user_fk?.full_name || "user"
                  }`}</div>
              </div>
            </div>
            {auction?.verification_status === "in_progress" ? (
              selReqId === auction?.id && updateRequestApiInfo?.loading ? (
                <CircularProgress
                  size={25}
                  sx={{
                    color: "#134696",
                  }}
                />
              ) : (
                <IconsContainer
                  requestActions={verificationID ? true : false}
                  auction={auction}
                  type={"auction"}
                  verificationID={verificationID}
                  setSelId={setSelReqId}
                />
              )
            ) : (
              auction?.verification_status !== "in_progress" &&
              !verificationID && (
                <IconsContainer
                  requestActions={verificationID ? true : false}
                  auction={auction}
                  type={"auction"}
                  verificationID={verificationID}
                  setSelId={setSelReqId}
                />
              )
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 70,
              margin: "0 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 70,
                margin: "0 20px",
              }}
            >
              <Avatar
                sx={{ width: 60, height: 60 }}
                src={baseUrl + "/" + auction?.user_fk?.photo}
              />
              <div
                style={{
                  marginLeft: 10,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontFamily: "medium",
                    fontSize: 19,
                    color: "#134696",
                    textTransform: "capitalize",
                  }}
                >
                  {auction?.user_fk?.full_name}
                </div>
                <div
                  style={{
                    fontFamily: "medium",
                    fontSize: 12,
                    color: "#707070",
                  }}
                >
                  {auction?.user_fk?.area},&nbsp;{auction?.user_fk?.city},&nbsp;
                  {auction?.user_fk?.country !== null
                    ? auction?.user_fk?.country
                    : ""}
                </div>
              </div>
            </div>
            {auction?.verification_status === "in_progress" ? (
              selReqId === auction?.id && updateRequestApiInfo?.loading ? (
                <CircularProgress
                  size={25}
                  sx={{
                    color: "#134696",
                  }}
                />
              ) : (
                <IconsContainer
                  requestActions={verificationID ? true : false}
                  customColor={"#134696"}
                  auction={auction}
                  type={"auction"}
                  verificationID={verificationID}
                  setSelId={setSelReqId}
                />
              )
            ) : (
              auction?.verification_status !== "in_progress" &&
              !verificationID && (
                <IconsContainer
                  requestActions={verificationID ? true : false}
                  auction={auction}
                  type={"auction"}
                  verificationID={verificationID}
                  setSelId={setSelReqId}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionCard;

