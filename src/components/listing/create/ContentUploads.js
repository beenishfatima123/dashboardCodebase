import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { setPropertyData } from '../../../features/createPropertySlice';
import { MAX_IMAGE_SIZE } from '../../constants/global';

const gridSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 200,
  position: 'relative',
};
const buttonSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
  borderRadius: '10px',
  height: '80%',
  width: '80%',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'white',
  },
};
const crossButton = {
  position: 'absolute',
  top: 20,
  right: '8%',
  p: 0,
};
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    padding: '20px 0px',
    flexDirection: 'column',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "20px 20px",
    maxWidth: "95%",
    // height:'calc(100vh - 33vh)',
    // overflow:'scroll'
  },
  title: {
    fontSize: 22,
    color: '#134696',
    borderBottom: '1px solid #134696',
    padding: '10px 5%',
    marginRight: '5%',
    fontFamily: 'heavy',
  },
  image: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: '10px',
    height: '80%',
    width: '80%',
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15
  },
}));
const ContentUploads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [discarded, setDiscarded] = useState({imagesCount: 0, floorPlanCount: 0});

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const darkMode = false;
//   const { darkMode } = useSelector((state) => state.global);

  const handleImagePicker = (prop) => (event) => {
    var files = event.target.files;
    files = [...files].filter( (file) => file.size/(1024 ** 2) < MAX_IMAGE_SIZE )
    setDiscarded({
      ...discarded, 
      [`${prop}Count`]: (event.target.files?.length - files?.length)
    })
    dispatch(
      setPropertyData({
        ...propertyData,
        [prop]: propertyData?.[prop]?.length
          ? [...propertyData?.[prop], ...Array.from(files)]
          : files,
      })
    );
  };
  const handleRemoveImage = (prop) => (position) => {
    dispatch(
      setPropertyData({
        ...propertyData,
        [prop]: propertyData?.[prop]?.filter(
          (elem, index) => index !== position
        ),
      })
    );
  };
  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          borderBottom: darkMode ? '1px solid #0ed864' : '1px solid #134696',
          color: darkMode ? '#0ed864' : '#134696',
        }}
      >
        Upload images
      </span>
      <Grid container columnSpacing={1} sx={{ transition: '0.5s' }}>
        {propertyData?.images?.map((elem, index) => (
          <Grid item xs={6} sx={gridSx} key={index}>
            <img
              src={URL.createObjectURL(elem)}
              alt=""
              className={classes.image}
            />
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemoveImage('images')(index)}
            >
              <CancelIcon style={{ color: darkMode ? '#0ed864' : '#134696' }} />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={6} sx={gridSx}>
          <IconButton
            sx={{ ...buttonSx, backgroundColor: darkMode ? '#2f2f33' : '#fff' }}
            component="label"
          >
            <input
              hidden
              accept="image/png, image/jpeg"
              type="file"
              onInput={handleImagePicker('images')}
              multiple
            />
            <AddIcon style={{ color: darkMode ? '#0ed864' : '#134696' }} />
          </IconButton>
        </Grid>
      </Grid>
      {discarded?.imagesCount > 0 && (
        <span className={classes.helperText}>
          {discarded?.imagesCount} image(s) discarded (file size too large).
        </span>
      )}
      <span
        className={classes.title}
        style={{
          borderBottom: darkMode ? '1px solid #0ed864' : '1px solid #134696',
          color: darkMode ? '#0ed864' : '#134696',
        }}
      >
        Upload Floor Plan
      </span>
      <Grid container columnSpacing={1} sx={{ transition: '0.5s' }}>
        {propertyData?.floorPlan?.map((elem, index) => (
          <Grid item xs={6} sx={gridSx} key={index}>
            <img
              src={URL.createObjectURL(elem)}
              alt=""
              className={classes.image}
            />
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemoveImage('floorPlan')(index)}
            >
              <CancelIcon style={{ color: darkMode ? '#0ed864' : '#134696' }} />
            </IconButton>
          </Grid>
        ))}
        <Grid item xs={6} sx={gridSx}>
          <IconButton
            sx={{ ...buttonSx, backgroundColor: darkMode ? '#2f2f33' : '#fff' }}
            component="label"
          >
            <input
              hidden
              type="file"
              onInput={handleImagePicker('floorPlan')}
              accept="image/png, image/jpeg"
              multiple
            />
            <AddIcon style={{ color: darkMode ? '#0ed864' : '#134696' }} />
          </IconButton>
        </Grid>
      </Grid>
      {discarded?.floorPlanCount > 0 && (
        <span className={classes.helperText}>
          {discarded?.floorPlanCount} image(s) discarded (file size too large).
        </span>
      )}
    </div>
  );
};

export default ContentUploads;
