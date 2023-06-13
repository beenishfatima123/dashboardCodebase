import React from "react";
import { Button, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #fff",
    boxShadow: 24,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    width: 300,
    maxWidth: "90%",
  },
  heading: {
    color: "#014493",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 20,
    fontFamily: "heavy",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    width: "90%",
  },
}));

const ConfirmModal = ({ open, setOpen, title, handleConfirm, setSelItem }) => {
  const classes = useStyles();
  const darkMode = false;

  return (
    <Modal
      open={open}
      onClose={() => {
        setSelItem?.(null);
        setOpen(false);
      }}
    >
      <div className={classes.modal}>
        <span className={classes.heading}>{title}</span>
        <div className={classes.buttonContainer}>
          <Button
            sx={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: "#fff",
              fontFamily: "heavy",
              fontSize: 15,
              mr: 1,
              "&:hover": {
                backgroundColor: darkMode ? "#0ed864" : "#134696",
              },
            }}
            onClick={handleConfirm}
          >
            Yes
          </Button>

          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#134696",
              fontFamily: "heavy",
              fontSize: 15,
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            onClick={() => {
              setSelItem?.(null);
              setOpen(false);
            }}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
