import React from 'react';
import { makeStyles } from '@mui/styles';
import Autocomplete from 'react-google-autocomplete';
import './loginStyles.css';
const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '80%',
    marginTop: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px 10px',
    borderRadius: 10,
  },
  helperText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 3,
  },
}));
const UserAutoCompleteInput = ({
  placeholder,
  onPlaceSelected,
  startIcon,
  endIcon,
  validating,
  helperText,
  options,
  defaultValue,
  readOnly
}) => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.container}
        style={{
          border:
            validating === false ? '1px solid #D83F50' : '1px solid #b2b2c9',
        }}
      >
        {startIcon}
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
          className={'login-input'}
          options={options}
          onPlaceSelected={onPlaceSelected}
          placeholder={placeholder}
          defaultValue={defaultValue}
          readOnly={readOnly}
        />
        {endIcon}
      </div>
      {validating === false && (
        <span className={classes.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default UserAutoCompleteInput;
