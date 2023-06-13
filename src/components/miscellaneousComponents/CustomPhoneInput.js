import React from 'react';
import { makeStyles } from '@mui/styles';
import './loginStyles.css';
import Input from 'react-phone-number-input/input';
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
const CustomPhoneInput = ({
  placeholder,
  value,
  onChange,
  validating,
  startIcon,
  helperText,
  name,
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

        <Input
          className="login-input"
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          name={name}
        />
      </div>
      {validating === false && (
        <span className={classes.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default CustomPhoneInput;
