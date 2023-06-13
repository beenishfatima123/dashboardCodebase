import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let temp = localStorage.getItem('@country');

const initialState = {
  country: temp ? temp : null,
  countryData: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const countryDetail = createAsyncThunk(
  'country/countryDetail',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`https://ip.nf/me.json`, data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    countryValue: (state, action) => {
      state.country = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(countryDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(countryDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.countryData = action.payload;
      })
      .addCase(countryDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.countryData = {};
      });
  },
});

export const { countryValue } = countrySlice.actions;

export const getCountryValue = (state) => state.country.country;

export default countrySlice.reducer;
