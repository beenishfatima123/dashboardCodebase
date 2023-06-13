import React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DataTable from "../../components/tickets/DataTable";
import Layout from "../../customComponents/layout/Layout";
import Loader from "../../customComponents/Loader";
import { TICKET_ENUM } from "../../components/constants/global";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";
import { useDispatch, useSelector } from "react-redux";
import { resetAllTickets, setSelectedTab } from "../../features/ticketSlice";

const Tickets = () => {

  const StyledTabs = styled((props) => (
    <Tabs
      style={{
        border: "1px solid #000000",
        borderRadius: "59px",
        padding: "2px",
        width: "100vw",
      }}
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
      color: "#134696",
      "&.Mui-selected": {
        color: "#134696",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
        color: "green",
      },
    })
  );

  const dispatch = useDispatch();
  const {
    selectedTabIndex,
  } = useSelector((state) => state.tickets);

  const handleChange = (event, newValue) => {
    dispatch(setSelectedTab(newValue));
    dispatch(resetAllTickets());
  };

  return (
    <Layout>
      <CustomTopInfo heading="Tickets" />
      {false ? (
        <Loader />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "25px 20px",
              border: "1px solid #c9c9c9",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: "15px 2%",
              }}
            >
              <StyledTabs
                value={selectedTabIndex}
                onChange={handleChange}
                aria-label="styled tabs"
              >
                {TICKET_ENUM?.map((ticket) => (
                  <StyledTab label={ticket?.label} />
                ))}
              </StyledTabs>
            </div>

            <React.Fragment>
              {selectedTabIndex === 0 && (
                <DataTable
                  type={"contact"}
                  ticketType={"contact-us"}
                />
              )}
              {selectedTabIndex === 1 && (
                <DataTable
                  // navigateTo={"bug"}
                  type={"bug"}
                  ticketType={"bug-report"}
                />
              )}
              {selectedTabIndex === 2 && (
                <DataTable
                  type={"suggestion"}
                  ticketType={"suggestion"}
                />
              )}
              {selectedTabIndex === 3 && (
                <DataTable
                  navigateTo={"edit-listing"}
                  type={"listing"}
                  ticketType={"listing-report"}
                />
              )}
              {selectedTabIndex === 4 && (
                <DataTable
                  navigateTo={"editAgent"}
                  type={"agent"}
                  ticketType={"agent-report"}
                />
              )}
              {selectedTabIndex === 5 && (
                <DataTable
                  navigateTo={"edit-agency"}
                  type={"agency"}
                  ticketType={"agency-report"}
                />
              )}
              {selectedTabIndex === 6 && (
                <DataTable
                  navigateTo={"edit-auction"}
                  type={"auction"}
                  ticketType={"auction-report"}
                />
              )}
            </React.Fragment>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default Tickets;
