import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import Loader from "../../customComponents/Loader";
import {
  getAllUsers,
  resetDeleteUserApi,
  queryUsers,
  resetSelectedUser,
  setUserUpdateFormData,
  deactivateUser,
  resetDeactivateUserApi,
  activateUser,
  resetActivateUserApi,
  setVerificationDetail,
  deleteUser,
} from "../../features/usersSlice";
import { baseUrl } from "../constants/baseUrls";
import PersonIcon from "@mui/icons-material/Person";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { buildUsersSearchQuery } from "../constants/helperFunctions";
import CustomTooltip from "../miscellaneousComponents/CustomTooltip";
import ConfirmModal from "../miscellaneousComponents/ConfirmModal";
import EditUser from "../../pages/users/EditUser";
import {
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/index';

const columns = [
  { id: "photos", label: "Photo", minWidth: 40 },
  { id: "full_name", label: "Name", minWidth: 100, align: "left" },
  {
    id: "user_type",
    label: "Type",
    minWidth: 100,
    align: "left",
  },
  {
    id: "address",
    label: "Location",
    minWidth: 80,
    align: "center",
  },
  {
    id: "cnic",
    label: "CNIC",
    minWidth: 80,
    align: "center",
  },
  {
    id: "id",
    // label: "Action",
    minWidth: 50,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles(() => ({
  btnContainer: {
    display: "flex",
    width: "100%",
    gap: "20px",
  },
}));

const DataTable = ({ type, searchQuery, self }) => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const {
    allUsers,
    allUsersApiInfo,
    deleteUserApiInfo,
    deactivateUserApiInfo,
    activateUserApiInfo,
    searchedUsers,
    searchUsersApiInfo,
  } = useSelector((state) => state.users);

  // console.log({allUsers, allUsersApiInfo})

  const [selUser, setSelUser] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const delayedUserSearch = useMemo(
    () => debounce((query) => searchUsers(query), 500),
    // eslint-disable-next-line
    []
  );

  const usersToShow = useMemo(() => {
    if (searchQuery?.searchText?.length >= 3 && searchedUsers) {
      return searchedUsers;
    } else if (searchQuery?.country && searchedUsers) {
      return searchedUsers;
    } else if (searchQuery?.city && searchedUsers) {
      return searchedUsers;
    } else {
      return allUsers;
    }
    // eslint-disable-next-line
  }, [searchedUsers, allUsers, searchQuery]);

  useEffect(() => {
    if (
      searchQuery?.searchText?.length >= 3 ||
      searchQuery?.country?.length >= 3 ||
      searchQuery?.city?.length >= 3
    )
      delayedUserSearch(buildUsersSearchQuery(searchQuery));
    // eslint-disable-next-line
  }, [searchQuery]);

  const searchUsers = async (query) => {
    dispatch(
      queryUsers({
        query: query,
        token: loggedInObject?.token,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAllUsers({
        dataURL: baseUrl + `/users/user/?user_type=${type?.value}`,
      })
    );
  }, [type]);

  useEffect(() => {
    if (deleteUserApiInfo?.response?.status) {
      toast.success("User profile deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteUserApi());
    }
    // eslint-disable-next-line
  }, [deleteUserApiInfo?.response]);

  useEffect(() => {
    if (deactivateUserApiInfo?.response?.status === true) {
      toast.success(deactivateUserApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeactivateUserApi());
    }
    // eslint-disable-next-line
  }, [deactivateUserApiInfo?.response]);

  useEffect(() => {
    if (activateUserApiInfo?.response?.status === true) {
      toast.success(activateUserApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetActivateUserApi());
    }
    // eslint-disable-next-line
  }, [activateUserApiInfo?.response]);

  const handlePrevClick = () => {
    dispatch(
      getAllUsers({
        dataURL: allUsers?.result?.previous.replace("http://", "https://"),
      })
    );
  };

  const handleNextClick = () => {
    dispatch(
      getAllUsers({
        dataURL: allUsers?.result?.next.replace("http://", "https://"),
      })
    );
  };

  const removeUser = async () => {
    setOpenConfirmModal(false);
    const docRef = doc(db, "users", selUser?.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(doc(db, "users", selUser?.email))
    }
    dispatch(deleteUser({ authToken: loggedInObject?.token, id: selUser?.id }));
  };

  return (
    <>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to delete this user?"
          handleConfirm={removeUser}
        />
      )}
      {!self ? (
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
                {allUsersApiInfo?.loading ||
                searchUsersApiInfo?.loading ||
                deleteUserApiInfo?.loading ? (
                  <TableBody>
                    <TableRow hover tabIndex={-1}>
                      <TableCell colSpan={8}>
                        <Loader />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {!self && usersToShow?.result?.count > 0 ? (
                      usersToShow?.result?.results?.map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              const agent_info = row?.[column.id];
                              const photo = row?.photo;
                              const id = row[column.id];
                              return column.id === "photos" ? (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  onClick={() => {
                                    dispatch(
                                      setVerificationDetail({
                                        isDirect: true,
                                        verificationID: null,
                                      })
                                    );
                                    history.push(`/user/${row?.id}`);
                                  }}
                                >
                                  {photo ? (
                                    <Avatar
                                      sx={{
                                        width: 50,
                                        height: 50,
                                        cursor: "pointer",
                                      }}
                                      src={"https://api.zeerac.com/" + photo}
                                    />
                                  ) : (
                                    <Avatar
                                      sx={{
                                        width: 50,
                                        height: 50,
                                        cursor: "pointer",
                                      }}
                                    >
                                      {" "}
                                      <PersonIcon />{" "}
                                    </Avatar>
                                  )}
                                </TableCell>
                              ) : column.id === "id" ? (
                                <TableCell key={column.id} align={"left"}>
                                  {/* <Link to={`/editAgent/${id}`}> */}
                                  {/* <Tooltip title="View" placement="top">
                                    <ViewIcon
                                      sx={{ cursor: "pointer", color: "grey" }}
                                      onClick={() =>
                                        history.push(`/agent-detail/${id}`)
                                      }
                                    />
                                  </Tooltip>
                                  <Tooltip title="Edit" placement="top">
                                    <EditIcon
                                      sx={{ cursor: "pointer", color: "blue" }}
                                      onClick={() =>
                                        toggleDrawer("right", true, id)
                                      }
                                    />
                                  </Tooltip>
                                  <Tooltip title="Delete" placement="top">
                                    <DeleteIcon 
                                      color="disabled"
                                      sx={{ cursor: "pointer" }}
                                      // onClick={() => {
                                      //   handleOpen(row?.id, row?.email);
                                      // }}
                                    />
                                  </Tooltip> */}
                                  <div className={classes.btnContainer}>
                                    {selUser?.id === id &&
                                    (deactivateUserApiInfo?.loading ||
                                      activateUserApiInfo?.loading) ? (
                                      <CircularProgress
                                        size={25}
                                        sx={{
                                          color: "#134696",
                                        }}
                                      />
                                    ) : row?.is_active ? (
                                      <CustomTooltip
                                        title="Deactivate User"
                                        placement="left"
                                      >
                                        <ShowIcon
                                          onClick={() => {
                                            setSelUser(row);
                                            let formData = new FormData();
                                            formData.append("user_id", id);
                                            dispatch(
                                              deactivateUser({
                                                authToken:
                                                  loggedInObject?.token,
                                                data: formData,
                                                userID: id,
                                                edit: false,
                                              })
                                            );
                                          }}
                                          sx={{
                                            fontSize: 20,
                                            cursor: "pointer",
                                          }}
                                        />
                                      </CustomTooltip>
                                    ) : (
                                      <CustomTooltip
                                        title="Activate User"
                                        placement="left"
                                      >
                                        <HideIcon
                                          onClick={() => {
                                            setSelUser(row);
                                            let formData = new FormData();
                                            formData.append("user_id", id);
                                            dispatch(
                                              activateUser({
                                                authToken:
                                                  loggedInObject?.token,
                                                data: formData,
                                                userID: id,
                                                edit: false,
                                              })
                                            );
                                          }}
                                          sx={{
                                            fontSize: 20,
                                            cursor: "pointer",
                                          }}
                                        />
                                      </CustomTooltip>
                                    )}
                                    <EditIcon
                                      sx={{ fontSize: 20, cursor: "pointer" }}
                                      onClick={() => {
                                        dispatch(resetSelectedUser());
                                        dispatch(setUserUpdateFormData(null));
                                        history.push(`/edit-user/${id}`);
                                      }}
                                    />
                                    <DeleteIcon
                                      sx={{
                                        fontSize: 20,
                                        cursor: "pointer",
                                        color: "red",
                                      }}
                                      onClick={() => {
                                        setSelUser(row);
                                        setOpenConfirmModal(true);
                                      }}
                                    />
                                  </div>
                                </TableCell>
                              ) : column.id === "user_type" ? (
                                <TableCell key={column.id} align={column.align}>
                                  {row?.user_type === 0
                                    ? "Admin"
                                    : row?.user_type === 1
                                    ? "User"
                                    : row?.user_type === 2
                                    ? "Agent"
                                    : row?.user_type === 3
                                    ? "CEO"
                                    : "Moderator"}
                                </TableCell>
                              ) : column.id === "address" ? (
                                <TableCell key={column.id} align={column.align}>
                                  {!row?.city && !row?.area && !row?.country
                                    ? "No Location"
                                    : `${row?.city}, ${row?.country}`}
                                </TableCell>
                              ) : column.id === "full_name" ? (
                                <TableCell key={column.id} align={column.align}>
                                  {agent_info}
                                  {row?.verification_status_by_admin ===
                                  "verified" ? (
                                    <Tooltip
                                      title="Verified"
                                      placement="bottom"
                                    >
                                      <VerifiedIcon sx={{ color: "#134696" }} />
                                    </Tooltip>
                                  ) : null}
                                </TableCell>
                              ) : column.id === "cnic" ? (
                                <TableCell key={column.id} align={column.align}>
                                  {row?.cnic ? row?.cnic : "No CNIC"}
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

          {allUsers?.result && (
            <div className="pagination justify-content-center mt-4 mb-4">
              <Button
                variant="contained"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={handlePrevClick}
                disabled={allUsers?.result?.previous !== null ? false : true}
              >
                {" "}
                Previous{" "}
              </Button>
              <div
                style={{
                  width: "5px",
                  height: "auto",
                  display: "inline-block",
                }}
              ></div>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleNextClick}
                disabled={allUsers?.result?.next !== null ? false : true}
              >
                {" "}
                Next{" "}
              </Button>
            </div>
          )}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default DataTable;
