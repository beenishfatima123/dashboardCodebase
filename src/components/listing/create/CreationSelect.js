import React from "react";
import { makeStyles } from "@mui/styles";
import "../edit/creationStyles.css";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: "#707070",
  },
}));
const CreationSelect = ({ options, onChange, label, value }) => {
  const classes = useStyles();
  const darkMode = false;

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

export default CreationSelect;
