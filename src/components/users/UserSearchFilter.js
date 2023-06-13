import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { resetSearchUser } from "../../features/usersSlice";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    border: "2px solid #e3e3e3",
    borderRadius: 5,
    marginTop: 20,
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "20px 0px 20px 0px",
    flexWrap: "wrap",
    gap: "20px",
  },
  subSection: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "30%",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#134696",
  },
  input: {
    border: "none",
    borderBottom: "2px solid #e3e3e3",
    color: "#134696",
    fontSize: 18,
    marginTop: 5,
    fontFamily: "medium",
    "&:focus": {
      outline: "none",
    },
  },
  selectContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #c9c9c9",
    margin: "10px 0px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#134696",
    border: "none",
    color: "#fff",
    fontFamily: "medium",
    width: 80,
    height: 30,
    borderRadius: 20,
    cursor: "pointer",
  },
  "@media (max-width: 600px)": {
    section: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    subSection: {
      width: "100%",
    },
    heading: {
      marginTop: 20,
    },
  },
}));

const UserSearchFilter = ({
  searchQuery,
  setSearchQuery,
  setLocation,
  location,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleLocationChange = (prop) => (event) => {
    setLocation((prev) => ({
      ...prev,
      [prop]: event?.target.value,
    }));
  };

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <div className={classes.subSection}>
          <div className={classes.heading} style={{ marginTop: -5 }}>
            Name of User
          </div>
          <input
            type="text"
            className={classes.input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            placeholder="Agent Name"
          />
        </div>

        <div className={classes.subSection}>
          <div className={classes.heading}>Country</div>
          <div className={classes.selectContainer}>
            <ReactGoogleAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
              className={"login-input"}
              style={{
                fontFamily: "heavy",
                fontSize: 18,
                color: "#7d7d7d",
                border: "none",
                width: "70%",
                outline: "none",
              }}
              value={location?.country || ""}
              onChange={handleLocationChange("country")}
              onPlaceSelected={(val) =>
                setLocation((prev) => ({
                  ...prev,
                  country: val?.name?.split(",")[0],
                }))
              }
              placeholder="Country"
              options={{
                types: ["country"],
                fields: ["name"],
              }}
              // options={{
              //   types: ["(cities)"],
              //   fields: ["name"],
              // }}
            />
          </div>
        </div>

        {/* <div className={classes.subSection}>
          <div className={classes.heading} style={{ marginTop: -5 }}>
            Area
          </div>
          <input
            type="text"
            className={classes.input}
            value={location?.area || ""}
            onChange={handleLocationChange("area")}
            placeholder="Agent Area"
          />
        </div> */}

        <div className={classes.subSection}>
          <div className={classes.heading}>Area/Neighborhodd/City</div>
          <div className={classes.selectContainer}>
            <ReactGoogleAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
              className={"login-input"}
              style={{
                fontFamily: "heavy",
                fontSize: 18,
                color: "#7d7d7d",
                border: "none",
                width: "70%",
                outline: "none",
              }}
              value={location?.city || ""}
              onChange={handleLocationChange("city")}
              onPlaceSelected={(val) =>
                setLocation((prev) => ({
                  ...prev,
                  city: val?.name?.split(",")[0],
                }))
              }
              placeholder="Area/Neighborhodd/City"
              options={{
                types: ['(cities)'],
                fields: ['name'],
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <button
            className={classes.btn}
            onClick={() => {
              setLocation(null);
              dispatch(resetSearchUser());
            }}
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSearchFilter;
