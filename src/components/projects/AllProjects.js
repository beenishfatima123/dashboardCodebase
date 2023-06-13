import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Avatar } from "@mui/material";
import Layout from "../../customComponents/layout/Layout";
import {
  getAllProjects,
  fetchAsyncProjects,
} from "./../../features/store/property/propertySlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { baseUrl } from "../constants/baseUrls";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_TYPES } from "../constants/global";
import Loader from "../../customComponents/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { resetUpdateApi } from "../../features/projectSlice";

const columns = [
  { id: "feature_photo", label: "Photo", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "city",
    label: "City",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "country",
    label: "Country",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "id",
    label: "Action",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const AllProjects = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const userType = loggedInObject?.user_type;
  const allProjects = useSelector(getAllProjects);
  const { allProjectsApiInfo } = useSelector((state) => state.properties);
  const { updateApiInfo } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchAsyncProjects());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [dataV, setDataV] = useState([]);

  // const handleClick = (event, dataV) => {
  //   setAnchorEl(event.currentTarget);
  //   setDataV(dataV);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const [openDialog, setOpenDialog] = React.useState(false);
  const handlekOpenClick = (id) => {
    setOpenDialog(true);
    setDataV(id);
  };
  const handleCloseClick = () => {
    setAnchorEl(null);
    setOpenDialog(false);
  };

  const deletProject = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/users/new-project/${dataV}`,
        {
          headers: {
            Authorization: `token ${loggedInObject?.token}`,
          },
        }
      );
      if (response.status) {
        toast.success(JSON.stringify("Property deleted successfully."), {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        });
        dispatch(fetchAsyncProjects());
      } else {
        toast.error(JSON.stringify(response.message), {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log("error in: deletePropertyToDatabase", { error });
    } finally {
      setOpenDialog(false);
      setAnchorEl(null);
    }
  };

  useEffect(() => {
    if (updateApiInfo?.error) {
      toast.error(updateApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    }
    dispatch(resetUpdateApi());
    // eslint-disable-next-line
  }, [updateApiInfo?.error]);

  useEffect(() => {
    if (updateApiInfo?.updated) {
      toast.success("Project updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#134696" },
      });
    }
    dispatch(resetUpdateApi());
    // eslint-disable-next-line
  }, [updateApiInfo?.updated]);

  return (
    <Layout>
      <div className="container property_table">
        {allProjectsApiInfo?.loading ? (
          <Loader />
        ) : (
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: "84vh" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      <h3>Projects</h3>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        <b> {column.label}</b>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allProjects?.results?.map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return column.id === "feature_photo" ? (
                            <TableCell key={column.id} align={column.align}>
                              <Avatar
                                sx={{ width: 50, height: 50 }}
                                src={`${baseUrl}/${value}`}
                              />
                            </TableCell>
                          ) : column.id === "id" ? (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() =>
                                  history.push(`/project/${value}`)
                                }
                              >
                                View
                              </Button>
                              {userType == USER_TYPES.ADMIN ? (
                                <>
                                  {" "}
                                  <Button
                                    sx={{ mx: 2 }}
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    onClick={() =>
                                      history.push(`/EditProject/${value}`)
                                    }
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    sx={{ mx: 2 }}
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                      handlekOpenClick(value);
                                    }}

                                  // onClick={() => {
                                  //   deletProject(value);
                                  // }}
                                  >
                                    Delete
                                  </Button>
                                  <Dialog
                                    open={openDialog}
                                    onClose={handleCloseClick}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                  >
                                    <DialogTitle id="alert-dialog-title">
                                      {"Delete Lisitng"}
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                        Are you sure to delete this project?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button
                                        onClick={handleCloseClick}
                                        autoFocus
                                      >
                                        No
                                      </Button>
                                      <Button onClick={() => deletProject()}>
                                        Yes
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </>
                              ) : null}
                            </TableCell>
                          ) : (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

      </div>
    </Layout>
  );
};

export default AllProjects;
