import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Colors from "../../config/Colors";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {
  setProjectData,
  createProject,
  resetCreateProject,
  resetCreateProjectApi,
} from "../../features/projectSlice";
import PostMap from "./PostMap";
import { DEFAULT_CENTER } from "../constants/mapConstants";
import { getAddressFromLat } from "../../api/mapApiCalls";
import {
  getArea,
  getBlock,
  getCity,
  getCountry,
} from "../constants/mapHelpers";
import { fetchAgencies } from "../../features/agencySlice";
import { baseUrl } from "../constants/baseUrls";
import Loader from "../../customComponents/Loader";
import { getProjectFormData } from "../constants/helperFunctions";
import { validateInputs } from "../constants/helperFunctions";
import { MAX_IMAGE_SIZE } from "../constants/global";

const gridSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 200,
  position: "relative",
};
const buttonSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderRadius: "10px",
  height: "50%",
  width: "50%",
  boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
  },
};
const crossButton = {
  position: "absolute",
  top: 35,
  right: "22%",
  p: 0,
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    padding: "5px 0px",
    flexDirection: "column",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    borderRadius: "10px",
    height: "50%",
    width: "50%",
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "3% 10% 0% 10%",
  },
  fields: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    marginTop: 5,
  },
  addNew: {
    color: Colors.grey,
    fontSize: 14,
    fontStyle: "italic",
    cursor: "pointer",
    margin: "auto",
  },
  fileUpload: {
    position: "absolute",
    color: "#fff",
    backgroundColor: "rgb(85, 105, 255)",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 1,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));


