import React from 'react';
import { makeStyles } from '@mui/styles';
import './creationStyles.css';

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

const InputField = ({
  name,
  placeholder,
  value,
  onChange,
  onKeyPress,
  type,
  label,
  validating,
  onFocus,
  onBlur,
  max,
  min,
}) => {
  const classes = useStyles();
  const darkMode = false;
  // const { darkMode } = useSelector((state) => state.global);

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
        {type === 'area' ? (
          <textarea
            name={name}
            className="creation-input"
            rows="4"
            placeholder={placeholder}
            value={value || ''}
            onChange={onChange}
            onKeyPress={onKeyPress}
            style={{
              color: darkMode ? '#fff' : '#134696',
            }}
          />
        ) : (
          <input
            name={name}
            type={type}
            className="creation-input"
            placeholder={placeholder}
            value={value || ''}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onFocus={onFocus}
            onBlur={onBlur}
            max={max}
            min={min}
            style={{
              color: darkMode ? '#fff' : '#134696',
            }}
          />
        )}
      </div>
      {typeof validating === 'string' && (
        <span className={classes.helperText}>{validating}</span>
      )}
    </div>
  );
};

export default InputField;
