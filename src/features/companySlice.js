import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  data: [],
  dataDetail: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const AllCompanies = createAsyncThunk("company/AllCompanies", async (thunkAPI) => {
  try {
    const response = await axios.get(baseUrl + "/users/company/");
    return response?.data?.result;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const companyDetail = createAsyncThunk(
  "company/companyDetail",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(baseUrl + `/users/company/${id}`);
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

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AllCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AllCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(AllCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })
      // news-detail
      .addCase(companyDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(companyDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.dataDetail = action.payload;
      })
      .addCase(companyDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.dataDetail = [];
      })
  },
});

export const { reset } = companySlice.actions;
export default companySlice.reducer;
