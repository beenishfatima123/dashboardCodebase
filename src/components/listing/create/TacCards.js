import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPropertyData,
  setSelectedTab,
} from "../../../features/createPropertySlice";
import { PROPERTY_ATTRIBUTES } from "../../constants/propertyConstants";
import {
  getCategoryLogos,
  getFeaturesLogos,
  getMultiSelectTacButtonSx,
  getServiceLogos,
  getTacButtonSx,
  getTypeLogo,
} from '../../../components/constants/helpers/propertyCreation';

const gridSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
};

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    padding: '20px 0px',
    flexDirection: 'column',
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "20px 20px",
    padding: "20px 0",
    maxWidth: "95%",
    // height:'calc(100vh - 33vh)',
    // overflow:'scroll'
  },
  title: {
    fontSize: 15,
    color: '#134696',
    borderBottom: '1px solid #134696',
    padding: '10px 5%',
    marginRight: '5%',
    fontFamily: 'heavy',
  },
  text: {
    fontSize: 15,
    marginTop: 20,
  },
  typeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    boxShadow:  "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: 10,
    height: 120,
    width: 120,
  },
}));

const TacCards = ({ items, attribute, multiselect }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const selectedTab = useSelector((state) => state.createProperty.selectedTab);
  const allTabs = useSelector((state) => state.createProperty.allTabs);
  const darkMode = false;
//   const { darkMode } = useSelector((state) => state.global);

  const handleMultiSelect = (item) => {
    dispatch(
      setPropertyData({
        ...propertyData,
        [attribute]: propertyData?.[attribute]?.length ? setItem(item) : [item],
      })
    );
  };
  const setItem = (item) => {
    if (propertyData?.[attribute]?.includes(item))
      return propertyData?.[attribute]?.filter((elem) => elem !== item);
    else return [...propertyData?.[attribute], item];
  };
  const handleClick = (value) => {
    if (attribute === PROPERTY_ATTRIBUTES?.TYPE)
      dispatch(
        setPropertyData({ ...propertyData, [attribute]: value, category: null })
      );
    else dispatch(setPropertyData({ ...propertyData, [attribute]: value }));
    dispatch(setSelectedTab(allTabs[allTabs?.indexOf(selectedTab) + 1]));
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
        Select one to proceed
      </span>
      <Grid container columnSpacing={2}>
        {items?.map((elem, index) => (
          <Grid key={index} item xs={6} sx={gridSx}>
            <Button
              disableRipple
              sx={
                multiselect
                  ? getMultiSelectTacButtonSx(
                      elem,
                      propertyData?.[attribute],
                      darkMode
                    )
                  : getTacButtonSx(elem, propertyData, attribute, darkMode)
              }
              onClick={() =>
                multiselect ? handleMultiSelect(elem) : handleClick(elem)
              }
            >
              {attribute === PROPERTY_ATTRIBUTES?.TYPE &&
                getTypeLogo(index, propertyData, darkMode)}
              {attribute === PROPERTY_ATTRIBUTES?.CATEGORY &&
                getCategoryLogos(index, propertyData, darkMode)}
              {attribute === PROPERTY_ATTRIBUTES?.SERVICES &&
                getServiceLogos(index, propertyData, darkMode)}
              {attribute === PROPERTY_ATTRIBUTES?.FEATURES &&
                getFeaturesLogos(index, propertyData, darkMode)}

              <span
                className={classes.text}
                style={{
                  color: multiselect
                    ? propertyData?.[attribute]?.includes(elem)
                      ? '#fff'
                      : darkMode
                      ? '#0ed864'
                      : '#134696'
                    : propertyData?.[attribute] === elem
                    ? '#fff'
                    : darkMode
                    ? '#0ed864'
                    : '#134696',
                }}
              >
                {elem}
              </span>
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TacCards;
