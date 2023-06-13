import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Grid } from "@mui/material";
import BasicInfo from "../../components/updateListingForms/BasicInfo";
import FeatureInfo from "../../components/updateListingForms/FeatureInfo";
import LocationInfo from "../../components/updateListingForms/LocationInfo";
import GalleryInfo from "../../components/updateListingForms/GalleryInfo"
import FloorInfo from "../../components/updateListingForms/FloorInfo";
import ConstructionInfo from "../../components/updateListingForms/ConstructionInfo";
import { useHistory } from "react-router";

const steps = [
  "Basic Information",
  "Construction Info",
  "Location",
  "Features & Services",
  "Images",
  "Floor Plans",
];

const CustomStepper = () => {
  let history = useHistory();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel onClick={() => setActiveStep(0)}>{steps[0]}</StepLabel>
        </Step>
        <Step>
          <StepLabel onClick={() => setActiveStep(1)}>{steps[1]}</StepLabel>
        </Step>
        <Step>
          <StepLabel onClick={() => setActiveStep(2)}>{steps[2]}</StepLabel>
        </Step>
        <Step>
          <StepLabel onClick={() => setActiveStep(3)}>{steps[3]}</StepLabel>
        </Step>
        <Step>
          <StepLabel onClick={() => setActiveStep(4)}>{steps[4]}</StepLabel>
        </Step>
        <Step>
          <StepLabel onClick={() => setActiveStep(5)}>{steps[5]}</StepLabel>
        </Step>
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>

        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid container justifyContent="center">
            {activeStep === 0 && <BasicInfo />}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {activeStep === 1 && <ConstructionInfo />}
            </Grid>
            {activeStep === 2 && <LocationInfo />}
            {activeStep === 3 && <FeatureInfo />}
            {activeStep === 4 && <GalleryInfo />}
            {activeStep === 5 && <FloorInfo />}
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="outlined"
                onClick={() => history.push("/listing")}
              >
                Finish
              </Button>
            ) : (
              <Button onClick={handleNext} variant="outlined">
                Next
              </Button>
            )}

          </Box>

        </React.Fragment>
      )}
    </Box>
  );
};

export default CustomStepper;
