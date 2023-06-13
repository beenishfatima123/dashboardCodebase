import React from 'react';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { baseUrl } from '../../constants/baseUrls';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
  },
  thumbnail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundPosition: 'center !important',
    backgroundRepeat: 'no-repeat !important',
    backgroundSize: 'cover !important',
    width: '100%',
    minHeight: 300,
    transition: '0.5s',
    position: 'relative',
  },
  '@media (max-width: 1024px)': {
    container: {
      flexDirection: 'column',
    },
  },
}));
const DetailsTop = () => {
  const classes = useStyles();
  let history = useHistory();
  const { projectDetails } = useSelector((state) => state.project);
  return (
    <div
      className={classes.thumbnail}
      style={{
        background: `url(${baseUrl}/${projectDetails?.feature_photo})`,
      }}
    >
      <Button
        sx={{
          background:
            'linear-gradient(90deg, rgba(14,216,100,0.9) 50%, rgba(0,0,0,0) 100%)',
          textTransform: 'none',
          color: '#134696',
          width: 150,
          ml: 3,
          mt: 2,
          borderRadius: 0,
        }}
        startIcon={
          <KeyboardBackspaceSharpIcon
            style={{ color: '#134696', marginLeft: -30 }}
          />
        }
        onClick={() => history.goBack()}
      >
        Back
      </Button>
    </div>
  );
};

export default DetailsTop;
