import React from 'react';
import { makeStyles } from '@mui/styles';
import Autocomplete from 'react-google-autocomplete';
import './miscStyles.css';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px 10px',
    borderRadius: 10,
    minWidth: '80%',
    marginTop: 10,
  },
  label: {
    fontSize: 15,
    color: '#134696',
    fontFamily: 'heavy',
  },
  helperText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 3,
  },
}));
const AutocompleteInput = ({
  customClass,
  customStyle,
  options,
  onPlaceSelected,
  placeholder,
  label,
  validating,
  defaultValue,
}) => {
  const classes = useStyles();
  const darkMode = false;

  return (
    <div className={classes.container}>
      <span
        className={classes.label}
        style={{
          color: darkMode ? '#0ed864' : '#134696',
        }}
      >
        {label}
      </span>
      <div
        className={classes.inputContainer}
        style={{
          border:
            typeof validating === 'string'
              ? '1px solid #D83F50'
              : '1px solid #b2b2c9',
        }}
      >
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
          className={customClass || 'autocomplete-input'}
          style={customStyle}
          options={options}
          onPlaceSelected={onPlaceSelected}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      </div>
      {typeof validating === 'string' && (
        <span className={classes.helperText}>{validating}</span>
      )}
    </div>
  );
};

export default AutocompleteInput;
