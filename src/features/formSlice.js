import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../components/constants/baseUrls';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// register user without agency
export const getRegisterWithoutCompany = createAsyncThunk(
  'stepper/getRegisterWithoutCompany',
  async (data, { rejectWithValue }) => {
    let formData = new FormData();
    Object.keys(data).map(function (key) {
      formData.append(key, data[key]);
      return formData;
    });
    try {
      const response = await axios.post(baseUrl + 'users/user/', formData);
      if (response.status === true) {
        sessionStorage.setItem(
          'authentication',
          JSON.stringify(response.result)
        );
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          progressStyle: { backgroundColor: '#014493' },
        });
        let history = useHistory();
        history.push('/');
      } else {
        toast.failed(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

// register user with agency
export const getRegisterWithCompany = createAsyncThunk(
  'stepper/getRegisterWithCompany',
  async (data, { rejectWithValue }) => {
    let formData = new FormData();
    Object.keys(data).map(function (key) {
      formData.append(key, data[key]);
      return formData;
    });
    try {
      const response = await axios.post(baseUrl + 'users/company/', formData);
      toast.success(JSON.stringify(response.data.message), {
        position: toast.POSITION.BOTTOM_RIGHT,
        progressStyle: { backgroundColor: '#014493' },
      });
      return response.data;
    } catch (err) {
      if (!err.response) {
        toast.error(JSON.stringify(err.response), {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const formSlice = createSlice({
  name: 'stepper',
  initialState: {
    personalInfo: {},
    addressInfo: {},
    companyInfo: {},
    currentStep: 0,
    signUpStatus: '',
  },
  reducers: {
    personalInfoDetail: (state, action) => {
      state.personalInfo = action.payload;
    },
    addressInfoDetail: (state, action) => {
      state.addressInfo = action.payload;
    },
    companyInfoDetail: (state, action) => {
      state.companyInfo = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevoiusStep: (state) => {
      state.currentStep -= 1;
    },
    activeStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
  extraReducers: {
    // persoanl info state
    [getRegisterWithoutCompany.pending]: (state) => {
      // console.log('pending');
      return { ...state, signUpStatus: 'pending' };
    },
    [getRegisterWithoutCompany.fulfilled]: (state, { payload }) => {
      // console.log('fullfilled');

      return { ...state, personalInfo: payload, signUpStatus: 'success' };
    },

    [getRegisterWithoutCompany.rejected]: (state) => {
      // console.log('rejected');
      return { ...state, signUpStatus: 'rejected' };
    },
    // address info state
    [getRegisterWithoutCompany.pending]: () => {
      // console.log('pending');
    },
    [getRegisterWithoutCompany.fulfilled]: (state, { payload }) => {
      // console.log('fullfilled');
      return { ...state, addressInfo: payload };
    },
    [getRegisterWithoutCompany.rejected]: () => {
      // console.log('rejected');
    },
    // company info state
    [getRegisterWithCompany.pending]: () => {
      // console.log('pending');
    },
    [getRegisterWithCompany.fulfilled]: (state, { payload }) => {
      // console.log('fullfilled');
      return { ...state, companyInfo: payload };
    },
    [getRegisterWithCompany.rejected]: () => {
      // console.log('rejected');
    },
  },
});

export const {
  personalInfoDetail,
  addressInfoDetail,
  companyInfoDetail,
  nextStep,
  prevoiusStep,
  activeStep,
} = formSlice.actions;

export const getPersonalInfoDetail = (state) => state.stepper.personalInfo;
export const getAddressInfoDetail = (state) => state.stepper.addressInfo;
export const getCompanyInfoDetail = (state) => state.stepper.companyInfo;

export default formSlice.reducer;
