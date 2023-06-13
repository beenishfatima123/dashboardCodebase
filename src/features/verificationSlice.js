import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";

const initialState = {
  //all verifications
  allRequests: null,
  allRequestsApiInfo: {},

  createVerificationApiInfo: {},
  updateRequestApiInfo: {},

  searchRequestsApiInfo: {},
  searchedRequests: null,
};

//create verification requests
export const createVerificationRequest = createAsyncThunk(
  "verifications/createVerificationRequest",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/verification/`,
        data.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      return { data: response?.data };
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

//all verification requests
export const getAllUnverifiedByType = createAsyncThunk(
  "verifications/getAllUnverifiedByType",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data?.dataURL);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateVerification = createAsyncThunk(
  "verifications/updateVerification",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        baseUrl + `/users/verification/` + data.id + "/",
        data.reqData,
        {
          headers: {
            Authorization: `token ${data?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { data: response?.data, requestID: data?.id };
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const queryVerifications = createAsyncThunk(
  "verifications/queryVerifications",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/users/verification/?${data?.query}`);
      return response?.data;
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

export const paginate = createAsyncThunk(
  "verifications/paginate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url);
      return response?.data;
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

export const verificationSlice = createSlice({
  name: "verifications",
  initialState,
  reducers: {
    resetAllRequests: (state) => {
      state.allRequests = null;
    },
    resetUpdateVerificationApi: (state) => {
      state.updateRequestApiInfo = {};
    },
    resetCreateVerificationApi: (state) => {
      state.createVerificationApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // all verification request
      .addCase(getAllUnverifiedByType.pending, (state) => {
        state.allRequestsApiInfo = {
          ...state.allRequestsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllUnverifiedByType.fulfilled, (state, action) => {
        state.allRequestsApiInfo = {
          ...state.allRequestsApiInfo,
          loading: false,
        };
        state.allRequests = action.payload;
      })
      .addCase(getAllUnverifiedByType.rejected, (state, action) => {
        state.allRequestsApiInfo = {
          ...state.allRequestsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // create verification request
      .addCase(createVerificationRequest.pending, (state) => {
        state.createVerificationApiInfo = {
          ...state.createVerificationApiInfo,
          loading: true,
        };
      })
      .addCase(createVerificationRequest.fulfilled, (state, action) => {
        state.createVerificationApiInfo = {
          ...state.createVerificationApiInfo,
          loading: false,
          response: action.payload?.data,
        };
      })
      .addCase(createVerificationRequest.rejected, (state, action) => {
        state.createVerificationApiInfo = {
          ...state.createVerificationApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // update verification request
      .addCase(updateVerification.pending, (state) => {
        state.updateRequestApiInfo = {
          ...state.updateRequestApiInfo,
          loading: true,
        };
      })
      .addCase(updateVerification.fulfilled, (state, action) => {
        state.updateRequestApiInfo = {
          ...state.updateRequestApiInfo,
          loading: false,
          response: action?.payload?.data,
        };
        const newArray = state?.allRequests?.result?.results?.filter(
          (request) => request.id !== action?.payload?.requestID
        );
        state.allRequests = {
          ...state.allRequests,
          result: {
            ...state.allRequests?.result,
            results: newArray,
          },
        };
      })
      .addCase(updateVerification.rejected, (state, action) => {
        state.updateRequestApiInfo = {
          ...state.updateRequestApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //query
      .addCase(queryVerifications.pending, (state) => {
        state.searchRequestsApiInfo = {
          ...state.searchRequestsApiInfo,
          loading: true,
        };
      })
      .addCase(queryVerifications.fulfilled, (state, action) => {
        state.searchRequestsApiInfo = {
          ...state.searchRequestsApiInfo,
          loading: false,
        };
        state.searchedRequests = action.payload;
      })
      .addCase(queryVerifications.rejected, (state, action) => {
        state.searchRequestsApiInfo = {
          ...state.searchRequestsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //paginate
      .addCase(paginate.pending, (state) => {
        state.allRequestsApiInfo = {
          ...state.allRequestsApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allRequestsApiInfo = {
          ...state.allRequestsApiInfo,
          loading: false,
        };
        state.allRequests = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allRequestsApiInfo = {
          ...state.allRequestsApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetAllRequests,
  resetUpdateVerificationApi,
  resetCreateVerificationApi,
} = verificationSlice.actions;
export default verificationSlice.reducer;
