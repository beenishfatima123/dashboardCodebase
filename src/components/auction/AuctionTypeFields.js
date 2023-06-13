import { makeStyles } from "@mui/styles";
import { Col } from "react-bootstrap";

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

  error: {
    fontSize: 10,
    color: "red",
    marginTop: -7,
    marginLeft: 5,
    fontFamily: "Poopins-Regular",
  },
}));
const AuctionTypeFields = ({
  customPlaceholderStyle,
  handleBlur,
  handleChange,
  auctionForm,
  errors,
  isSubmitting,
  values,
}) => {
  const classes = useStyles();

  const auctionTypeList = [
    { code: "single", name: "Single File" },
    { code: "bulk", name: "Bulk Files" },
    { code: "sub_unit", name: "Sub-Unit Trading" },
  ];

  return (
    <>
      <Col xs={12} sm={12} md={6} lg={6}>
        <select
          name="auction_type"
          defaultValue={"single"}
          className={classes.input}
          style={customPlaceholderStyle}
          onBlur={handleBlur}
          value={values?.auction_type}
          onChange={handleChange}
        >
          <option value="DEFAULT" disabled>
            Auction type
          </option>
          {auctionTypeList.map((type, index) => (
            <option value={type?.code} key={index}>
              {type?.name}
            </option>
          ))}
        </select>
      </Col>
      {values?.auction_type === "bulk" || !values?.auction_type ? (
        <Col xs={12} sm={12} md={12} lg={12}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              name="total_files"
              placeholder={"Number of files *"}
              style={customPlaceholderStyle}
              defaultValue={auctionForm?.total_files}
              type="number"
              min={0}
              className={classes.input}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className={classes.error}>{errors.total_files}</div>
          </Col>
        </Col>
      ) : (values?.auction_type === "sub_unit" || !values?.auction_type ? (
        <>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              name="sub_unit_value"
              placeholder={"Sub-unit price value *"}
              style={customPlaceholderStyle}
              defaultValue={auctionForm?.sub_unit_value}
              type="number"
              min={0}
              className={classes.input}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.sub_unit_value && isSubmitting ? (
              <div className={classes.error}>{errors.sub_unit_value}</div>
            ) : null}
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              name="sub_unit_share_percentage"
              placeholder={"Sub-unit share percentage *"}
              style={customPlaceholderStyle}
              defaultValue={auctionForm?.sub_unit_share_percentage}
              type="number"
              min={0}
              className={classes.input}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.sub_unit_share_percentage && isSubmitting ? (
              <div className={classes.error}>{errors.sub_unit_share_percentage}</div>
            ) : null}
          </Col>

        </>) : (<></>)
      )}
    </>
  );
};

export default AuctionTypeFields;
