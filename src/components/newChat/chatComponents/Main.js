import React, { useEffect, Suspense, lazy } from "react";
import UserList from "./UserList";
import { Grid } from "@mui/material";
import MessageInfo from "./MessageInfo";
import PersonalInfo from "./PersonalInfo";
import { useSelector } from "react-redux";
import Loader from "../../../customComponents/Loader";
const UserChat = lazy(() => import("./UserChat"));

const Main = () => {
  const { selectedConversation, allConversations, conversationMessages } =
    useSelector((state) => state.chat);

  useEffect(() => {
  }, [selectedConversation, allConversations, conversationMessages]);
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <PersonalInfo />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <MessageInfo />
      </Grid>
      <Grid item xs={2} sm={2} md={4} lg={4} xl={4}>
        <UserList />
      </Grid>
      <Grid item xs={10} sm={10} md={8} lg={8} xl={8}>
        <Suspense fallback={<Loader />}>
          {selectedConversation && <UserChat />}{" "}
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default Main;
