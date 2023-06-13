import React from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './creationStyles.css';
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    color: '#134696',
    fontFamily: 'heavy',
  },
  counter: {
    fontSize: 22,
    color: '#134696',
    fontFamily: 'heavy',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px 20px',
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
  },
  helperText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}));
const Counter = ({ value, onChange, label, validating, customStyle }) => {
  const classes = useStyles();
  const darkMode = false;
//   const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container} style={customStyle}>
      <span
        className={classes.label}
        style={{
          color: darkMode ? '#0ed864' : '#134696',
          marginRight: 10,
        }}
      >
        {label}
      </span>
      <div className={classes.vertical}>
        <div className={classes.inputContainer}>
          <IconButton
            sx={{
              borderRadius: '5px',
              backgroundColor: '#c8dbe7',

              '&:hover': {
                backgroundColor: '#c8dbe7',
              },
            }}
            onClick={() => value > 0 && onChange(value - 1)}
          >
            <RemoveIcon style={{ color: '#134696' }} />
          </IconButton>
          <input
            style={{
              border:
                typeof validating === 'string'
                  ? '1px solid #D83F50'
                  : '1px solid #b2b2c9',
              color: darkMode ? '#fff' : '#134696',
            }}
            type="number"
            className="counter-input"
            value={value || 0}
            onChange={(e) => onChange(e.target.value)}
          />
          <IconButton
            sx={{
              borderRadius: '5px',
              backgroundColor: '#c8dbe7',
              '&:hover': {
                backgroundColor: '#c8dbe7',
              },
            }}
            onClick={() => onChange(value + 1)}
          >
            <AddIcon style={{ color: '#134696' }} />
          </IconButton>
        </div>
        {typeof validating === 'string' && (
          <span className={classes.helperText}>{validating}</span>
        )}
      </div>
    </div>
  );
};

export default Counter;
