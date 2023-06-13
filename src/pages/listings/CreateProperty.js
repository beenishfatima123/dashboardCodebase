import React from "react";
import { makeStyles } from "@mui/styles";
import ContentContainer from "../../components/listing/create/ContentContainer";
import Layout from "../../customComponents/layout/Layout";
import CustomTopInfo from "../../customComponents/layout/CustomTopInfo";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));
const CreateProperty = () => {
  const classes = useStyles();

  return (
    <Layout>
      <CustomTopInfo heading="Add Listings" />
      <div className={classes.container}>
        <ContentContainer />
      </div>
    </Layout>
  );
};

export default CreateProperty;
