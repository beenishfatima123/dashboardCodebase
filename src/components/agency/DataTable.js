import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../../customComponents/Loader";
import {
  setAgencyVerificationDetail,
  setAgencyToEdit,
  setAgencyUpdateInfo,
  resetUpdateAgencyApiInfo,
  deleteAgency,
  resetDeleteAgencyApi,
} from "../../features/agencySlice";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { getSingleUnverifiedCompanyReset } from "../../features/store/verificationRequestsSlice";
import { resetCreateVerificationApi } from "../../features/verificationSlice";

const columns = [
  { id: "company_logo", label: "", minWidth: 40 },
  { id: "company_name", label: "Name", minWidth: 100, align: "left" },
  {
    id: "company_address",
    label: "Location",
    minWidth: 100,
    align: "left",
  },
  {
    id: "no_of_employees",
    label: "Employees",
    minWidth: 80,
    align: "left",
  },
  {
    id: "total_listings",
    label: "Listings",
    minWidth: 80,
    align: "left",
  },
  {
    id: "id",
    minWidth: 50,
    align: "center",
  },
];

const useStyles = makeStyles(() => ({
  btnContainer: {
    display: "flex",
    width: "100%",
    gap: "20px",
  },
}));

const DataTable = ({ agenciesToShow }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { allAgenciesApiInfo, searchAgenciesApiInfo, deleteAgencyApiInfo } =
    useSelector((state) => state.agency);

  const [open, setOpen] = useState(false);
  const [selId, setSelId] = useState();
  const handleDeleteClick = (id) => {
    setSelId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSelId(null);
    setOpen(false);
  };

  const handleDeleteAgency = () => {
    setSelId(null);
    setOpen(false);
    dispatch(deleteAgency({ authToken: loggedInObject?.token, id: selId }));
  };

  useEffect(() => {
    if (deleteAgencyApiInfo?.response?.status) {
      toast.success("Agency deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
        hideProgressBar: true,
      });
      dispatch(resetDeleteAgencyApi());
    }
  }, [deleteAgencyApiInfo?.response]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          margin: 5,
        }}
      >
        <div style={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: "84vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        color: "#014493",
                      }}
                    >
                      <b> {column.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {allAgenciesApiInfo?.loading || searchAgenciesApiInfo?.loading || deleteAgencyApiInfo?.loading ? (
                <TableBody>
                  <TableRow hover tabIndex={-1}>
                    <TableCell colSpan={8}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {agenciesToShow?.result?.count > 0 ? (
                    agenciesToShow?.result?.results?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const agent_info = row?.[column.id];
                            const photo = row?.company_logo;
                            const id = row[column.id];
                            return column.id === "company_logo" ? (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={() => {
                                  dispatch(
                                    setAgencyVerificationDetail({
                                      isDirect: true,
                                      verificationID: null,
                                    })
                                  );
                                  history.push(`/agency/${row?.id}`);
                                }}
                                sx={{ cursor: "pointer" }}
                              >
                                {photo ? (
                                  <Avatar
                                    sx={{ width: 50, height: 50 }}
                                    src={"https://api.zeerac.com/" + photo}
                                  />
                                ) : (
                                  <Avatar sx={{ width: 50, height: 50 }}>
                                    {" "}
                                    <PersonIcon />{" "}
                                  </Avatar>
                                )}
                              </TableCell>
                            ) : column.id === "id" ? (
                              <TableCell key={column.id} align={"left"}>
                                <div className={classes.btnContainer}>
                                  <EditIcon
                                    sx={{ fontSize: 20, cursor: "pointer" }}
                                    onClick={() => {
                                      dispatch(
                                        getSingleUnverifiedCompanyReset()
                                      );
                                      dispatch(resetCreateVerificationApi());
                                      dispatch(resetUpdateAgencyApiInfo());
                                      dispatch(setAgencyUpdateInfo(null));
                                      dispatch(setAgencyToEdit(row));
                                      history.push(`/edit-agency/${id}`);
                                    }}
                                  />
                                  <DeleteIcon
                                    sx={{
                                      fontSize: 20,
                                      cursor: "pointer",
                                      color: "red",
                                    }}
                                    onClick={() => {
                                      handleDeleteClick(id);
                                    }}
                                  />
                                </div>
                              </TableCell>
                            ) : column.id === "no_of_employees" ? (
                              <TableCell key={column.id} align={column.align}>
                                {(!row?.no_of_employees || row?.no_of_employees === "0") ? "No Employee" : row?.no_of_employees}
                              </TableCell>
                            ) : column.id === "company_address" ? (
                              <TableCell key={column.id} align={column.align}>
                                {!row?.company_address
                                  ? "No Location"
                                  : `${row?.company_address}`}
                              </TableCell>
                            ) : column.id === "total_listings" ? (
                              <TableCell key={column.id} align={column.align}>
                                {row?.total_listings}
                              </TableCell>
                            ) : (
                              <TableCell key={column.id} align={column.align}>
                                {agent_info}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow hover tabIndex={-1}>
                      <TableCell colSpan={8}>No result</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Agency"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this agency?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button onClick={() => handleDeleteAgency()}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;
