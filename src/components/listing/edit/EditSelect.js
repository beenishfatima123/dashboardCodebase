import React from "react";
import { makeStyles } from "@mui/styles";
import "./editStyles.css";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingRight: 10,
  },
  label: {
    fontSize: 14,
    color: "#707070",
  },
}));
const EditSelect = ({ options, onChange, label, value }) => {
  const classes = useStyles();
  const darkMode = false;
  // const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <span
        className={classes.label}
        style={{
          color: darkMode ? "#fff" : "#707070",
        }}
      >
        {label}:
      </span>
      <div className="selectDiv">
        <select onChange={onChange} value={value || ""}>
          <option value={value} disabled>
            {value}
          </option>
          {options?.map((elem, index) => (
            <option key={index} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default EditSelect;
