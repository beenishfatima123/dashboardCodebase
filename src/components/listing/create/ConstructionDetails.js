import React from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPropertyData } from '../../../features/createPropertySlice';
import CreationSelect from './CreationSelect';
import { CONSTRUCTION_DETAILS } from '../../constants/global';
import {
  getConstructionHeading,
  getPastYears,
} from '../../constants/helperFunctions';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '20px 0%',
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
  selectContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flex: 1,
    padding: '20px 5%',
    gap: "80px",
  },
  heading: {
    fontSize: 16,
    color: '#134696',
    fontFamily: 'heavy',
    marginRight: "150px"
  },
}));

const ConstructionDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const darkMode = false;

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const handleChange = (prop) => (event) => {
    dispatch(setPropertyData({ ...propertyData, [prop]: event.target.value }));
  };

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? '#0ed864' : '#134696',
          borderBottom: darkMode ? '1px solid #0ed864' : '1px solid #134696',
        }}
      >
        Construction Details
      </span>
      <div className={classes.selectContainer}>
        {CONSTRUCTION_DETAILS?.map((elem, index) => (
          <div key={index}>
            <span
              className={classes.heading}
              style={{
                color: darkMode ? '#0ed864' : '#134696',
              }}
            >
              {getConstructionHeading(index)}
            </span>
            <div style={{ marginBottom: 30 }}>
              {elem?.map((item, index) => (
                <CreationSelect
                  key={index}
                  label={item?.label}
                  onChange={handleChange(item?.key)}
                  value={propertyData?.[item?.key]}
                  options={
                    item?.key !== 'year_built'
                      ? item?.options
                      : getPastYears(100)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstructionDetails;
