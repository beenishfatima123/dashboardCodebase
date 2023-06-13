import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateAgent } from "../../features/agentSlice";
import { toast } from "react-toastify";

const ProfileDetail = ({ agentData }) => {
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  const initialValues = {
    first_name: agentData?.first_name ? agentData?.first_name : "",
    last_name: agentData?.last_name ? agentData?.last_name : "",
    date_of_birth: agentData?.date_of_birth ? agentData?.date_of_birth : "",
    phone_number: agentData?.phone_number ? agentData?.phone_number : "",
    designation:
      agentData?.user_type === 0
        ? "Real Estate Admin"
        : agentData?.user_type === 1
        ? "Real Estate User"
        : agentData?.user_type === 2
        ? "Real Estate Agent"
        : agentData?.user_type === 3
        ? "Real Estate CEO"
        : "Real Estate Moderator",
    personal_description: agentData?.personal_description
      ? agentData?.personal_description
      : "",
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values) => {
        let formData = new FormData();
        formData.append(
          "first_name",
          values.first_name ? values.first_name : agentData.first_name
        );
        formData.append(
          "last_name",
          values.last_name ? values.last_name : agentData.last_name
        );
        formData.append(
          "phone_number",
          values?.phone_number ? values?.phone_number : agentData?.phone_number
        );
        formData.append(
          "date_of_birth",
          values.date_of_birth ? values.date_of_birth : agentData.date_of_birth
        );
        formData.append(
          "personal_description",
          values.personal_description
            ? values.personal_description
            : agentData.personal_description
        );
        dispatch(
          updateAgent({
            authToken: loggedInObject?.token,
            id: agentData?.id,
            data: formData,
          })
        ).then((response) => {
          console.log({ response });
          if (response.payload.status) {
            toast.success(JSON.stringify(response.payload.message), {
              position: toast.POSITION.BOTTOM_RIGHT,
              progressStyle: { backgroundColor: "#014493" },
            });
          } else {
            toast.error(JSON.stringify(response.payload.message), {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
      }}
    >
      {({ handleChange, values }) => (
        <Form>
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    name="first_name"
                    id="first_name"
                    onChange={handleChange}
                    required
                    value={values?.first_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Last name"
                    name="last_name"
                    onChange={handleChange}
                    required
                    value={values?.last_name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="dd/mm/yyyy"
                    name="date_of_birth"
                    placeholder="Date of birth"
                    required
                    type="date"
                    value={values?.date_of_birth || ""}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    value={values?.phone_number}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    fullWidth
                    label="Designation"
                    name="designation"
                    onChange={handleChange}
                    disabled
                    value={values?.designation}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TextField
                    fullWidth
                    multiline
                    label="Biography"
                    name="personal_description"
                    onChange={handleChange}
                    value={values?.personal_description}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileDetail;
