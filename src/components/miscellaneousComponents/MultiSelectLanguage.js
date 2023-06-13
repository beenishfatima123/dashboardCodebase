import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { AVAILABLE_LANGUAGES } from '../constants/global';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CustomInputComponent = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    height: 33,
    width: '100%',
    border: '2px solid #014493',
    borderRadius: 20,
    color: '#767676',
    fontFamily: 'Poopins-SemiBold',
    fontSize: 11,
    paddingLeft: 10,
    display: 'flex',
    margin: '5px 0',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    '&::placeholder': {
      color: '#767676',
      fontFamily: 'Poopins-SemiBold',
      fontSize: 11,
    },
    '&:focus': {
      outline: '1px solid #014493',
    },
  },
}));
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelectLanguage({
  setSelectedValues,
  selectedValues,
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const languageSelectorRef = React.useRef(null);
  const [isSelectorOpen, setIsSelectorOpen] = React.useState(false);

  // React.useEffect(() => {
  //   console.log({ languageSelectorRef });
  // }, [languageSelectorRef]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    // setIsSelectorOpen(false);
  };

  return (
    <Select
      multiple
      onClick={() => {
        setOpen(!open);
      }}
      open={open}
      value={selectedValues}
      onChange={handleChange}
      onClick={() => setIsSelectorOpen(!isSelectorOpen)}
      open={isSelectorOpen}
      input={
        <CustomInputComponent
          ref={languageSelectorRef}
          placeholder="Select a Language"
          style={{ width: '100%' }}
          label="Name"
        />
      }
      renderValue={(selected) => (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
          }}
        >
          {selectedValues.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {AVAILABLE_LANGUAGES?.map((name, index) => (
        <MenuItem
          key={index}
          value={name}
          style={getStyles(name, selectedValues, theme)}
        >
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}
