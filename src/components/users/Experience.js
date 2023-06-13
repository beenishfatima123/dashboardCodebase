import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { baseUrl } from "../constants/baseUrls";
import axios from "axios";
import { Button, Card, CardContent, Grid } from "@mui/material";
import Loader from "../../customComponents/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UserInputField from "../miscellaneousComponents/UserInputField";
import CustomDateField from "../miscellaneousComponents/CustomDateField";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { ReactComponent as PersonIcon } from "../../assets/icons/personIcon.svg";

const useStyles = makeStyles(() => ({
  tosContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: 13,
    color: "#7D7D7D",
    cursor: "pointer",
  },
  addMore: {
    color: "#134696",
    fontSize: 14,
    fontFamily: "medium",
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0px",
    textTransform: "none",
  },
  helperText: {
    fontFamily: "light",
    color: "red",
    fontSize: 12,
  },
}));

const Experience = ({ experienceList, setExperienceList, isListValid }) => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const classes = useStyles();
  const { selectedUserApiInfo } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [selId, setSelId] = useState();

  const handleClickOpen = (eID) => {
    setSelId(eID);
    setOpen(true);
  };
  const handleClose = () => {
    setSelId(null);
    setOpen(false);
  };

  const handleDeleteExperience = () => {
    axios
      .delete(`${baseUrl}/users/agent-experience/${selId}`, {
        headers: {
          Authorization: `token ${loggedInObject?.token}`,
        },
      })
      .then((response) => {
        if (response.data.status === true) {
          console.log("question detelte response: ", response);
          let remainingExperience = experienceList.filter(
            (experience) => experience.id !== selId
          );
          setExperienceList(remainingExperience);
        }
        setSelId(null);
        setOpen(false);
        toast.success(JSON.stringify(response?.data?.message), {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        });
      })
      .catch((error) => {
        console.log({ error });
      });
    console.log("Experience deleted!");
  };

  const handleAddClick = () => {
    setExperienceList([
      ...experienceList,
      {
        designation: "",
        company_name: "",
        currently_working: false,
        city: "",
        country: "",
        start_date: "",
        end_date: "",
        inserted: true,
      },
    ]);
  };

  const handleInputChange = (e, index, checked) => {
    var key = e.target.name;
    var value = e.target.value;
    const allList = JSON.parse(JSON.stringify(experienceList));
    if (key === "currently_working") {
      allList[index][key] = checked;
      allList[index]["end_date"] = null;
    } else allList[index][key] = value;
    allList[index]["edited"] = true;
    setExperienceList(allList);
  };

  const handleChange = (e, index) =>
    setExperienceList((prev) =>
      prev?.map((elem, pos) => {
        if (pos === index) {
          return {
            ...elem,
            [e.target.name]:
              e.target.name === "currently_working"
                ? !elem.currently_working
                : e.target.value,
            edited: true,
          };
        } else return elem;
      })
    );

  function stringToBoolean(value) {
    return String(value) === "1" || String(value).toLowerCase() === "true";
  }

  return (
    <>
      {selectedUserApiInfo?.loading ? (
        <Loader />
      ) : (
        <div style={{ width: "100%" }}>
          <Grid container justifyContent="space-around" spacing={2}>
            {experienceList?.map((item, index) => (
              <Grid
                key={index}
                item
                lg={12}
                md={6}
                xs={12}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                }}
              >
                <Card sx={{ display: "flex", flexFlow: "row-reverse" }}>
                  {item?.deleted ? (
                    <RestoreIcon
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        setExperienceList((prev) =>
                          prev?.map((_elem, pos) => {
                            if (pos === index)
                              return { ..._elem, deleted: false };
                            else return _elem;
                          })
                        )
                      }
                    />
                  ) : (
                    <DeleteOutlineIcon
                      fontSize="small"
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        setExperienceList((prev) =>
                          prev?.map((_elem, pos) => {
                            if (pos === index)
                              return { ..._elem, deleted: true };
                            else return _elem;
                          })
                        )
                      }
                    />
                  )}
                  <CardContent style={{ opacity: item?.deleted ? 0.5 : 1 }}>
                    <Grid container spacing={3}>
                      <Grid item lg={6} md={6} xs={12}>
                        <UserInputField
                          fullWidth
                          placeholder="Designation"
                          name="designation"
                          required
                          onChange={(e) => handleInputChange(e, index)}
                          type="text"
                          value={item?.designation}
                          variant="outlined"
                          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        />
                        {(item?.designation?.length < 3 ||
                          item?.designation?.length > 30) && (
                          <span className={classes.helperText}>
                            Designation must be between 3-30 characters
                          </span>
                        )}
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <UserInputField
                          fullWidth
                          size="small"
                          required
                          placeholder="Company Name"
                          name="company_name"
                          onChange={(e) => handleInputChange(e, index)}
                          type="text"
                          value={item?.company_name}
                          variant="outlined"
                          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        />
                        {(item?.company_name?.length < 3 ||
                          item?.company_name?.length > 30) && (
                          <span className={classes.helperText}>
                            Company name must be between 3-30 characters
                          </span>
                        )}
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <UserInputField
                          fullWidth
                          size="small"
                          placeholder="City"
                          name="city"
                          required
                          onChange={(e) => handleInputChange(e, index)}
                          type="text"
                          value={item?.city}
                          variant="outlined"
                          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} xs={12}>
                        <UserInputField
                          fullWidth
                          size="small"
                          placeholder="Country"
                          name="country"
                          required
                          onChange={(e) => handleInputChange(e, index)}
                          type="text"
                          value={item?.country}
                          variant="outlined"
                          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                        />
                      </Grid>
                      <Grid item lg={4} md={6} xs={12}>
                        <CustomDateField
                          placeholder="Start Date"
                          name="start_date"
                          value={item?.start_date || ""}
                          onChange={(e) => handleChange(e, index)}
                          startIcon={<PersonIcon style={{ marginRight: 10 }} />}
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </Grid>
                      <Grid item lg={4} md={6} xs={12}>
                        {item?.currently_working ? (
                          <UserInputField
                            placeholder="End Date"
                            name="end_date"
                            value={null}
                            startIcon={
                              <PersonIcon style={{ marginRight: 10 }} />
                            }
                            type="date"
                            readOnly
                          />
                        ) : (
                          <CustomDateField
                            placeholder="End Date"
                            name="end_date"
                            value={item?.end_date || ""}
                            onChange={(e) => handleChange(e, index)}
                            startIcon={
                              <PersonIcon style={{ marginRight: 10 }} />
                            }
                            max={new Date().toISOString().split("T")[0]}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4} lg={4.2}>
                        <div className={classes.tosContainer}>
                          <input
                            type="checkbox"
                            name="currently_working"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                !item?.currently_working
                              )
                            }
                            checked={stringToBoolean(item?.currently_working)}
                            inpuprops={{ "aria-label": "controlled" }}
                            className="login-checkbox"
                          />
                          <span className={classes.radioLabel}>
                            currently working
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            lg={12}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Button
              className={classes.addMore}
              onClick={handleAddClick}
              disabled={!isListValid()}
              startIcon={<AddIcon />}
            >
              Add Another Experience
            </Button>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete Experience"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to delete this experience? This experience will be
                permanently deleted from profile.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                No
              </Button>
              <Button onClick={() => handleDeleteExperience()}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Experience;
