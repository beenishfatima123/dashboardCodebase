import React, {useState} from "react";
import { useHistory } from "react-router";
import EditAgent from "../sections/agent-archive/EditAgent";
import Layout from "../../customComponents/layout/Layout";
import { Box, Stepper, Step, StepLabel, Button, Grid } from "@mui/material";
import EditExperience from "../sections/agent-archive/EditExperience";

const EditAgents = () => {
  let history = useHistory();

  const steps = [
    "Basic Information",
    "Experiences",
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Layout>
      <Box sx={{ width: "100%", marginTop: "30px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel onClick={() => setActiveStep(0)}>{steps[0]}</StepLabel>
        </Step>
        <Step>
          <StepLabel onClick={() => setActiveStep(1)}>{steps[1]}</StepLabel>
        </Step>
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid container justifyContent="center">
            {activeStep === 0 && <EditAgent />}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
              {activeStep === 1 && <EditExperience />}
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, paddingLeft: "50px", paddingRight: "50px"}}>
            <Button
              color="inherit"
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto", }} />
            {activeStep === steps.length - 1 ? (
              <Button
                variant="outlined"
                onClick={() => history.push("/agents")}
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
      </Layout>
    </div>
  );
};

export default EditAgents;
