import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import FirebaseSocial from "./FirebaseSocial";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  setCurrentUser,
  resetLoginApi,
  login,
  checkFirestoreDoc,
} from "../../../features/authSlice";
import Loader from "../../../customComponents/Loader";
import AuthLeftBackground from "../../../assets/images/auth/AuthLeftBackground";
import AuthRightBackground from "../../../assets/images/auth/AuthRightBackground";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const loginApi = useSelector((state) => state.auth.loginApi);

  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkLoginResponse = async (response) => {
    setLoading(true);
    const {
      id,
      token,
      user_type,
      username,
      first_name,
      last_name,
      email,
      photo,
    } = response;
    await checkFirestoreDoc({
      displayName: `${response?.first_name} ${response?.last_name}`,
      email: response?.email,
      photoURL: response?.photo,
      uid: response?.email,
    });
    localStorage.setItem(
      "logged_in",
      JSON.stringify({
        id,
        token,
        user_type,
        username,
        first_name,
        last_name,
        firebaseDocId: email,
        photo,
        provider: null
      })
    );
    setLoading(false);
    dispatch(setCurrentUser({ ...response, firebaseDocId: response?.email }));
    if (location?.pathname === "/") history.push(`/dashboard`, { replace: true });
    dispatch(resetLoginApi());
  };

  const handleChange = (prop) => (event) => {
    setLoginData((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleLogin = () => {
    var loginFormData = new FormData();
    loginFormData.append("email", loginData?.email);
    loginFormData.append("password", loginData?.password);
    dispatch(login(loginFormData));
  };

  useEffect(() => {
    if (loginApi?.error) {
      toast.error(loginApi?.error?.message, {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetLoginApi());
    }
  }, [loginApi?.error]);

  useEffect(() => {
    if (loginApi?.response) {
      checkLoginResponse(loginApi?.response);
    }
  }, [loginApi?.response]);

  return (
    <>
      {loading === true ? (
        <Box sx={{ minHeight: "100vh" }}>
          <AuthLeftBackground />
          <Loader />
          <AuthRightBackground />
        </Box>
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={async (values) => {
            // console.log("submit", values);
            // handleLogin();
            // try {
            //   var loginFormData = new FormData();
            //   loginFormData.append("email", values?.email);
            //   loginFormData.append("password", values?.password);
            //   dispatch(login(loginFormData));
            // } catch (err) {
            //   console.log({ err })
            // }
          }}
        >
          {({ errors, isSubmitting, touched, values }) => (
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="baseline"
                    sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                  >
                    <Typography variant="h4">Login</Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      name="email"
                      value={loginData?.email}
                      onChange={handleChange("email")}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData?.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-login"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Typography variant="caption"> Login with</Typography>
                  </Divider>
                </Grid>
                <Grid item xs={12}>
                  <FirebaseSocial setLoading={setLoading} />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AuthLogin;
