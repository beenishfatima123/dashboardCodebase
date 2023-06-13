import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HeadingSvg from "./HeadingSvg";
import Loader from "../../../customComponents/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import AgentTableRows from "./AgentTableRows";
import AddAgentsModal from "./AddAgentsModal";
import { setSelectedTab } from "../../../features/authSlice";
import ConfirmModal from "../../miscellaneousComponents/ConfirmModal";
import {
  getAgencyAgents,
  removeAgent,
  setVerificationDetail,
  resetDeactivateUserApi,
  resetActivateUserApi,
  resetRemoveAgentApi,
} from "../../../features/usersSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fffff",
    color: "#134696",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    padding: "10px",
    height: 70,
  },
}));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 1700,
    alignSelf: "center",
    width: "100%",
    margin: "20px 0px",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    width: "100%",
    left: -80,
  },
  horizontal: {
    display: "flex",
    alignSelf: "flex-end",
    minWidth: 250,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomBorder: {
    height: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "lightGray",
    marginTop: 20,
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    height: 44,
    marginRight: 20,
    minWidth: "max-content",
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));
const AgencyAgents = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = false;

  const [hovering, setHovering] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedAgentID, setSelectedAgentID] = useState(null);

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { agencyDetails } = useSelector((state) => state.agency);
  const {
    agencyAgents,
    agencyAgentsApiInfo,
    deactivateUserApiInfo,
    activateUserApiInfo,
    removeAgentApiInfo,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (agencyDetails) {
      dispatch(getAgencyAgents({ id: agencyDetails?.id }));
    }
    // eslint-disable-next-line
  }, [agencyDetails]);

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

  useEffect(() => {
    if (removeAgentApiInfo?.response?.status === true) {
      toast.success(removeAgentApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetRemoveAgentApi());
    }
    // eslint-disable-next-line
  }, [removeAgentApiInfo?.response]);

  const handleRowClick = (rowData) => {
    dispatch(
      setVerificationDetail({
        isDirect: true,
        verificationID: null,
      })
    );
    history.push(`/user/${rowData?.id}`);
  };

  const removeAgentFromAgency = async () => {
    setOpenConfirmModal(false);
    let formData = new FormData();
    formData.append("user_id", selectedAgentID);
    formData.append("agency_id", agencyDetails?.id);
    dispatch(
      removeAgent({
        authToken: loggedInObject?.token,
        formData: formData,
        agentID: selectedAgentID,
      })
    );
  };

  return (
    <div className={classes.container}>
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to remove user from agency?"
          handleConfirm={removeAgentFromAgency}
        />
      )}
      <div className={classes.topContainer}>
        <HeadingSvg heading={`All Agents of ${agencyDetails?.company_name}`} />
        <div className={classes.horizontal}>
          <Button
            sx={{
              background:
                "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
              textTransform: "none",
              color: "#134696",
              width: 180,
              margin: "10px 5%",
              alignSelf: "flex-end",
              borderRadius: 0,
            }}
            endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
            onClick={() => {
              history.push("/users");
              dispatch(setSelectedTab("Users"));
            }}
          >
            View All
          </Button>
          <div
            className={classes.addBtn}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => setOpen(true)}
            style={{
              padding: hovering ? "0px 20px" : "0px 10px",
            }}
          >
            {hovering ? (
              <span className={classes.btnText}>ADD AGENT</span>
            ) : (
              <AddIcon style={{ color: "white" }} />
            )}
          </div>
          {open && <AddAgentsModal open={open} setOpen={setOpen} />}
        </div>
      </div>
      {agencyAgentsApiInfo?.loading || removeAgentApiInfo?.loading ? (
        <Loader
          customContainerStyle={{ minHeight: "10vh" }}
          customImageStyle={{ height: 150, width: 150 }}
        />
      ) : (
        <>
          {agencyAgents?.count > 0 ? (
            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: darkMode ? "#303134" : "",
              }}
            >
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {[
                      "Name",
                      "Location",
                      "Agency Association",
                      "Listings",
                    ]?.map((elem, index) => (
                      <StyledTableCell
                        key={index}
                        style={{
                          color: darkMode ? "#0ed864" : "#134696",
                        }}
                      >
                        {elem}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {agencyAgents?.result?.map((elem, index) => (
                    <AgentTableRows
                      key={index}
                      agent={elem}
                      handleRowClick={handleRowClick}
                      setOpenConfirmModal={setOpenConfirmModal}
                      selectedAgentID={selectedAgentID}
                      setSelectedAgentID={setSelectedAgentID}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "#134696",
                  fontSize: 28,
                  fontWeight: "bold",
                }}
              >
                Not Agents
              </p>
            </div>
          )}
        </>
      )}

      <div className={classes.bottomBorder} />
    </div>
  );
};

export default AgencyAgents;
