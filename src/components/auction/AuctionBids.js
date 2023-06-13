import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import {
  Avatar,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};
const AuctionBids = () => {
  const { auctionDetail } = useSelector((state) => state.auctions);

  return (
    <Container>
      {auctionDetail && auctionDetail?.bids?.length > 0 ? (
        <>
          <h2
            style={{
              textAlign: "center",
              paddingTop: "10px",
              fontWeight: 400,
            }}
          >
            All Bids
          </h2>
          <Grid container alignItems="center" justifyContent="space-between">
            {auctionDetail?.bids?.map((item, index) => {
              const tradeObject = auctionDetail?.closing_bid.find(
                (elem) => elem?.property_biding_fk === item?.id
              );
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{
                    backgroundColor:
                      item?.id === tradeObject?.property_biding_fk
                        ? "#42ba96"
                        : "#E6F7FF",
                  }}
                >
                  <List
                    component="nav"
                    sx={{
                      px: 0,
                      py: 0,
                      "& .MuiListItemButton-root": {
                        py: 1.5,
                        "& .MuiAvatar-root": avatarSX,
                        "& .MuiListItemSecondaryAction-root": {
                          ...actionSX,
                          position: "relative",
                        },
                      },
                    }}
                  >
                    <ListItemButton divider>
                      <ListItemAvatar>
                        <Avatar
                          src={"https://api.zeerac.com/" + item?.user_fk?.photo}
                          sx={{
                            color: "success.main",
                            bgcolor: "success.lighter",
                          }}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {item?.user_fk?.full_name}
                          </Typography>
                        }
                        secondary={item?.user_fk?.company}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            Bid ID: {item?.id}
                          </Typography>
                        }
                        secondary={item?.created_at}
                      />
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            File count: {item?.file_count}
                          </Typography>
                        }
                        secondary={item?.created_at}
                      />
                      {item?.id === tradeObject?.property_biding_fk ? (
                        <Typography
                          component={"div"}
                          style={{
                            position: "absolute",
                            right: 200,
                            backgroundColor: "green",
                            padding: "3px 10px",
                            borderRadius: 10,
                            color: "#fff",
                          }}
                        >
                          Winning Trade
                        </Typography>
                      ) : (
                        ""
                      )}
                      <ListItemText>
                        <Stack alignItems="flex-end">
                          <Typography variant="subtitle1" noWrap>
                            {auctionDetail?.currency} {item?.price}
                          </Typography>
                          <Typography variant="h6" color="error" noWrap>
                            {item?.is_closed ? "Closed" : "Opened"}
                          </Typography>
                        </Stack>
                      </ListItemText>
                    </ListItemButton>
                  </List>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <h6
          style={{
            textAlign: "center",
            paddingTop: "10px",
            fontWeight: 400,
          }}
        >
          All Bids
        </h6>
      )}
    </Container>
  );
};

export default AuctionBids;
