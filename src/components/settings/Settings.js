import React, { useState, useEffect } from "react";
import Layout from "../../customComponents/layout/Layout";
import SettingPassword from "./SettingPassword";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container } from "@mui/material";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { agentDetail } from "../../features/agentSlice";

const Settings = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveStep(newValue);
  };

  const dispatch = useDispatch();
  const { selectedAgentApiInfo, dataDetail } = useSelector(
    (state) => state.agent
  );

  const loadAgentData = async () => {
    dispatch(
      agentDetail({ authToken: loggedInObject.token, id: loggedInObject.id })
    );
  };

  useEffect(() => {
    loadAgentData();
  }, []);


  return (
    <Layout>
      <Container sx={{ marginTop: 5 }}>
        <Tabs value={activeStep} onChange={handleChange}>
          <Tab icon={<AccountBoxIcon />} iconPosition="start" label="General" />
          {loggedInObject?.provider !== "google.com" && (
            <Tab
              icon={<KeyRoundedIcon />}
              iconPosition="start"
              label="Change Password"
            />
          )}
        </Tabs>
        <React.Fragment>
          {activeStep === 0 && <Profile />}
          {activeStep === 1 && loggedInObject?.provider !== "google.com" && (
            <SettingPassword />
          )}
        </React.Fragment>
      </Container>
    </Layout>
  );
};

export default Settings;
