import React from "react";
import { makeStyles } from "@mui/styles";
import { VERIFICATION_FILTERS } from "../../components/constants/global";
import { Button, Grid } from "@mui/material";
import { resetAllRequests } from "../../features/verificationSlice";
import { useDispatch } from "react-redux";

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

const TypeFilters = ({ selectedFilter, setSelectedFilter, extraStyles }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  return (
    <div className={classes.container} style={extraStyles}>
      <Grid
        container
        sx={{
          transition: "0.5s",
          border: "1px solid lightGray",
          borderRadius: "20px",
          width: "fit-content",
        }}
      >
        {VERIFICATION_FILTERS?.map((elem, index) => (
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
              onClick={() => {
                dispatch(resetAllRequests());
                setSelectedFilter(elem);
              }}
            >
              {elem?.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TypeFilters;
