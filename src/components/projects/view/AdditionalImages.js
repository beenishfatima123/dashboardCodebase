import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { baseUrl } from "../../constants/baseUrls";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";

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
  title: {
    color: "#134696",
    fontSize: 22,
    fontFamily: "medium",
  },
}));

const AdditionalImages = () => {
  const classes = useStyles();
  const { projectDetails } = useSelector((state) => state.project);

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Additional Images:
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        {projectDetails?.project_photo?.length > 0 ? (
          <Grid container spacing={1}>
            {projectDetails?.project_photo?.map((value, index) => (
              <Grid item key={index} lg={6}>
                <img
                  alt=""
                  src={`${baseUrl}/${value?.photo}`}
                  style={{ height: 300, objectFit: "cover", width:'100%' }}
                />
              </Grid>
            ))}
          </Grid>
        ) : //   <NotFound label={'No Images'} />
        null}
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalImages;
