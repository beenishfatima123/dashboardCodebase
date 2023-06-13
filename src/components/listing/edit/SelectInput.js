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
const SelectInput = ({
  placeholder,
  value,
  onChangeInput,
  onChangeSelect,
  label,
  options,
  validating,
  min,
  selectedOption,
  step
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
        <input
          type="number"
          step={step}
          className="creation-input"
          placeholder={placeholder}
          value={value || ''}
          onChange={onChangeInput}
          min={min}
          style={{
            color: darkMode ? '#fff' : '#134696',
            margin: '15px 10px',
          }}
        />
        <select className="creation-select" onChange={onChangeSelect} value={selectedOption}>
          {options?.map((elem, index) => (
            <option key={index} value={elem?.value}>
              {elem?.label}
            </option>
          ))}
        </select>
      </div>
      {typeof validating === 'string' && (
        <span className={classes.helperText}>{validating}</span>
      )}
    </div>
  );
};

export default SelectInput;
