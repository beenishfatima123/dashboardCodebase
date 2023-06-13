import axios from 'axios';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../components/constants/baseUrls';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/index';

const initialState = {
  values: {},
  data: {},
  userData: null,
  companyData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLoadingCompany: false,
  isSuccessCompany: false,
  isErrorCompany: false,
  message: '',
  loginResponse: {},
  isLoadingLogin: false,
  isErrorLogin: false,
  isSuccessLogin: false,
  messageLogin: '',

  loginApi: {},
  currentUser: null,
  resetPasswordResponse: {},
  selectedTab: "Dashboard",
};

export const checkFirestoreDoc = async (user) => {
  try {
    const docRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(doc(db, "users", user?.email), {
        isOnline: true,
      });
      return;
    } else {
      await setDoc(doc(db, 'users', user.email), {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        isOnline: true,
        conversations: [],
      });
      return;
    }
  } catch (error) {
    console.log({ error });
    return;
  }
};

export const registerWithoutCompany = createAsyncThunk(
  'auth/registerWithoutCompany',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(baseUrl + '/users/user/', data);
      toast.success('Register SuccessFully');
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerWithCompany = createAsyncThunk(
  'auth/registerWithCompany',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        baseUrl + '/users/company/',
        data.data,
        {
          headers: {
            Authorization: `Token ${data?.token}`,
          },
        }
      );
      toast.success('Register SuccessFully');
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log({ error });
      toast.error(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post(baseUrl + '/users/api/login', data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, thunkAPI) => {
  try {
    const resetResponse = await axios.put(baseUrl + '/users/update-password/', data?.formData, {
      headers: {
        Authorization: `token ${data?.token}`,
      },
    });
    return resetResponse.data;
  } catch (error) {
    const message =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoginApi: (state) => {
      state.loginApi = {};
    },
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.loginResponse = {};
      state.isLoadingLogin = false;
      state.isErrorLogin = false;
      state.isSuccessLogin = false;
      state.messageLogin = '';
    },
    user: (state, action) => {
      state.values = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    resetPasswordApi: (state) => {
      state.resetPasswordResponse = {};
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Without Company
      .addCase(registerWithoutCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerWithoutCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(registerWithoutCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = {};
      })
      // Register With Company
      .addCase(registerWithCompany.pending, (state) => {
        state.isLoadingCompany = true;
      })
      .addCase(registerWithCompany.fulfilled, (state, action) => {
        state.isLoadingCompany = false;
        state.isErrorCompany = false;
        state.isSuccessCompany = true;
        state.companyData = action.payload;
      })
      .addCase(registerWithCompany.rejected, (state, action) => {
        state.isLoadingCompany = false;
        state.isErrorCompany = true;
        state.message = action.payload;
        state.companyData = {};
      })
      // login
      .addCase(login.pending, (state) => {
        state.loginApi = { ...state.loginApi, loading: true };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginApi = { ...state.loginApi, loading: false };
        state.loginApi = { ...state.loginApi, response: action.payload.result };
      })
      .addCase(login.rejected, (state, action) => {
        state.loginApi = { ...state.loginApi, loading: false };
        state.loginApi = { ...state.loginApi, error: action.payload };
      })
      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordResponse = { ...state.resetPasswordResponse, loading: true };
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordResponse = { ...state.resetPasswordResponse, loading: false, response: action.payload };
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordResponse = { ...state.resetPasswordResponse, loading: false, response: action.payload };
      });
  },
});

export const { reset, user, resetLoginApi, setCurrentUser, resetPasswordApi, setSelectedTab } = authSlice.actions;
export default authSlice.reducer;
