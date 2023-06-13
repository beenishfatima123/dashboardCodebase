import React, { useEffect } from "react";
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { resetPasswordApi, resetPassword } from "../../features/authSlice";

const SettingsPassword = () => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const lang = useSelector((state) => state.language);
  const resetPasswordState = useSelector(
    (state) => state.auth.resetPasswordResponse
  );

  const customErrorStyle = {
    textAlign: lang.langIndex === 2 ? "right" : "left",
    marginRight: 5,
    fontSize: 10,
    color: "red",
    marginLeft: 5,
    fontFamily: "Poopins-Regular",
  };

  const initialValue = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  let Schema = Yup.object().shape({
    oldPassword: Yup.string().required(
      "Field can not be empty. Please enter your current password."
    ),
    password: Yup.string()
      .required("Enter your new password.")
      .min(8, "Your password is too short. Min 8 characters required"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  useEffect(() => {
    if (resetPasswordState?.response?.status) {
      toast.success(JSON.stringify(resetPasswordState?.response?.message), {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: "#014493" },
      });
    } else {
      toast.error(JSON.stringify(resetPasswordState?.response?.message), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    dispatch(resetPasswordApi());
  }, [resetPasswordState?.response]);

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={Schema}
      onSubmit={async (values) => {
        let formData = new FormData();
        formData.append("old_password", values?.oldPassword);
        formData.append("new_password", values?.password);
        dispatch(
          resetPassword({
            token: loggedInObject?.token,
            formData,
          })
        );

      }}
    >
      {({ errors, handleChange, touched, isValid }) => (
        <Form>
          <Container sx={{ py: 10 }}>
            <Card>
              <CardHeader subheader="Update password" title="Password" />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="Old Password"
                  margin="normal"
                  name="oldPassword"
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                />
                {errors.oldPassword && touched.oldPassword ? (
                  <div style={customErrorStyle}>{errors.oldPassword}</div>
                ) : null}
                <TextField
                  fullWidth
                  label="New Password"
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                />
                {errors.password && touched.password ? (
                  <div style={customErrorStyle}>{errors.password}</div>
                ) : null}
                <TextField
                  fullWidth
                  label="Confirm password"
                  margin="normal"
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  variant="outlined"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div style={customErrorStyle}>{errors.confirmPassword}</div>
                ) : null}
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Update
                </Button>
              </Box>
            </Card>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsPassword;
