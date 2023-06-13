import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
}));

const numberSx = {
  height: "45px !important",
  width: "45px !important",
  minWidth: 0,
  borderRadius: "5px",
  fontSize: 17,
  fontFamily: "medium",
  textTransform: "none",
  p: 0,
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  ml: 1,
  mr: 1,
};
const Pagination = ({ data, page, paginate }) => {
//   console.log({ data });
  const classes = useStyles();

  const selectedPage = useMemo(() => {
    if (data?.next) return parseInt(data?.next?.split("page=")[1]) - 1;
    else return [...Array(Math.ceil(data?.count / 10))]?.length;
  }, [data]);

  const handlePrevious = () => {
    paginate(data?.previous?.replace("http", "https"));
  };
  const handleNext = () => {
    paginate(data?.next?.replace("http", "https"));
  };
  return (
    <div className={classes.container}>
      <Button
        sx={{
          fontSize: 18,
          fontFamily: "medium",
          textTransform: "none",
          color: "#9DAFBD",
          "&:disabled": {
            color: "#D6D6D6",
          },
        }}
        disabled={!data?.previous}
        onClick={handlePrevious}
      >
        Previous
      </Button>
      {[...Array(Math.ceil(data?.count / 10))].map((elem, index) => (
        <Button
          key={index}
          sx={{
            ...numberSx,
            color: selectedPage === index + 1 ? "#134696" : "#9DAFBD",
            fontWeight: selectedPage === index + 1 ? "bold" : "normal",
            backgroundColor: "",
          }}
          onClick={() => page(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        sx={{
          fontSize: 18,
          fontFamily: "medium",
          textTransform: "none",
          color: "#9DAFBD",
          "&:disabled": {
            color: "#D6D6D6",
          },
        }}
        disabled={!data?.next}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
