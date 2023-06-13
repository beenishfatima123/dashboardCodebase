import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from "@mui/styles";
import {Box, Typography} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import DarkMode from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, setCurrentUser, setSelectedTab } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import { getStringUserType } from '../../components/constants/helperFunctions'
import { db } from '../../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useSelector } from "react-redux";
import { baseUrl } from '../../components/constants/baseUrls';
import { setDarkMode } from '../../features/globalSlice';

const useStyles = makeStyles(() => ({
  menuItem: {
    margin: "8px 13px",
  },
}));
const ProfileMenu = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const loggedInObject = useSelector((state) => state.auth.currentUser);
  const { darkMode } = useSelector((state) => state.global);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const firebaseLogout = async () => {
    try {
      const docRef = doc(db, 'users', loggedInObject.firebaseDocId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(doc(db, "users", loggedInObject?.firebaseDocId), {
          isOnline: false,
        });
      } 
    } catch (error) {
      console.log({ error });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    firebaseLogout();
    toast.warning('Logout Successfully', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    dispatch(setCurrentUser(null));
    dispatch(setSelectedTab(null));
    dispatch(reset());
    history.push('/');
  };

  useEffect(() => {
  }, [loggedInObject?.photo])
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                background: `#fff`,
              }}
              src={ loggedInObject?.provider === "google.com" ? loggedInObject?.photo : `${baseUrl}/${loggedInObject?.photo}`}
            >
              <PersonIcon sx={{ color: '#014493' }} />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "300px", 
            borderRadius: "15px",
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            backgroundColor: "#134696",
            color: "white",
            mt: 1.5,
            margin: 2,
            '& .MuiAvatar-root': {
              width: 60,
              height: 60,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 44,
              width: 10,
              height: 10,
              bgcolor: '#134696',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Box style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Avatar 
              alt="User Name" 
              src={ loggedInObject?.provider === "google.com" ? loggedInObject?.photo : `${baseUrl}/${loggedInObject?.photo}`}
              // src={`${baseUrl}/${loggedInObject?.photo}`}
              /> 
              <Box>
                <Box style={{display: "flex", flexDirection: "column", alignItems: "left"}}>
                  <Typography variant="h6">{`${loggedInObject?.first_name} ${loggedInObject?.last_name}`}</Typography>
                  <Typography variant="caption">{(loggedInObject?.email)}</Typography>
                </Box>
              </Box>
          </Box>
        </MenuItem>
        <Divider sx={{ color: "#FFF"}}/>
        <MenuItem onClick={() => {
          dispatch(setDarkMode(!darkMode));
        }}>
          <ListItemIcon className={classes.menuItem}>
            <DarkMode fontSize="medium" sx={{color: "white"}} />
          </ListItemIcon>
          Dark Mode
        </MenuItem>
        <Divider sx={{ color: "#FFF"}}/>
        
        <MenuItem onClick={handleLogout}>
          <ListItemIcon className={classes.menuItem}>
            <Logout fontSize="medium" sx={{color: "white"}}/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default ProfileMenu;
