import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { baseUrl } from "../../constants/baseUrls";
import CustomTooltip from "../../miscellaneousComponents/CustomTooltip";
import { CircularProgress, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ShowIcon from "@mui/icons-material/Visibility";
import HideIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/CancelOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import {
  deactivateUser,
  resetSelectedUser,
  setUserUpdateFormData,
  activateUser,
} from "../../../features/usersSlice";

const useStyles = makeStyles(() => ({
  primaryText: {
    fontSize: 18,
    color: "#000000",
    marginLeft: 20,
    fontFamily: "medium",
    textTransform: "capitalize",
    marginBottom: 0,
    marginTop: 0,
  },
  secondaryText: {
    fontSize: 18,
    color: "#8B8B8B",
    marginLeft: 0,
    fontFamily: "light",
    minWidth: 100,
    marginBottom: 0,
    marginTop: 0,
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 210,
    marginRight: 30,
    zIndex: 20,
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    gap: "20px",
  },
}));

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: 70,
  "&:nth-of-type(odd)": {},
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AgentTableRows = ({
  agent,
  handleRowClick,
  setOpenConfirmModal,
  selectedAgentID,
  setSelectedAgentID,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const darkMode = false;

  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { deactivateUserApiInfo, activateUserApiInfo } =
    useSelector((state) => state.users);
  const { agencyDetails } = useSelector((state) => state.agency);

  const removeAgentFromAgency = (agentID) => {
    if (agencyDetails?.admin === agentID) {
      toast.error("Can not remove admin of agency.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
    } else {
      setOpenConfirmModal(true);
      setSelectedAgentID(agentID);
    }
  };

  return (
    <StyledTableRow style={{ cursor: "pointer", zIndex: 10 }}>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => handleRowClick(agent)}
      >
        <Avatar
          alt={agent?.full_name}
          src={`${baseUrl}/${agent?.photo}`}
          style={{ height: 60, width: 60 }}
        />
        <CustomTooltip sx={{ color: "pink" }} title={agent?.full_name}>
          <p
            className={classes.primaryText}
            style={{
              color: darkMode ? "#fff" : "#000000",
              height: 30,
              width: "100%",
            }}
          >
            {agent?.full_name.length > 20
              ? agent?.full_name.substring(0, 20).concat("..")
              : agent?.full_name}
          </p>
        </CustomTooltip>
      </StyledTableCell>

      <StyledTableCell align="left" onClick={() => handleRowClick(agent)}>
        <p className={classes.secondaryText}>
          {`${agent?.city || "city"}, ${agent?.country || "country"}`}
        </p>
      </StyledTableCell>
      <StyledTableCell align="left" onClick={() => handleRowClick(agent)}>
        <p className={classes.secondaryText}>
          {agent?.company || "Private Agent"}
        </p>
      </StyledTableCell>
      <StyledTableCell align="left" onClick={() => handleRowClick(agent)}>
        <p className={classes.secondaryText}>
          {`${agent?.total_listings || "0"} listings`}
        </p>
      </StyledTableCell>
      <StyledTableCell align="left">
        <div className={classes.btnContainer}>
          {selectedAgentID === agent?.id &&
          (activateUserApiInfo?.loading || deactivateUserApiInfo?.loading) ? (
            <CircularProgress
              size={25}
              sx={{
                color: "#134696",
              }}
            />
          ) : agent?.is_active ? (
            <CustomTooltip title="Deactivate User" placement="left">
              <ShowIcon
                sx={{
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedAgentID(agent?.id);
                  let formData = new FormData();
                  formData.append("user_id", agent?.id);
                  dispatch(
                    deactivateUser({
                      authToken: loggedInObject?.token,
                      data: formData,
                      userID: agent?.id,
                      edit: false,
                    })
                  );
                }}
              />
            </CustomTooltip>
          ) : (
            <CustomTooltip title="Activate User" placement="left">
              <HideIcon
                onClick={() => {
                  setSelectedAgentID(agent?.id);
                  let formData = new FormData();
                  formData.append("user_id", agent?.id);
                  dispatch(
                    activateUser({
                      authToken: loggedInObject?.token,
                      data: formData,
                      userID: agent?.id,
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
              history.push(`/edit-user/${agent?.id}`);
            }}
          />
          <DeleteIcon
            sx={{
              fontSize: 20,
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => {
              removeAgentFromAgency(agent?.id);
            }}
          />
        </div>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AgentTableRows;
