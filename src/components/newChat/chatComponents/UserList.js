import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversations,
  getUserStatus,
} from "../../../api/firebaseQueries";
import moment from "moment/moment";
import { Avatar, Badge } from "@mui/material";
import { setSelectedConversation } from "../../../features/chatSlice";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  scroll: {
    height: "calc(100vh - 215px)",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 10px",
    height: 60,
    cursor: "pointer",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "cover",
  },
  name: {
    fontSize: 18,
    fontFamily: "medium",
    color: "#292929",
  },
  message: {
    fontSize: 16,
    fontFamily: "light",
    color: "#A8A8A8",
    height: 25,
    overflow: "hidden",
  },
  time: {
    fontSize: 16,
    fontFamily: "light",
    color: "#A8A8A8",
  },
  unread: {
    width: 20,
    height: 20,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#D83F50",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    float: "right",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("logged_in"));
  }, []);
  const { allConversations, selectedConversation } = useSelector(
    (state) => state.chat
  );
  const [userStatus, setUserStatus] = useState([]);



  useEffect(async () => {
    const conversationListener = getAllConversations(
      dispatch,
      currentUser?.firebaseDocId
    );
    await getUserStatus(setUserStatus);
    return () => {
      conversationListener();
    };
    // eslint-disable-next-line
  }, [currentUser]);

  const getSenderInfo = (users, prop) => {
    return users?.filter(
      (elem) => elem?.id !== currentUser?.firebaseDocId
    )[0]?.[prop];
  };

  const getStatus = (users) => {
    return userStatus.find(
      (user) =>
        user?.id ===
        users?.filter((elem) => elem?.id !== currentUser?.firebaseDocId)[0]?.[
        "id"
        ]
    )?.status;
  };

  return (
    <div className={classes.scroll}>
      {allConversations?.map((item, index) => (
        <div
          key={index}
          className={classes.container}
          onClick={() => dispatch(setSelectedConversation(item))}
          style={{
            backgroundColor:
              selectedConversation?.id === item?.id ? "#E9EFFD" : "",
          }}
        >
          <div className={classes.left}>
            {getStatus(item?.users) ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  src={getSenderInfo(item?.users, "photo")}
                  className={classes.profilePic}
                />
              </StyledBadge>
            ) : (
              <Avatar
                src={getSenderInfo(item?.users, "photo")}
                className={classes.profilePic}
              />
            )}
            <div style={{ marginLeft: 10 }}>
              <div className={classes.name}>
                {getSenderInfo(item?.users, "name")}
              </div>
              <div className={classes.message}>{item?.lastMessage}</div>
            </div>
          </div>
          <div>
            <div className={classes.time}>
              {moment(new Date(item?.lastMessageTime?.toDate())).fromNow()}
            </div>
            {!item?.lastMessageRead &&
              item?.lastMessageSender !== currentUser?.firebaseDocId && (
                <div className={classes.unread}>1</div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
