import React, { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ViewListIcon from "@mui/icons-material/ViewList";
import Colors from "../../config/Colors";
import BusinessIcon from "@mui/icons-material/Business";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Tooltip from "@mui/material/Tooltip";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import AuctionIcon from "@mui/icons-material/Gavel";
import { USER_TYPES } from "../../components/constants/global";
import NewsIcon from "@mui/icons-material/Feed";
import PersonIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { setSelectedTab } from "../../features/authSlice";
import logo from "../../assets/headerLogo.png";
import { resetAllRequests } from "../../features/verificationSlice";

const drawerWidth = "20vw";

const navbarItems = [
  {
    name: "Listings",
    iconSvg: <ViewListIcon />,
    linkAction: `listings`,
    tooltipText: "Listing",
    permission: [USER_TYPES.ADMIN, USER_TYPES.MODERATOR, USER_TYPES.AGENT],
  },
  {
    name: "Projects",
    iconSvg: <BusinessIcon />,
    linkAction: "projects",
    tooltipText: "Projects",
    permission: [USER_TYPES.ADMIN],
  },
  {
    name: "Users",
    iconSvg: <PersonIcon />,
    linkAction: "users",
    tooltipText: "Users Management",
    permission: [USER_TYPES.ADMIN, USER_TYPES.MODERATOR],
  },

  {
    name: "Courses",
    iconSvg: <LibraryBooksIcon />,
    linkAction: "courses",
    tooltipText: "Courses",
    permission: [USER_TYPES.ADMIN, USER_TYPES.MODERATOR],
  },

  {
    name: "Agencies",
    iconSvg: <CorporateFareIcon />,
    linkAction: "agencies",
    tooltipText: "Agencies",
    permission: [USER_TYPES.ADMIN, USER_TYPES.MODERATOR, USER_TYPES.AGENT],
  },
  {
    name: "Blogs",
    iconSvg: <RssFeedIcon />,
    linkAction: "blogs",
    tooltipText: "Blogs",
    permission: [USER_TYPES.ADMIN, USER_TYPES.MODERATOR],
  },

  {
    name: "Auctions",
    iconSvg: <AuctionIcon />,
    linkAction: "auctions",
    tooltipText: "Auctions",
    permission: [USER_TYPES.ADMIN, USER_TYPES.MODERATOR, USER_TYPES.AGENT],
  },
  {
    name: "News",
    iconSvg: <NewsIcon />,
    linkAction: "news",
    tooltipText: "News",
    permission: [USER_TYPES.ADMIN],
  },

];

const subMenuItems = [
  {
    name: "User Requests",
    iconSvg: <SupportAgentIcon />,
    linkAction: "verify/user",
    tooltipText: "Users Verification Requests",
  },
  {
    name: "Listing Requests",
    iconSvg: <HomeWorkIcon />,
    linkAction: "verify/property",
    tooltipText: "Property Verification Requests",
  },
  {
    name: "Agency Requests",
    iconSvg: <AddBusinessIcon />,
    linkAction: "verify/agency",
    tooltipText: "Company Verification Requests",
  },

  {
    name: "Auction Requests",
    iconSvg: <ThumbsUpDownIcon />,
    linkAction: "verify/property_file",
    tooltipText: "Auction Verification Requests",
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  backgroundColor: "#134696",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout = ({ children }) => {
  let history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("logged_in"));
  }, []);
  const activeTab = useSelector((state) => state.auth.selectedTab);

  const [subMenuOpen, setSubMenuOpen] = useState(true);



  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            backgroundColor: "#FFF",
            color: Colors.primary,
            height: "15vh",
          }}
        >
          <div style={{ margin: "auto" }}>
            <img
              alt="logo"
              src={logo}
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/dashboard")}
            />
          </div>
        </DrawerHeader>
        <Divider />
        <div style={{ height: "85vh", backgroundColor: "#134696" }}>
          <List sx={{ backgroundColor: "#134696", color: "white" }}>

            {currentUser?.user_type === USER_TYPES.ADMIN && (
              <Tooltip title="Dashboard" placement="right-end">
                <ListItem
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      activeTab === "Dashboard" ? "#0ED864" : "transparent",
                  }}
                  onClick={() => {
                    dispatch(setSelectedTab("Dashboard"));
                    history.push("/dashboard");
                  }}
                >
                  <ListItemIcon style={{ color: Colors.white }}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItem>
              </Tooltip>
            )}
          </List>
          <Divider />

          <List sx={{ backgroundColor: "#134696", color: "white" }}>
            {navbarItems.map((navItem, index) => {
              if (navItem.permission.includes(currentUser.user_type)) {
                return (
                  <Tooltip
                    title={navItem.tooltipText}
                    placement="right-end"
                    key={index}
                  >
                    <ListItem
                      button
                      key={navItem.name}
                      style={{
                        backgroundColor:
                          activeTab === navItem?.name
                            ? "#0ED864"
                            : "transparent",
                      }}
                      onClick={() => {
                        dispatch(setSelectedTab(navItem?.name));
                        history.push(`/${navItem.linkAction}`);
                      }}
                    >
                      <ListItemIcon style={{ color: Colors.white }}>
                        {navItem.iconSvg}
                      </ListItemIcon>
                      <ListItemText>{navItem.name}</ListItemText>
                    </ListItem>
                  </Tooltip>
                );
              }
            })}
          </List>
          {currentUser.user_type === USER_TYPES.ADMIN && (
            <>
              <List sx={{ backgroundColor: "#134696", color: "white" }}>
                <Tooltip title={"Verify Requests"} placement="right-end">
                  <ListItem
                    button
                  >
                    <ListItemIcon style={{ color: Colors.white }}>
                      <DomainVerificationIcon />
                    </ListItemIcon>
                    <ListItemText>Verify Requests</ListItemText>

                  </ListItem>
                </Tooltip>
              </List>
              {subMenuOpen && (
                <List
                  sx={{
                    backgroundColor: "#134696",
                    color: "white",
                    paddingLeft: "30px",
                  }}
                >
                  {subMenuItems.map((menuItem, index) => (
                    <Tooltip
                      title={menuItem.tooltipText}
                      placement="right-end"
                      key={index}
                    >
                      <ListItem
                        button
                        key={menuItem.name}
                        style={{
                          backgroundColor:
                            activeTab === menuItem?.name
                              ? "#0ED864"
                              : "transparent",
                        }}
                        onClick={() => {
                          dispatch(setSelectedTab(menuItem?.name));
                          dispatch(resetAllRequests());
                          history.push(`/${menuItem.linkAction}`);
                        }}
                      >
                        <ListItemIcon style={{ color: Colors.white }}>
                          {menuItem.iconSvg}
                        </ListItemIcon>
                        <ListItemText>{menuItem.name}</ListItemText>
                      </ListItem>
                    </Tooltip>
                  ))}
                </List>
              )}
            </>
          )}
        </div>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          width: "calc(100vw-20vw)",
          marginLeft: "20vw",
          height: "calc(100vh-15vh)",
          overflowY: "scroll",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </>
  );
};

export default Layout;
