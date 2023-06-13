import React, {useMemo} from "react";
import { makeStyles } from "@mui/styles";
import { USER_TYPES_FILTERS, VERIFICATION_FILTERS } from "../constants/global";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    transition: "width 0.5s",
    alignItems: "center",
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    zIndex: 1200,
  },
  btnText: {
    fontSize: 15,
    color: "white",
  },
}));

const UserTypeFilters = ({
  from,
  selectedFilter,
  setSelectedFilter,
  extraStyles,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [hovering, setHovering] = useState(false);
  const darkMode = false;

  const getBtnColor = (elem) => {
    if (darkMode)
      return selectedFilter?.value === elem?.value ? "white" : "white";
    else return selectedFilter?.value === elem?.value ? "white" : "#134696";
  };
  const getBackgroundColor = (elem) => {
    if (darkMode)
      return selectedFilter?.value === elem?.value ? "#0ed864" : "none";
    else return selectedFilter?.value === elem?.value ? "#134696" : "none";
  };

  const OptionsArray = useMemo(() => {
    if (from === "users")
      return USER_TYPES_FILTERS;
    else if (from === "users_verification")
      return VERIFICATION_FILTERS;
  }, [from]);

  
  return (
    <div className={classes.container} style={extraStyles}>
      {/* <div
        className={classes.addBtn}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          padding: hovering ? "10px 40px" : 10,
        }}
        onClick={() => history.push('/add-user')}
      >
        {hovering ? (
          <span className={classes.btnText}>ADD USER</span>
        ) : (
          <AddIcon style={{ color: "white" }} />
        )}
      </div> */}
      <Grid
        container
        sx={{
          transition: "0.5s",
          border: "1px solid lightGray",
          borderRadius: "20px",
          width: "fit-content",
        }}
      >
        {OptionsArray?.map((elem, index) => (
          <Grid item xs={4} sm={4} key={index}>
            <Button
              fullWidth
              sx={{
                backgroundColor: getBackgroundColor(elem),
                color: getBtnColor(elem),
                textTransform: "none",
                borderRadius: 20,
                height: "40px",
                borderRight: "1px solid lightGray",
                "&:hover": {
                  backgroundColor: getBackgroundColor(elem),
                },
                pl: 4,
                pr: 4,
              }}
              onClick={() => setSelectedFilter(elem)}
            >
              {elem?.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserTypeFilters;
