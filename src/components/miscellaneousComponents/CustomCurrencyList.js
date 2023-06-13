import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CURRENCY_LIST } from "constants/global";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  customTextField: {
    "& input::placeholder": {
      color: "#767676",
      opacity: 1,
    },
  },
}));
const CustomCurrencyList = ({ setCurrencyValue }) => {
  const classes = useStyles();

  const handleSelectionAdded = (event, newValue) => {
    setCurrencyValue(newValue.code);
  };
  return (
    <Autocomplete
      size="small"
      onChange={handleSelectionAdded}
      options={CURRENCY_LIST}
      getOptionLabel={(option) => option.name}
      style={{
        width: "100%",
        border: "2px solid #014493",
        borderRadius: 20,
        backgroundColor: "#ebebeb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "5px 0",
        minHeight: 33,
        color: "#767676",
      }}
      clearIcon={null}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={"Currency"}
          variant="standard"
          classes={{ root: classes.customTextField }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            style: {
              color: "#767676",
              fontFamily: "Poopins-SemiBold",
              fontSize: 11,
              alignItems: "center",
            },
          }}
          style={{
            paddingLeft: 10,
          }}
        />
      )}
    />
  );
};

export default CustomCurrencyList;
