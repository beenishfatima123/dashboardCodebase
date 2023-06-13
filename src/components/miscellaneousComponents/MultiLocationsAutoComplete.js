import { useEffect, useState } from 'react';

import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function MultiLocationsAutoComplete({
  name,
  searchOption,
  customStyle,
  handleChange,
  placeholder,
  dontRestrict,
  country,
  value,
  setValue,
}) {
  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE,
    options: {
      types: searchOption,
      componentRestrictions: dontRestrict ? {} : { country },
      fields: ['formatted_address'],
    },
  });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (placePredictions.length) setSuggestions(placePredictions);
  }, [placePredictions]);

  const handleSelectionAdded = (event) => {
    const {
      target: { textContent },
    } = event;

    if (textContent !== '') {
      setValue((prev) => [
        ...prev,
        { description: getFormattedAddress(textContent) },
      ]);
    }
  };

  const getFormattedAddress = (address) => {
    // return address.split(",")[0];
    return address;
  };
  return (
    <Autocomplete
      multiple
      freeSolo
      size="small"
      onChange={handleSelectionAdded}
      options={suggestions}
      value={value}
      getOptionLabel={(option) => getFormattedAddress(option.description)}
      style={{
        width: '100%',
        border: '2px solid #014493',
        borderRadius: 20,
        backgroundColor: '#ebebeb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px 0',
        minHeight: 33,
      }}
      clearIcon={null}
      ChipProps={{
        onDelete: null,
        onClick: (click) => {
          setValue((prev) =>
            prev.filter(
              (e) =>
                getFormattedAddress(e.description) !==
                getFormattedAddress(click.target.textContent)
            )
          );
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            style: {
              color: 'black',
              fontFamily: 'Poopins-SemiBold',
              fontSize: 11,
              alignItems: 'center',
            },
          }}
          style={{
            paddingLeft: 10,
          }}
          onChange={(e) => getPlacePredictions({ input: e.target.value })}
        />
      )}
    />
  );
}
