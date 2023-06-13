import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Avatar, Modal } from "@mui/material";
import { baseUrl } from "../../constants/baseUrls";
import { validateEmail } from "../../constants/helperFunctions";
import { checkUniqueEmailExists } from "../../../api/dataApi";
import Loader from "../../../customComponents/Loader";
import {
  getAllPrivateAgents,
  resetAddAgentRequest,
  sendAddAgentRequest,
} from "../../../features/usersSlice";
const useStyles = makeStyles(() => ({
  bidContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 330,
    padding: "20px 0px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: "rgba(255, 255, 255, 0.31)",
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.1px)",
    "-webkit-backdrop-filter": "blur(10.1px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "10px 0px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  userCard: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 5%",
    maxHeight: 50,
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "5px 20px",
    backgroundColor: "white",
    borderRadius: 8,
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#134696",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "light",
    border: "none",
    padding: "5px 10px",
    borderRadius: 5,
  },
  "@media (max-width: 630px)": {
    bidContainer: {
      width: "80%",
      height: "50%",
    },
  },
}));

const AddAgentsModal = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { agencyDetails } = useSelector((state) => state.agency);
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { allPrivateAgents, allPrivateAgentsApiInfo, addAgentRequestApiInfo } =
    useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllPrivateAgents());
    // eslint-disable-next-line
  }, []);

  const handleInputSubmit = async () => {
    if (validateEmail(email)) {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("agency_id", agencyDetails?.id);

      const uniqueResponse = await checkUniqueEmailExists(email);

      if (uniqueResponse?.status) {
        dispatch(
          sendAddAgentRequest({
            token: loggedInObject?.token,
            formData,
          })
        );
      } else {
        toast.error(uniqueResponse?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
        });
      }
    } else
      toast.error("Please provide a valid email", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });

    //formData.append('testing', true);
  };

  useEffect(() => {
    if (addAgentRequestApiInfo?.response) {
      toast.success(addAgentRequestApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      setEmail("");
      dispatch(resetAddAgentRequest());
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [addAgentRequestApiInfo?.response]);

  useEffect(() => {
    if (addAgentRequestApiInfo?.error) {
      toast.error(addAgentRequestApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetAddAgentRequest());
    }
    // eslint-disable-next-line
  }, [addAgentRequestApiInfo?.error]);

  return (
    <Modal open={open} onClose={() => setOpen((prev) => !prev)}>
      <div className={classes.bidContainer}>
        {addAgentRequestApiInfo?.loading || allPrivateAgentsApiInfo?.loading ? (
          <Loader />
        ) : (
          <div className={classes.content}>
            <div className={classes.userCard}>
              <input
                className="login-input"
                style={{
                  borderRadius: 5,
                  border: "1px solid #b2b2c9",
                  height: 25,
                  paddingLeft: 5,
                  maxWidth: "70%",
                }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className={classes.button} onClick={handleInputSubmit}>
                invite
              </button>
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "medium",
                fontSize: 16,
                color: "#fff",
              }}
            >
              OR
            </div>
            {allPrivateAgentsApiInfo?.loading ? (
              <Loader />
            ) : (
              allPrivateAgents?.result?.map((elem, index) => (
                <div
                  className={classes.userCard}
                  key={index}
                  onClick={() => {
                    let formData = new FormData();
                    formData.append("user_id", elem?.id);
                    formData.append("agency_id", agencyDetails?.id);

                    dispatch(
                      sendAddAgentRequest({
                        token: loggedInObject?.token,
                        formData,
                      })
                    );
                    // dispatch(resetAddAgentRequest());
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={baseUrl + "/" + elem?.photo}
                      style={{ height: 30, width: 30 }}
                    />
                    <span style={{ marginLeft: 20 }}>{elem?.first_name}</span>
                  </div>
                  <button className={classes.button}>send</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddAgentsModal;
