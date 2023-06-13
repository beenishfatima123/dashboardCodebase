import { Formik, Form } from "formik";
import { makeStyles } from "@mui/styles";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import TextTranslation from "../constants/TextTranslation";
import AuctionTypeFields from "./AuctionTypeFields";
import { toast } from "react-toastify";
import { AUCTION_DEFAULT_VALUES } from "../constants/global";
import { setAuctionForm } from "../../features/auctionSlice";
import moment from "moment";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
  input: {
    height: 30,
    width: "100%",
    border: "2px solid #014493",
    borderRadius: 20,
    color: "#767676",
    fontFamily: "Poopins-SemiBold",
    fontSize: 11,
    paddingLeft: 10,
    display: "flex",
    margin: "5px 0",
    alignItems: "center",
    backgroundColor: "#ebebeb",
    "&::placeholder": {
      color: "#767676",
      fontFamily: "Poopins-SemiBold",
      fontSize: 11,
    },
    "&:focus": {
      outline: "1px solid #014493",
    },
  },
  textarea: {
    width: "100%",
    border: "2px solid #014493",
    borderRadius: 20,
    color: "#767676",
    fontFamily: "Poopins-SemiBold",
    fontSize: 11,
    paddingLeft: 10,
    display: "flex",
    margin: "5px 0",
    alignItems: "center",
    backgroundColor: "#ebebeb",
    "&::placeholder": {
      color: "#767676",
      fontFamily: "Poopins-SemiBold",
      fontSize: 11,
    },
    "&:focus": {
      outline: "1px solid #014493",
    },
  },
  error: {
    fontSize: 10,
    color: "red",
    margin: 0,
    fontFamily: "Poopins-Regular",
  },
  btn: {
    width: 150,
    marginTop: 20,
    border: "none",
    backgroundColor: "#014493",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "Poopins-SemiBold",
    borderRadius: 20,
  },
}));

