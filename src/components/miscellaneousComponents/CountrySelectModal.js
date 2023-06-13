import React from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  IconButton,
  MenuItem,
  Tooltip,
  Menu as MENU,
  Card,
  Modal,
} from "@mui/material";
import TextTranslation from "constants/TextTranslation";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { countryValue } from "features/slices/countrySlice";

const useStyles = makeStyles(() => ({
  menu: {
    "& .MuiPaper-root": {
      border: "2px solid #014493",
      boxShadow: "none",
      borderRadius: 10,
    },
  },
  notificationHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 33,
    backgroundColor: "#014493",
    color: "#fff",
    padding: "0 10px",
    position: "absolute",
    top: 0,
    width: "100%",
    fontFamily: "Poopins-SemiBold",
    fontSize: 14,
  },
  notificationInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //padding: '2px 5px',
    marginTop: 20,
  },
  notificationText: {
    fontSize: 12,
    fontFamily: "Poopins-Regular",
    paddingLeft: 10,
    textOverflow: "ellipse",
    overflow: "hidden",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 310,
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: 24,
    padding: 10,
    borderRadius: 20,
  },
  heading: {
    color: "#014493",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
  },
  dropdown: {
    margin: "0 auto",
    backgroundColor: "#fff",
    width: 250,
    height: 100,
    borderRadius: 15,
    marginTop: 10,
  },
  modalInner: {
    margin: "0 auto",
    width: 210,
    borderRadius: 15,
    backgroundColor: "#014493",
  },
  options: {
    color: "#fff",
    textAlign: "center",
    borderBottom: "1px solid #fff",
    fontSize: 14,
    cursor: "pointer",
  },
}));
const CountrySelectModal = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box className={classes.modal}>
        <div className={classes.heading}>
          {TextTranslation.country[lang.langIndex]}
        </div>
        <div className={classes.dropdown}>
          <div className={classes.modalInner}>
            <option
              className={classes.options}
              onClick={() => {
                dispatch(countryValue("pk"));
                localStorage.setItem("@country", "pk");
                setOpen(false);
              }}
            >
              Pakistan
            </option>
            <option
              className={classes.options}
              onClick={() => {
                dispatch(countryValue("tr"));
                localStorage.setItem("@country", "tr");
                setOpen(false);
              }}
            >
              Turkey
            </option>
            <option
              className={classes.options}
              onClick={() => {
                dispatch(countryValue("ae"));
                localStorage.setItem("@country", "ae");
                setOpen(false);
              }}
            >
              UAE
            </option>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CountrySelectModal;
