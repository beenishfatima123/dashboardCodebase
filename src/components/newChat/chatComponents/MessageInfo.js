import React from 'react';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    borderBottom: '1px solid #D7DFE8',
    padding: '0 10px',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  messageLabel: {
    fontSize: 22,
    fontFamily: 'bold',
    color: '#292929',
  },
  messageDetail: {
    fontSize: 16,
    fontFamily: 'light',
    color: '#ADA7A7',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid #9DAFBD',
    position: 'relative',
    width: 300,
  },
  input: {
    display: 'flex',
    flex: 1,
    border: 'none',
    fontSize: 16,
    '&:focus': {
      outline: 'none',
    },
    color: '#9DAFBD',
  },
}));

const MessageInfo = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.messageLabel}>All Messages</div>
          <div className={classes.messageDetail}>351 Messages, 8 Unread </div>
        </div>
        <div className={classes.right}>
          <SearchIcon style={{ color: '#9DAFBD' }} />
          <input
            type="text"
            className={classes.input}
            placeholder={'Search Here'}
          />
        </div>
      </div>
    </>
  );
};

export default MessageInfo;