const AuctionInfoForm = ({ setNextTab }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auctionForm = useSelector((state) => state.auctions.auctionForm);
  const lang = useSelector((state) => state.language);

  console.log({ auctionForm })

  // const initialValues = useMemo(() => AUCTION_DEFAULT_VALUES, []);
  const initialValues = {
    unit: auctionForm?.unit ? auctionForm?.unit : "",
    size: auctionForm?.size ? auctionForm?.size : "",
    currency: auctionForm?.currency ? auctionForm?.currency : "",
    price: auctionForm?.price ? auctionForm?.price : "",
    area: auctionForm?.area ? auctionForm?.area : "",
    city: auctionForm?.city ? auctionForm?.city : "",
    country: auctionForm?.country ? auctionForm?.country  : "",
    auction_type: auctionForm?.auction_type ? auctionForm?.auction_type : "single",
    start_date: auctionForm?.start_date ? auctionForm?.start_date : "",
    end_date: auctionForm?.end_date ? auctionForm?.end_date : "",
    total_files: auctionForm?.total_files ? auctionForm?.total_files : 1,
    sub_unit_value: auctionForm?.sub_unit_value ? auctionForm?.sub_unit_value : 0,
    sub_unit_share_percentage: auctionForm?.sub_unit_share_percentage ? auctionForm?.sub_unit_share_percentage : 0,
  };

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

  const customPlaceholderStyle = useMemo(() => {
    return {
      textAlign: lang.langIndex === 2 ? "right" : "left",
      paddingRight: 10,
    };
    // eslint-disable-next-line
  }, [lang]);

  useEffect(() => {
    dispatch(setAuctionForm(AUCTION_DEFAULT_VALUES));
  }, [])
  

  const handleSubmit = (values) => {
    console.log({ values });
    if (values.auction_type === "bulk" && values.total_files < 2) {
      toast.error("Invalid File numbers. Must be more than 1.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      return false;
    }
    if (moment(values?.start_date).isAfter(moment(values?.end_date))) {
      toast.error("Invalid dates selections. End date must be after start date..", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      return false;
    }
    dispatch(setAuctionForm({ ...auctionForm, ...values }));
    setNextTab((prev) => prev + 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        isValid,
        isSubmitting,
        values,
      }) => (
        <Form>
          <Container>
            <Row
              className="justify-content-center"
              style={{
                display: "flex",
                flexDirection: lang.langIndex === 2 ? "row-reverse" : "row",
              }}
            >
              <Col xs={12} sm={12} md={6} lg={6}>
                <input
                  name="area"
                  placeholder={"Society/Area *"}
                  style={customPlaceholderStyle}
                  defaultValue={auctionForm?.area}
                  type="text"
                  min={0}
                  className={classes.input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className={classes.error}>{errors.area}</p>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <input
                  name="city"
                  placeholder={"City *"}
                  style={customPlaceholderStyle}
                  defaultValue={auctionForm?.city}
                  type="text"
                  min={0}
                  className={classes.input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className={classes.error}>{errors.city}</p>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <input
                  name="country"
                  placeholder={"Country *"}
                  style={customPlaceholderStyle}
                  defaultValue={auctionForm?.country}
                  type="text"
                  min={0}
                  className={classes.input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className={classes.error}>{errors.country}</p>
              </Col>
              <AuctionTypeFields
                customPlaceholderStyle={customPlaceholderStyle}
                handleBlur={handleBlur}
                handleChange={handleChange}
                auctionForm={auctionForm}
                errors={errors}
                isSubmitting={isSubmitting}
                values={values}
              />
              <Col xs={12} sm={12} md={6} lg={6}>
                <input
                  name="start_date"
                  placeholder={"Auction Start Date"}
                  style={customPlaceholderStyle}
                  defaultValue={auctionForm?.start_date}
                  type="date"
                  className={classes.input}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p className={classes.error}>{errors.size}</p>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <input
                  name="end_date"
                  placeholder={"Auction End Date"}
                  style={customPlaceholderStyle}
                  defaultValue={auctionForm?.end_date}
                  type="date"
                  className={classes.input}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p className={classes.error}>{errors.size}</p>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <input
                  name="size"
                  placeholder={"Property Size"}
                  style={customPlaceholderStyle}
                  defaultValue={auctionForm?.size}
                  type="number"
                  min={0}
                  className={classes.input}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <p className={classes.error}>{errors.size}</p>
              </Col>
              <Col xs={12} sm={12} md={2} lg={2}>
                <select
                  name="unit"
                  defaultValue={"DEFAULT"}
                  className={classes.input}
                  style={customPlaceholderStyle}
                  onBlur={handleBlur}
                  value={values?.unit}
                  onChange={handleChange}
                >
                  <option value="DEFAULT" disabled>
                    Property Size Unit
                  </option>
                  {unitList.map((unitItem, index) => (
                    <option value={unitItem?.code} key={index}>
                      {unitItem?.name}
                    </option>
                  ))}
                </select>
                <p className={classes.error}>{errors.unit}</p>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <input
                  name="price"
                  placeholder={"File Price *"}
                  style={customPlaceholderStyle}
                  defaultValue={auctionForm?.price}
                  type="number"
                  min={0}
                  className={classes.input}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className={classes.error}>{errors.price}</p>
              </Col>
              <Col xs={12} sm={12} md={3} lg={3}>
                <select
                  name="currency"
                  defaultValue={"DEFAULT"}
                  value={values?.currency}
                  className={classes.input}
                  style={customPlaceholderStyle}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="DEFAULT" disabled>
                    Currency
                  </option>
                  {currencyList.map((cur, index) => (
                    <option value={cur?.code} key={index}>
                      {cur?.name}
                    </option>
                  ))}
                </select>
                <p className={classes.error}>{errors.fileNumberType}</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <button className={classes.btn} type="submit" disabled={!isValid}>
                {TextTranslation.saveAndProceed[lang.langIndex]}
              </button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default AuctionInfoForm;
