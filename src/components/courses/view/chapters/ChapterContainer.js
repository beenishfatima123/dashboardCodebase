import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import verticalPattren from "../../../../assets/courses/verticalPattren.png";
import Content from "./Content";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChapterContainer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <img
          alt=""
          src={verticalPattren}
          style={{
            position: "absolute",
            right: 10,
            height: 300,
            width: "5%",
            marginTop: 50,
            objectFit: "cover",
          }}
        />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={0}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              sx: { backgroundColor: "#134696", height: 4, borderRadius: 10 },
            }}
            sx={{
              "& button": {
                color: "#134696",
                fontFamily: "medium",
                fontSize: 17,
                textTransform: "capitalize",
              },
              "& button.Mui-selected": {
                color: "#134696",
                fontFamily: "medium",
                fontSize: 17,
                textTransform: "capitalize",
              },
            }}
          >
            <Tab label="Content" {...a11yProps(0)} />
          </Tabs>
        </Box>

        <TabPanel value={0} index={0}>
          <Content />
        </TabPanel>
      </Box>
    </>
  );
};

export default ChapterContainer;
