import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { baseUrl } from "../../constants/baseUrls";
import InputField from "../../listing/edit/InputField";
import { validateInputs } from "../../constants/helperFunctions";
import { setProjectData } from "../../../features/projectSlice";
import { fetchAgencies } from "../../../features/agencySlice";
import Loader from "../../../customComponents/Loader";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "25px 50px",
  },
  title: {
    fontSize: 24,
    fontFamily: "medium",
  },
  label: {
    fontSize: 15,
    color: "#134696",
    fontFamily: "heavy",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));
const Details = ({ validation, setValidation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let darkMode = false;

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { projectData } = useSelector((state) => state.project);
  const { allAgencies, allAgenciesApiInfo } = useSelector(
    (state) => state.agency
  );
  const [defaultEditorState, setdefaultEditorState] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (!allAgencies) {
      dispatch(
        fetchAgencies({
          authToken: loggedInObject?.token,
          dataURL: baseUrl + `/users/company/?page_size=100`,
        })
      );
    }
    // eslint-disable-next-line
  }, [allAgencies]);

  const handleChange = (prop) => (event) => {
    dispatch(setProjectData({ ...projectData, [prop]: event.target.value }));
    setValidation((prev) => ({
      ...prev,
      [`${prop}Validation`]: validateInputs(prop, event.target.value),
    }));
  };

  if (allAgenciesApiInfo?.loading) {
    return <Loader />;
  }

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Details
      </span>

      <Grid container sx={{ mt: 2 }} columnSpacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <InputField
            placeholder="Project Title"
            value={projectData?.project_title}
            onChange={handleChange("project_title")}
            type="text"
            label="Title"
            validating={validation?.project_titleValidation}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            Company
          </span>
          <div className="listingsSelectDiv">
            <select
              label="Select Company"
              name="company"
              required
              defaultValue={projectData?.company}
              value={projectData?.company || "DEFAULT"}
              onChange={handleChange("company")}
            >
              <option value="DEFAULT" disabled>
                Select Company
              </option>
              {allAgencies?.result?.results?.map((cur, index) => (
                <option value={cur?.id} key={index}>
                  {cur?.company_name}
                </option>
              ))}
            </select>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ marginTop: 1 }}
        >
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            Description
          </span>
          <Grid container spacing={6}>
            <Grid item sx={{ marginTop: 1, minHeight: "300px" }}>
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
                        draftToHtml(convertToRaw(newState.getCurrentContent()))
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
    </div>
  );
};

export default Details;
