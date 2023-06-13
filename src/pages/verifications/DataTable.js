import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Box,
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
import { setVerificationDetail } from "../../features/usersSlice";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import ApproveIcon from "@mui/icons-material/CheckCircleOutline";
import VerifiedIcon from "@mui/icons-material/CheckCircle";
import CustomTooltip from "../../components/miscellaneousComponents/CustomTooltip";
import {
  updateVerification,
} from "../../features/verificationSlice";
import { setAgencyVerificationDetail } from "../../features/agencySlice";

const useStyles = makeStyles(() => ({
  btnContainer: {
    display: "flex",
    width: "100%",
    gap: "20px",
  },
}));

const DataTable = ({ dataToShow, type, columns }) => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const {
    allRequestsApiInfo,
    updateRequestApiInfo,
  } = useSelector((state) => state.verifications);

  const [selReqId, setSelReqId] = useState(null);

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
                  {columns?.map((column) => (
                    <TableCell
                      key={column?.id}
                      align={column?.align}
                      style={{
                        minWidth: column?.minWidth,
                        color: "#014493",
                      }}
                    >
                      <b> {column?.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {allRequestsApiInfo?.loading ? (
                <TableBody>
                  <TableRow hover tabIndex={-1}>
                    <TableCell colSpan={8}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {dataToShow?.result?.count > 0 ? (
                    dataToShow?.result?.results?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns?.map((column) => {
                            const agent_info = row?.[type][column?.id];
                            const photo =
                              type === "user"
                                ? row?.[type]?.photo
                                : row?.[type]?.company_logo;
                            const id = row[type][column?.id];
                            return column?.id === "photos" ||
                              column?.id === "company_logo" ? (
                              <TableCell
                                key={column?.id}
                                align={column?.align}
                                onClick={() => {
                                  if (type === "user")
                                    dispatch(
                                      setVerificationDetail({
                                        isDirect: false,
                                        verificationID: row?.id,
                                      })
                                    );
                                  else if (type === "agency") {
                                    dispatch(
                                      setAgencyVerificationDetail({
                                        isDirect: false,
                                        verificationID: row?.id,
                                      })
                                    );
                                  }
                                  history.push(`/${type}/${row?.[type]?.id}`);
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
                            ) : column?.id === "id" ? (
                              <TableCell key={column?.id} align={"left"}>
                                {(type === "user" && row?.[type]?.verification_status_by_admin ===
                                  "in_progress") ||
                                  (type === "agency" && row?.[type]?.verification_status ===
                                    "in_progress") ? (
                                  <div className={classes.btnContainer}>
                                    {selReqId === id &&
                                      updateRequestApiInfo?.loading ? (
                                      <CircularProgress
                                        size={25}
                                        sx={{
                                          color: "#134696",
                                        }}
                                      />
                                    ) : (
                                      <>
                                        <CustomTooltip
                                          title={`Verify ${type}`}
                                          placement="left"
                                        >
                                          <ApproveIcon
                                            onClick={() => {
                                              setSelReqId(id);
                                              const sendVerificationData = {
                                                status: "verified",
                                              };
                                              dispatch(
                                                updateVerification({
                                                  id: row?.id,
                                                  token: loggedInObject?.token,
                                                  reqData: sendVerificationData,
                                                })
                                              );
                                            }}
                                            sx={{
                                              fontSize: 20,
                                              cursor: "pointer",
                                              width: "35px",
                                              height: "35px",
                                              color: "#0ed864",
                                            }}
                                          />
                                        </CustomTooltip>
                                        <CustomTooltip
                                          title={`Decline ${type}`}
                                          placement="left"
                                        >
                                          <DeleteIcon
                                            onClick={() => {
                                              setSelReqId(id);
                                              const sendVerificationData = {
                                                status: "declined",
                                              };
                                              dispatch(
                                                updateVerification({
                                                  id: row?.id,
                                                  token: loggedInObject?.token,
                                                  reqData: sendVerificationData,
                                                })
                                              );
                                            }}
                                            sx={{
                                              fontSize: 20,
                                              cursor: "pointer",
                                              color: "red",
                                              width: "35px",
                                              height: "35px",
                                            }}
                                          />
                                        </CustomTooltip>
                                      </>
                                    )}
                                  </div>
                                ) : null}
                              </TableCell>
                            ) : column?.id === "user_type" ? (
                              <TableCell key={column?.id} align={column?.align}>
                                {row?.[type].user_type === 0
                                  ? "Admin"
                                  : row?.[type].user_type === 1
                                    ? "User"
                                    : row?.[type].user_type === 2
                                      ? "Agent"
                                      : row?.[type].user_type === 3
                                        ? "CEO"
                                        : "Moderator"}
                              </TableCell>
                            ) : column?.id === "address" ? (
                              <TableCell key={column?.id} align={column?.align}>
                                {row?.[type].city}, {row?.[type].country}
                              </TableCell>
                            ) : column?.id === "full_name" ? (
                              <TableCell key={column?.id} align={column?.align}>
                                {agent_info}
                                {row?.[type].verification_status_by_admin ===
                                  "verified" ? (
                                  <Tooltip title="Verified" placement="bottom">
                                    <VerifiedIcon sx={{ color: "#134696" }} />
                                  </Tooltip>
                                ) : null}
                              </TableCell>
                            ) : (
                              <TableCell key={column?.id} align={column?.align}>
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
    </>
  );
};

export default DataTable;
