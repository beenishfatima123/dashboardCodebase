import React, {useMemo} from "react";
import { makeStyles } from "@mui/styles";
import { AUCTION_FILTERS } from "../constants/global";
import { Button, Grid } from "@mui/material";

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

const AuctionTypeFilters = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const classes = useStyles();

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
      return AUCTION_FILTERS;
  }, []);

  
  return (
    <div className={classes.container}>
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

export default AuctionTypeFilters;
