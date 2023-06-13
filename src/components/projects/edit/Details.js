import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { baseUrl } from "../../constants/baseUrls";
import InputField from "../../listing/edit/InputField";
import { validateInputs } from "../../constants/helperFunctions";
import {
  setProjectToEdit,
  setProjectUpdateInfo,
} from "../../../features/projectSlice";
import { fetchAgencies } from "../../../features/agencySlice";
import Loader from "../../../customComponents/Loader";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "0px 74px",
    paddingBottom: "20px",
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
  const { projectToEdit, projectUpdateInfo } = useSelector(
    (state) => state.project
  );
  const { allAgencies, allAgenciesApiInfo } = useSelector(
    (state) => state.agency
  );
  const [defaultEditorState, setdefaultEditorState] = useState(
    EditorState.createEmpty()
  );

  const setDescriptionState = (projResponse) => {
    const contentBlock = htmlToDraft(
      projResponse?.description !== "" ? projResponse?.description : ""
    );
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorDState = EditorState.createWithContent(contentState);
      setdefaultEditorState(editorDState);
      // setRawHtml(draftToHtml(convertToRaw(editorDState.getCurrentContent())));
    }
  };

  useEffect(() => {
    if(projectToEdit && !projectUpdateInfo?.description)
      setDescriptionState(projectToEdit);
  },[projectToEdit])

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
    const validationError = validateInputs(prop, event.target.value);
    dispatch(
      setProjectToEdit({
        ...projectToEdit,
        [prop]:
          prop === "company" ? { id: event.target.value } : event.target.value,
      })
    );
    setValidation((prev) => ({
      ...prev,
      [`${prop}Validation`]: validationError,
    }));

    dispatch(
      setProjectUpdateInfo({
        ...projectUpdateInfo,
        [prop]:
          prop === "company" ? { id: event.target.value } : event.target.value,
      })
    );
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
            value={projectToEdit?.title}
            onChange={handleChange("title")}
            type="text"
            label="Title"
            validating={validation?.titleValidation}
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
              value={projectToEdit?.company?.id || "DEFAULT"}
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
                    setProjectToEdit({
                      ...projectToEdit,
                      ["description"]: draftToHtml(
                        convertToRaw(newState.getCurrentContent())
                      ),
                    })
                  );
                  setValidation((prev) => ({
                    ...prev,
                    [`descriptionValidation`]: validateInputs(
                      "description",
                      draftToHtml(convertToRaw(newState.getCurrentContent()))
                    ),
                  }));
                  dispatch(
                    setProjectUpdateInfo({
                      ...projectUpdateInfo,
                      ["description"]: draftToHtml(
                        convertToRaw(newState.getCurrentContent())
                      ),
                    })
                  );
                }}
              />
            </Grid>
          </Grid>
          {projectToEdit?.descriptionValidation && (
            <span className={classes.helperText}>
              {projectToEdit?.descriptionValidation}
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
