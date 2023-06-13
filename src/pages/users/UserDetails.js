import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import Loader from "../../customComponents/Loader";
import {
  getUserByID,
  resetDeleteUserApi,
  resetSelectedUser,
} from "../../features/usersSlice";
import Layout from "../../customComponents/layout/Layout";
import TopContainer from "../../components/users/details/TopContainer";
import DetailsContainer from "../../components/users/details/DetailsContainer";
import { resetUpdateVerificationApi } from "../../features/verificationSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    // marginTop: 10,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const UserDetails = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { selectedUserApiInfo, deleteUserApiInfo } = useSelector((state) => state.users);
  const { updateRequestApiInfo,  } = useSelector(
    (state) => state.verifications
  );

  useEffect(() => {
    dispatch(getUserByID({ id: params?.id }));
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    if (updateRequestApiInfo?.response?.status) {
      toast.success(`User request for verification updated successfully.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#134696" },
      });
      dispatch(resetUpdateVerificationApi());
    }
    // eslint-disable-next-line
  }, [updateRequestApiInfo?.response]);

  useEffect(() => {
    if (deleteUserApiInfo?.response?.status) {
      toast.success("User profile deleted successfully.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetDeleteUserApi());
      history.push("/users");
      dispatch(resetSelectedUser());
    }
    // eslint-disable-next-line
  }, [deleteUserApiInfo?.response]);

  return (
    <Layout>
      {selectedUserApiInfo?.loading || deleteUserApiInfo?.loading ? (
        <Loader />
      ) : (
        <div className={classes.container}>
          <Grid container>
            <Grid item sm={12} md={12}>
              <TopContainer />
            </Grid>
            <Grid item sm={12} md={12}>
              <DetailsContainer />
            </Grid>
          </Grid>
        </div>
      )}
    </Layout>
  );
};

export default UserDetails;
