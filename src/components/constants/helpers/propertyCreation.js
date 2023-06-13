import Balcony from '../../../components/listing/create/svgs/features/Balcony';
import Commercial from '../../../components/listing/create/svgs/type/Commercial';
import Flat from '../../../components/listing/create/svgs/categories/Flat';
import Garden from '../../../components/listing/create/svgs/features/Garden';
import GuestHouse from '../../../components/listing/create/svgs/categories/GuestHouse';
import Hostel from '../../../components/listing/create/svgs/categories/Hostel';
import HotelSuites from '../../../components/listing/create/svgs/categories/HotelSuites';
import House from '../../../components/listing/create/svgs/categories/House';
import Kitchen from '../../../components/listing/create/svgs/features/Kitchen';
import LaundryRoom from '../../../components/listing/create/svgs/features/LaundryRoom';
import Plot from '../../../components/listing/create/svgs/type/Plot';
import Residence from '../../../components/listing/create/svgs/type/Residence';
import Room from '../../../components/listing/create/svgs/categories/Room';
import StoreRoom from '../../../components/listing/create/svgs/features/StoreRoom';
import TvLounge from '../../../components/listing/create/svgs/features/TvLounge';
import {
  PROPERTY_CATEGORIES,
  PROPERTY_FEATURES,
  PROPERTY_SERVICES,
  PROPERTY_TYPES,
} from '../propertyConstants';
import Electricity from '../../../components/listing/create/svgs/serviceSvgs/Electricity';
import Gas from '../../../components/listing/create/svgs/serviceSvgs/Gas';
import Water from '../../../components/listing/create/svgs/serviceSvgs/Water';
import Maintenance from '../../../components/listing/create/svgs/serviceSvgs/Maintenance';
import Security from '../../../components/listing/create/svgs/serviceSvgs/Security';
import Sewerage from '../../../components/listing/create/svgs/serviceSvgs/Sewerage';

export const getTacButtonSx = (value, data, attribute, darkMode) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: '10px',
    maxHeight: '90%',
    maxWidth: '90%',
    textTransform: 'none',
    color: data?.[attribute] === value ? 'white' : '#134696',
    backgroundColor:
      data?.[attribute] === value
        ? darkMode
          ? '#0ed864'
          : '#134696'
        : darkMode
        ? '#2f2f33'
        : 'white',
    '&:hover': {
      backgroundColor:
        data?.[attribute] === value
          ? '#134696'
          : darkMode
          ? '#134696'
          : 'white',
    },
    height: 200,
    width: 200,
  };
};
export const getMultiSelectTacButtonSx = (value, data, darkMode) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
    borderRadius: '10px',
    maxHeight: '90%',
    maxWidth: '90%',
    textTransform: 'none',
    color: data?.includes(value) ? 'white' : '#134696',
    backgroundColor: data?.includes(value)
      ? darkMode
        ? '#0ed864'
        : '#134696'
      : darkMode
      ? '#2f2f33'
      : 'white',
    '&:hover': {
      backgroundColor: data?.includes(value)
        ? '#134696'
        : darkMode
        ? '#134696'
        : 'white',
    },
    height: 200,
    width: 200,
  };
};
export const getTypeLogo = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <Residence
          color={
            data?.type === PROPERTY_TYPES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 1:
      return (
        <Commercial
          color={
            data?.type === PROPERTY_TYPES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 2:
      return (
        <Plot
          color={
            data?.type === PROPERTY_TYPES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    default:
      break;
  }
};
export const getCategoryLogos = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <House
          color={
            data?.category === PROPERTY_CATEGORIES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 1:
      return (
        <GuestHouse
          color={
            data?.category === PROPERTY_CATEGORIES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 2:
      return (
        <Flat
          color={
            data?.category === PROPERTY_CATEGORIES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 3:
      return (
        <HotelSuites
          color={
            data?.category === PROPERTY_CATEGORIES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 4:
      return (
        <Hostel
          color={
            data?.category === PROPERTY_CATEGORIES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 5:
      return (
        <Room
          color={
            data?.category === PROPERTY_CATEGORIES[index]
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    default:
      break;
  }
};
export const getFeaturesLogos = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <TvLounge
          color={
            data?.features?.includes(PROPERTY_FEATURES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 1:
      return (
        <StoreRoom
          color={
            data?.features?.includes(PROPERTY_FEATURES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 2:
      return (
        <LaundryRoom
          color={
            data?.features?.includes(PROPERTY_FEATURES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 3:
      return (
        <Kitchen
          color={
            data?.features?.includes(PROPERTY_FEATURES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 4:
      return (
        <Balcony
          color={
            data?.features?.includes(PROPERTY_FEATURES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 5:
      return (
        <Garden
          color={
            data?.features?.includes(PROPERTY_FEATURES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    default:
      break;
  }
};
export const getServiceLogos = (index, data, darkMode) => {
  switch (index) {
    case 0:
      return (
        <Electricity
          color={
            data?.services?.includes(PROPERTY_SERVICES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 1:
      return (
        <Gas
          color={
            data?.services?.includes(PROPERTY_SERVICES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 2:
      return (
        <Water
          color={
            data?.services?.includes(PROPERTY_SERVICES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 3:
      return (
        <Maintenance
          color={
            data?.services?.includes(PROPERTY_SERVICES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 4:
      return (
        <Security
          color={
            data?.services?.includes(PROPERTY_SERVICES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    case 5:
      return (
        <Sewerage
          color={
            data?.services?.includes(PROPERTY_SERVICES[index])
              ? 'white'
              : darkMode
              ? 'white'
              : '#134696'
          }
        />
      );
    default:
      break;
  }
};
export const validateInputs = (prop, value) => {
  switch (prop) {
    case 'title':
      if (value?.length < 10 || value?.length > 100)
        return 'Title must be between 10 - 100 characters';
      else return null;

    case 'description':
      if (value?.length < 100)
        return 'description must be at least 100 characters';
      else return null;

    case 'size':
      if (parseInt(value) <= 0 || parseInt(value) >= 10000)
        return 'Size must be between 0 - 10000';
      else return null;

    case 'price':
      if (parseInt(value) <= 0) {
        return 'Price must be greater than 0';
      } else return null;
    default:
      return null;
  }
};

export const IMAGE_LIMIT = 10;