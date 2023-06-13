import React, { Suspense, lazy, useState, useMemo } from 'react';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
const UsersModal = lazy(() => import('./UsersModal'));

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    borderBottom: '1px solid #D7DFE8',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  user: {
    fontSize: 24,
    fontFamily: 'light',
    color: '#134696',
  },
  date: {
    fontSize: 16,
    fontFamily: 'light',
    color: '#ADA7A7',
  },
  right: {
    display: 'flex',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    backgroundColor: '#134696',
    height: 52,
    padding: '0 10px',
    borderRadius: 10,
    cursor: 'pointer',
    fontFamily: 'light',
    fontSize: 16,
    marginRight: 10,
  },
  iconButton: {
    height: 52,
    width: 52,
    //    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #6B7B88',
    borderRadius: 10,
    cursor: 'pointer',
  },
}));

const PersonalInfo = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  const currentUser = useMemo(() => {
    return JSON.parse(localStorage.getItem("logged_in"));
  }, []);
  return (
    <Suspense fallback={'Loading'}>
      <div className={classes.container}>
        {openModal && <UsersModal isOpen={openModal} setOpen={setOpenModal} />}

        <div className={classes.left}>
          <div className={classes.user}>
            Welcome, {currentUser?.first_name}&nbsp;{currentUser?.last_name}
          </div>
          <div className={classes.date}>
            {moment().format('dddd, DD MMMM YYYY')}
          </div>
        </div>
        <div className={classes.right}>

        </div>
      </div>
    </Suspense>
  );
};

export default PersonalInfo;
