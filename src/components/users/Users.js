import React, { useState } from "react";
import Layout from "../../customComponents/layout/Layout";
import DataTable from "./DataTable";
import { useSelector } from "react-redux";
import Loader from "../../customComponents/Loader";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { USER_TYPES } from "../constants/global";

const Users = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  });

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      borderRadius: 5,
      color: "black",
      "&.Mui-selected": {
        color: "white",
        backgroundColor: "#014493",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
        color: "green",
      },
    })
  );

  const [activeStep, setActiveStep] = useState(0);
  const handleChange = (event, newValue) => {
    setActiveStep(newValue);
  };

  return (
    <Layout>
      {false ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              padding: "25px 50px",
              borderRadius: "10px",
              height: "100px",
              backgroundColor: "rgb(244, 246, 248)",
            }}
          >
            <StyledTabs
              value={activeStep}
              onChange={handleChange}
              aria-label="styled tabs"
            >
              <StyledTab
                label={
                  loggedInObject?.user_type === USER_TYPES.MODERATOR
                    ? "Edit Profile (Moderator)"
                    : "Moderators"
                }
              />
              <StyledTab
                label={
                  loggedInObject?.user_type === USER_TYPES.AGENT
                    ? "Edit Profile (Agent)"
                    : "Agents"
                }
              />
              <StyledTab label="Users" />
            </StyledTabs>
            <React.Fragment>
              {activeStep === 0 && (
                <DataTable
                  type={USER_TYPES.MODERATOR}
                  self={
                    loggedInObject?.user_type === USER_TYPES.MODERATOR
                      ? true
                      : false
                  }
                />
              )}
              {activeStep === 1 && (
                <DataTable
                  type={USER_TYPES.AGENT}
                  self={
                    loggedInObject?.user_type === USER_TYPES.AGENT
                      ? true
                      : false
                  }
                />
              )}
              {activeStep === 2 && (
                <DataTable
                  type={USER_TYPES.USER}
                  self={
                    loggedInObject?.user_type === USER_TYPES.USER ? true : false
                  }
                />
              )}
            </React.Fragment>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default Users;
