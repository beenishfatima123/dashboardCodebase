import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  CardActions,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionByID, updateAuction } from "../../features/auctionSlice";
import { baseUrl } from "../constants/baseUrls";
import Loader from "../../customComponents/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

const currencyList = [
  { code: "PKR", name: "Pak Rupee" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "USD", name: "Dollar" },
];

const unitList = [
  { code: "Square Feet", name: "Square Feet" },
  { code: "Marla", name: "Marla" },
  { code: "Kanal", name: "Kanal" },
];

const auctionTypeList = [
  { code: "single", name: "Single File" },
  { code: "bulk", name: "Bulk Files" },
  { code: "sub_unit", name: "Sub-Unit Trading" },
];

export const AuctionProfileDetails = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
  const token = loggedInObject?.token;

  const lang = useSelector((state) => state.language);
  const auctionState = useSelector((state) => state.auctions);
  const { auctionDetail, isLoading } = auctionState;
  const [deletedIds, setDeletedIds] = React.useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    dispatch(getAuctionByID({ id: props.id, authToken: token }));
  }, []);

  useEffect(() => {
    setFiles(auctionDetail?.photos);
    setDeletedIds([]);
  }, [auctionDetail]);

  const initialValue = {
    unit: auctionDetail?.unit ? auctionDetail?.unit : "",
    size: auctionDetail?.size ? auctionDetail?.size : "",
    currency: auctionDetail?.currency ? auctionDetail?.currency : "",
    price: auctionDetail?.price ? auctionDetail?.price : "",
    auction_type: auctionDetail?.auction_type ? auctionDetail?.auction_type : "",
    total_files: auctionDetail?.total_files ? auctionDetail?.total_files : "",
    sub_unit_value: auctionDetail?.sub_unit_value ? auctionDetail?.sub_unit_value : "",
    sub_unit_share_percentage: auctionDetail?.sub_unit_share_percentage ? auctionDetail?.sub_unit_share_percentage : "",
    start_date: auctionDetail?.start_date ? auctionDetail?.start_date : "",
    end_date: auctionDetail?.end_date ? auctionDetail?.end_date : "",
    area: auctionDetail?.area ? auctionDetail?.area : "",
    city: auctionDetail?.city ? auctionDetail?.city : "",
    country: auctionDetail?.country ? auctionDetail?.country : "",
    photos: auctionDetail?.photos ? auctionDetail?.photos : [],
  };

  const deleteImage = async (data) => {
    try {
      const { authToken, id } = data;
      const delResponse = await axios.delete(
        baseUrl + `/users/property-files-images/${id}/`,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      if (delResponse) {
        return delResponse.data;
      } else return false;
    } catch (error) {
      console.log("error in: delete auction image", { error });
      return false;
    }
  };

  const insertImage = async (data) => {
    try {
      const { authToken, images } = data;
      const addResponse = await axios.post(
        baseUrl + `/users/property-files-images/`,
        images,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      if (addResponse) {
        return addResponse.data;
      } else return false;
    } catch (error) {
      console.log("error in: Add auction's image", { error });
      return false;
    }
  };

  const handleSubmit = async (values) => {
    if (values?.auction_type === "bulk" && values?.total_files < 2) {
      toast.error("Invalid File numbers. Must be more than 1", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      return;
    }

    if (deletedIds || deletedIds?.length) {
      deletedIds?.forEach(async (imageId) => {
        const response = await deleteImage({
          id: imageId,
          authToken: token,
        });
      });
    }

    if (newFiles || newFiles?.length > 0) {
      const newImages = new FormData();
      newImages.append("property_files_fk", props.id);
      newImages.append("len", newFiles?.length);
      newFiles?.forEach((file, i) => {
        newImages.append("file[" + i + "]", file?.file);
      });
      const response = await insertImage({
        images: newImages,
        authToken: token,
      });
      if (response?.count > 0) {
        toast.warn(JSON.stringify(response.message), {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        });
      }
    }

    let formData = new FormData();

    formData.append("unit", values?.unit);
    formData.append("size", values?.size);
    formData.append("currency", values?.currency);
    formData.append("price", values?.price);
    if (values?.auction_type === "sub_unit") {
      formData.append("sub_unit_share_percentage", values?.sub_unit_share_percentage);
      formData.append("sub_unit_value", values?.sub_unit_value);
    }
    else if (values?.auction_type === "bulk") {
      formData.append("total_files", values?.total_files);
    }
    formData.append("start_date", moment(values?.start_date).format("YYYY-MM-DD"));
    formData.append("end_date", moment(values?.end_date).format("YYYY-MM-DD"));
    formData.append("area", values?.area);
    formData.append("city", values?.city);
    formData.append("country", values?.country);
    dispatch(
      updateAuction({
        authToken: token,
        id: props.id,
        data: formData,
      })
    ).then((response) => {
      setNewFiles([]);
      if (response.payload.data.status) {
        toast.success(JSON.stringify("Auction details updated successfully."), {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: "#014493" },
        });
        history.push("/auctions");
      } else {
        toast.error(JSON.stringify(response.payload.data.message), {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  };

  const [newFiles, setNewFiles] = React.useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    let index = newFiles?.length > 0 ? newFiles?.length : 0;
    const imagesArray = selectedFilesArray.map((file) => {
      return { id: index++, file: file };
    });
    setNewFiles((previousImages) => previousImages.concat(imagesArray));
  };
  const handleClick = () => {
    inputRef.current.click();
  };
  const removeNewImage = (id) => {
    const images = newFiles.filter((file) => Number(file.id) !== Number(id));
    setNewFiles(images);
  };
  const removeExistingImage = (id) => {
    setDeletedIds([...deletedIds, id]);
    const images = files.filter((file) => Number(file.id) !== Number(id));
    setFiles(images);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, isValid, values }) => (
            <Form>
              <Card>
                <CardHeader
                  subheader="The information can be edited"
                  title="Auction Details"
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Select Unit"
                        name="unit"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values?.unit}
                        variant="outlined"
                      >
                        <option value="DEFAULT" disabled>
                          Property Size Unit
                        </option>
                        {unitList.map((cur, index) => (
                          <option value={cur.code} key={index}>
                            {cur.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Total area of plot"
                        name="size"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        required
                        value={values?.size}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Select Currency"
                        name="currency"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values?.currency}
                        variant="outlined"
                      >
                        <option value="DEFAULT" disabled>
                          Currency
                        </option>
                        {currencyList.map((cur, index) => (
                          <option value={cur.code} key={index}>
                            {cur.name}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="File price"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        // min={0}
                        required
                        value={values?.price}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Select Auction Type"
                        disabled
                        name="auction_type"
                        onChange={handleChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={values?.auction_type}
                        variant="outlined"
                      >
                        <option value="DEFAULT" disabled>
                          Auction type
                        </option>
                        {auctionTypeList.map((type, index) => (
                          <option value={type?.code} key={index}>
                            {type?.name}
                          </option>
                        ))}
                        {/* <option value="single">Single File</option> */}
                        {/* <option value="bulk">Bulk Files</option> */}
                      </TextField>
                    </Grid>
                    {values?.auction_type === "bulk" || !values?.auction_type ? (
                      <Grid item lg={4} md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="File Number Start"
                          name="total_files"
                          disabled
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                          required
                          value={values?.total_files}
                          variant="outlined"
                        />
                      </Grid>
                    ) : (values?.auction_type === "sub_unit" || !values?.auction_type ? (
                      <>
                        <Grid item lg={4} md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Sub-unit price value"
                            name="sub_unit_value"
                            // disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="number"
                            required
                            value={values?.sub_unit_value}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item lg={4} md={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Sub-unit share percentage"
                            name="sub_unit_share_percentage"
                            // disabled
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="number"
                            required
                            value={values?.sub_unit_share_percentage}
                            variant="outlined"
                          />
                        </Grid>
                      </>) : null
                    )}
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        name="start_date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="date"
                        value={ values?.start_date !=="" ? new Date(values?.start_date).toLocaleDateString('en-CA') : ""}
                      // variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="End Date"
                        name="end_date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="date"
                        value={ values?.end_date !== "" ? new Date(values?.end_date).toLocaleDateString('en-CA') : ""}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Area"
                        name="area"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        value={values?.area}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        onChange={handleChange}
                        type="text"
                        value={values?.city}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        value={values?.country}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        {files &&
                          files?.map((image, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  margin: "1rem 0.5rem",
                                  position: "relative",
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                                }}
                              >
                                <img
                                  src={`${baseUrl}/${image.file_photo}`}
                                  height="100"
                                  width="100"
                                  alt="auction image"
                                />
                                <IconButton
                                  sx={{
                                    position: "absolute",
                                    top: -5,
                                    right: -5,
                                    p: 0,
                                  }}
                                  onClick={() => removeExistingImage(image?.id)}
                                >
                                  <CancelIcon
                                    fontSize="small"
                                    style={{ color: "#014493" }}
                                  />
                                </IconButton>
                              </div>
                            );
                          })}
                      </div>
                      <div style={{ display: "flex" }}>
                        {newFiles &&
                          newFiles?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  margin: "1rem 0.5rem",
                                  position: "relative",
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(item?.file)}
                                  height="100"
                                  width="100"
                                  alt="upload"
                                />
                                <IconButton
                                  sx={{
                                    position: "absolute",
                                    top: -5,
                                    right: -5,
                                    p: 0,
                                  }}
                                  onClick={() => removeNewImage(item?.id)}
                                >
                                  <CancelIcon
                                    fontSize="small"
                                    style={{ color: "#014493" }}
                                  />
                                </IconButton>
                              </div>
                            );
                          })}
                      </div>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="secondary"
                      fullWidth
                      variant="text"
                      onClick={handleClick}
                    >
                      Upload More Images
                    </Button>
                    <input
                      style={{ display: "none" }}
                      ref={inputRef}
                      type="file"
                      name="image"
                      multiple
                      accept="image/png , image/jpeg, image/webp"
                      onChange={handleChange}
                      onInput={onSelectFile}
                      onBlur={handleBlur}
                    />
                  </CardActions>
                </Card>
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
                    disabled={!isValid}
                  >
                    Save details
                  </Button>
                </Box>
              </Card>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