const AddNewProject = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();

  const { allAgencies, allAgenciesApiInfo } = useSelector(
    (state) => state.agency
  );
  const projectState = useSelector((state) => state.project);
  const { projectData, createProjectApiInfo } = projectState;

  const [defaultEditorState, setdefaultEditorState] = useState(
    EditorState.createEmpty()
  );
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState();
  const [discarded, setDiscarded] = useState({ project_photoCount: 0 });



  const [installmentPlans, setInstallmentPlans] = useState([
    {
      duration: 0,
      description: "",
      amount: 0,
      down_payment: 0,
      inserted: true,
      durationValidation: validateInputs("duration", 0),
      descriptionValidation: validateInputs("description", ""),
      amountValidation: validateInputs("amount", 0),
      down_paymentValidation: validateInputs("down_payment", 0),
    },
  ]);
  const handleAddPlan = () => {
    setInstallmentPlans([
      ...installmentPlans,
      {
        duration: 0,
        description: "",
        amount: 0,
        down_payment: 0,
        inserted: true,
        durationValidation: validateInputs("duration", 0),
        descriptionValidation: validateInputs("description", ""),
        amountValidation: validateInputs("amount", 0),
        down_paymentValidation: validateInputs("down_payment", 0),
      },
    ]);
  };
  const handlePlanChange = (e, index) => {
    const validationError = validateInputs(e.target.name, e.target.value);
    setInstallmentPlans((prev) =>
      prev?.map((elem, pos) => {
        if (pos === index) {
          return {
            ...elem,
            [e.target.name]: e.target.value,
            [`${e.target.name}Validation`]: validationError,
            edited: true,
          };
        } else return elem;
      })
    );
  };
  const handleRemovePlan = (index) => {
    const list = [...installmentPlans];
    list.splice(index, 1);
    setInstallmentPlans(list);
  };

  const mapPosition = useMemo(() => {
    if (projectData?.location)
      return {
        lat: projectData?.location?.lat,
        lng: projectData?.location?.lng,
      };
    else return DEFAULT_CENTER;
  }, [projectData]);
  const onMarkerDragEnd = async (event) => {
    const addressResponse = await getAddressFromLat(
      event?.latLng.lat(),
      event?.latLng.lng()
    );

    const addressArray = addressResponse?.results[0]?.address_components;
    setLoading(true);
    dispatch(
      setProjectData({
        ...projectData,
        location: {
          country: getCountry(addressArray),
          city: getCity(addressArray),
          area: getArea(addressArray),
          block: getBlock(addressArray),
          address: addressResponse?.results[0]?.formatted_address,
          lat: event?.latLng.lat(),
          lng: event?.latLng.lng(),
        },
      })
    );
    setLoading(false);
  };

  const handleImagePicker = (prop) => (event) => {
    if (prop === "feature_photo") {
      const validationError = validateInputs("image", event.target.files[0]);
      dispatch(
        setProjectData({
          ...projectData,
          [prop]: event?.target?.files[0],
          [`${prop}Validation`]: validationError,
        })
      );
    } else {
      var files = event.target.files;
      let count = 0;
      files = [...files].filter(function (e) {
        if (
          e.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
          e?.name?.length < 200 &&
          count < 5
        ) {
          count += 1;
          return e;
        }
      });
      setDiscarded({
        ...discarded,
        [`${prop}Count`]: event.target.files?.length - files?.length,
      });
      dispatch(
        setProjectData({
          ...projectData,
          [prop]: projectData?.[prop]?.length
            ? [
              ...projectData?.[prop],
              ...Array.from(files).slice(0, 5 - projectData?.[prop]?.length),
            ]
            : files,
        })
      );

    }
  };

  const handleRemoveImage = (prop) => (position) => {
    dispatch(
      setProjectData({
        ...projectData,
        [prop]: projectData?.[prop]?.filter(
          (elem, index) => index !== position
        ),
      })
    );
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: 0,
    });
  };

  const handleChange = (prop) => (event) => {
    const validationError = validateInputs(prop, event.target.value);
    dispatch(
      setProjectData({
        ...projectData,
        [prop]: event.target.value,
        [`${prop}Validation`]: validationError,
      })
    );
  };

  const isInstallmentValid = async () => {
    for (const elem of installmentPlans) {
      if (
        elem?.durationValidation ||
        elem?.descriptionValidation ||
        elem?.amountValidation ||
        elem?.down_paymentValidation
      ) {
        return "Invalid data for installment plans";
      }
    }
  };

  const isFormValid = async (data) => {
    if (!data?.project_title || data?.project_titleValidation)
      return "Project's title is required";
    else if (!data?.company) return "Select Company from list";
    else if (!data?.description) return "Description is required.";
    else if (!data?.feature_photo) return "Feature photo is required.";
    else if (data?.feature_photoValidation)
      return "Feature photo is discarded (size too large)";
  };

  const postProject = () => {
    dispatch(
      createProject({
        values: getProjectFormData(projectData, installmentPlans),
        token: loggedInObject?.token,
      })
    );
  };

  useEffect(() => {
    if (!allAgencies) {
      dispatch(
        fetchAgencies({
          authToken: loggedInObject?.token,
          dataURL: baseUrl + `/users/company/`,
        })
      );
    }
    // eslint-disable-next-line
  }, [allAgencies]);

  useEffect(() => {
    if (createProjectApiInfo?.error) {
      toast.error(createProjectApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetCreateProjectApi());
    }
    // eslint-disable-next-line
  }, [createProjectApiInfo?.error]);

  useEffect(() => {
    if (createProjectApiInfo?.response) {
      toast.success("Project added successfully", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#134696" },
      });
      history.push("/projects");
      dispatch(resetCreateProject());
      dispatch(resetCreateProjectApi());
    }
    // eslint-disable-next-line
  }, [createProjectApiInfo?.response]);

  useEffect(() => {
    if (location) {
      let addressArray = location?.place?.address_components;
      dispatch(
        setProjectData({
          ...projectData,
          location: {
            country: getCountry(addressArray),
            city: getCity(addressArray),
            area: getArea(addressArray),
            block: getBlock(addressArray),
            address: location?.place?.formatted_address,
            lat: location?.place.geometry.location.lat(),
            lng: location?.place.geometry.location.lng(),
          },
        })
      );
    }
    // eslint-disable-next-line
  }, [location]);

  if (allAgenciesApiInfo?.loading || createProjectApiInfo?.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className="text-center mb-2">
          Add New Project
        </Typography>

        <Grid container spacing={1}>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Project Title"
                          name="project_title"
                          onChange={handleChange("project_title")}
                          type="text"
                          value={projectData?.project_title || ""}
                          variant="outlined"
                        />
                        {projectData?.project_titleValidation && (
                          <span className={classes.helperText}>
                            {projectData?.project_titleValidation}
                          </span>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Select Company"
                          name="company"
                          onChange={handleChange("company")}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={projectData?.company || "DEFAULT"}
                          variant="outlined"
                        >
                          <option value="DEFAULT" disabled>
                            Select Company
                          </option>
                          {allAgencies?.result?.results?.map((cur, index) => (
                            <option value={cur?.id} key={index}>
                              {cur?.company_name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid style={{ height: "50%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FileUploadOutlinedIcon
                          className={classes.fileUpload}
                          sx={{ fontSize: 18 }}
                        />
                        {
                          <img
                            style={{
                              height: "100px",
                              width: "350px",
                              border: "gray",
                              borderStyle: "solid",
                              borderRadius: "10px",
                            }}
                            src={
                              projectData?.feature_photo &&
                              URL.createObjectURL(projectData?.feature_photo)
                            }
                            alt={
                              projectData?.feature_photo ? "project-logo" : null
                            }
                          />
                        }
                        <input
                          type="file"
                          id="feature_photo"
                          name="feature_photo"
                          accept="image/x-png,image/jpeg"
                          className="custom-file-input absolute-position"
                          onInput={handleImagePicker("feature_photo")}
                        />
                      </Box>
                      {projectData?.feature_photoValidation && (
                        <span className={classes.helperText}>
                          {projectData?.feature_photoValidation}
                        </span>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item lg={12} md={6} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item sx={{ minHeight: "300px" }}>
                        <Editor
                          editorState={defaultEditorState}
                          wrapperClassName="demo-wrapper"
                          editorClassName="demo-editor"
                          onEditorStateChange={(newState) => {
                            setdefaultEditorState(newState);
                            dispatch(
                              setProjectData({
                                ...projectData,
                                ["description"]: draftToHtml(
                                  convertToRaw(newState.getCurrentContent())
                                ),
                                [`descriptionValidation`]: validateInputs(
                                  "description",
                                  draftToHtml(
                                    convertToRaw(newState.getCurrentContent())
                                  )
                                ),
                              })
                            );
                          }}
                        />
                      </Grid>
                    </Grid>
                    {projectData?.descriptionValidation && (
                      <span className={classes.helperText}>
                        {projectData?.descriptionValidation}
                      </span>
                    )}
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Grid>



          {/* Installment Plans */}
          <Grid container spacing={1} style={{ marginTop: "5px" }}>
            <Grid item lg={12} md={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Installment Plan:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    sx={{

                      borderRadius: 2,
                    }}
                  >
                    <Grid item sx={{ padding: "2px" }}>
                      {installmentPlans?.map((planItem, index) => (
                        <Grid
                          key={index}
                          item
                          lg={12}
                          md={12}
                          xs={12}
                          sx={{
                            mt: 2,
                            padding: 2,
                            border: "2px solid #014493",
                            borderRadius: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexFlow: "row-reverse",
                            }}
                          >
                            <DeleteOutlineIcon
                              fontSize="small"
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleRemovePlan(index)}
                            />
                          </Box>
                          <Grid container spacing={1}>
                            <Grid item lg={3} md={12} xs={12}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Duration (months)"
                                name="duration"
                                required
                                onChange={(e) => handlePlanChange(e, index)}
                                type="number"
                                value={planItem?.duration}
                                variant="outlined"
                              />
                              {planItem?.edited &&
                                planItem?.durationValidation && (
                                  <span className={classes.helperText}>
                                    {planItem?.durationValidation}
                                  </span>
                                )}
                            </Grid>
                            <Grid item lg={3} md={12} xs={12}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Description"
                                name="description"
                                required
                                onChange={(e) => handlePlanChange(e, index)}
                                value={planItem?.description || ""}
                                variant="outlined"
                              />
                              {planItem?.edited &&
                                planItem?.descriptionValidation && (
                                  <span className={classes.helperText}>
                                    {planItem?.descriptionValidation}
                                  </span>
                                )}
                            </Grid>
                            <Grid item lg={3} md={12} xs={12}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Total Price"
                                name="amount"
                                required
                                onChange={(e) => handlePlanChange(e, index)}
                                type="number"
                                value={planItem?.amount}
                                variant="outlined"
                              />
                              {planItem?.edited &&
                                planItem?.amountValidation && (
                                  <span className={classes.helperText}>
                                    {planItem?.amountValidation}
                                  </span>
                                )}
                            </Grid>
                            <Grid item lg={3} md={12} xs={12}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Down Payment"
                                name="down_payment"
                                required
                                onChange={(e) => handlePlanChange(e, index)}
                                type="number"
                                value={planItem?.down_payment}
                                variant="outlined"
                              />
                              {planItem?.edited &&
                                planItem?.down_paymentValidation && (
                                  <span className={classes.helperText}>
                                    {planItem?.down_paymentValidation}
                                  </span>
                                )}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item sx={{ padding: "2px", mt: 1 }}>
                      <Typography
                        component="div"
                        className={classes.addNew}
                        onClick={handleAddPlan}
                      >
                        Add (more) Installment Plans ?
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>

          {/* Additional Images */}
          <Grid container spacing={1} style={{ marginTop: "5px" }}>
            <Grid item lg={12} md={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Addtional Images Plan:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.container}>
                    <Grid
                      container
                      columnSpacing={1}
                      sx={{ transition: "0.5s" }}
                    >
                      {projectData?.project_photo?.map((elem, index) => (
                        <Grid
                          item
                          xs={6}
                          sx={gridSx}
                          key={index}
                        // style={{ backgroundColor: "pink" }}
                        >
                          <img
                            src={URL.createObjectURL(elem)}
                            alt=""
                            className={classes.image}
                          />
                          <IconButton
                            sx={crossButton}
                            component="label"
                            onClick={() =>
                              handleRemoveImage("project_photo")(index)
                            }
                          >
                            <CancelIcon style={{ color: "#134696" }} />
                          </IconButton>
                        </Grid>
                      ))}
                      <Grid item xs={6} sx={gridSx}>
                        <IconButton
                          sx={{ ...buttonSx, backgroundColor: "#fff" }}
                          component="label"
                        >
                          <input
                            hidden
                            accept="image/png, image/jpeg"
                            type="file"
                            onInput={handleImagePicker("project_photo")}
                            multiple
                          />
                          <AddIcon style={{ color: "#134696" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {discarded?.project_photoCount > 0 && (
                      <span className={classes.helperText}>
                        {discarded?.project_photoCount} image(s) discarded (file
                        size too large).
                      </span>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>

          {/* Location */}
          <Grid container spacing={1} style={{ marginTop: "5px" }}>
            <Grid item lg={12} md={12} xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Location:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    style={{ marginTop: 5 }}
                    item
                    lg={12}
                    md={12}
                    xs={12}
                    sx={{
                      mt: 2,
                      padding: 2,
                      border: "2px solid #014493",
                      borderRadius: 2,
                    }}
                  >
                    <Grid item sx={{ padding: "2px" }}>
                      <PostMap
                        // onPlaceSelected={onPlaceSelected}
                        onMarkerDragEnd={onMarkerDragEnd}
                        mapPosition={mapPosition}
                        setLocation={setLocation}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          marginTop={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={async () => {
              const formValid = await isFormValid(projectData);
              const instValid = await isInstallmentValid();
              if (!formValid && !instValid) postProject();
              else
                toast.error(formValid ? formValid : instValid, {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                });
            }}
          >
            Save
          </Button>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddNewProject;
