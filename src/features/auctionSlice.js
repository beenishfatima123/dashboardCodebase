import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";
import { API_STATUSES } from "../components/constants/global";

const initialState = {
  allAuctions: null,
  allAuctionsApiInfo: {},

  searchAuctionsApiInfo: {},
  searchedAuctions: null,

  auctionDetail: null,
  auctionDetailApiInfo: {},

  auctionBidsApiInfo: {},

  verificationDetail: { isDirect: true },

  auctionToEdit: null,
  auctionUpdateInfo: null,
  updateAuctionApiInfo: {},

  // auctionDetail: [],
  currentAuction: null,
  auctionForm: {},
  auctionBids: [],
  addAuctionResponse: null,
  submissionStatus: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllAuctions = createAsyncThunk(
  "auctions/getAllAuctions",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, dataURL } = initialData;
      const response = await axios.get(`${dataURL}`, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
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

export const queryAuctions = createAsyncThunk(
  "auctions/queryAuctions",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/property-files/?search=${data?.query}&auction_type=${data?.auction_type}`
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

export const getAuctionByID = createAsyncThunk(
  "auctions/getAuctionByID",
  async (initialData, thunkAPI) => {
    try {
      const { id } = initialData;
      const response = await axios.get(
        `${baseUrl}/users/property-files/${id}`);
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

export const addAuction = createAsyncThunk(
  "auctions/addAuction",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, data } = initialData;
      const response = await axios.post(
        `${baseUrl}/users/property-files/`,
        data,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      if (response?.data?.result) {
        data?.images?.append("property_files_fk", response.data.result.id);
        const imagesResponse = await axios.post(
          `${baseUrl}/users/property-files-images/`,
          data.images,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
      }
      return response;
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

export const updateAuction = createAsyncThunk(
  "auctions/updateAuction",
  async (initialAuction, thunkAPI) => {
    const { authToken, id, formData } = initialAuction;
    try {
      const updateResponse = await axios.put(
        `${baseUrl}/users/property-files/${id}/`,
        formData,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: updateResponse.data, auctionID: id };
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

export const deleteAuction = createAsyncThunk(
  "auctions/deleteAuction",
  async (initialAuction, thunkAPI) => {
    const { authToken, id } = initialAuction;
    try {
      const response = await axios.delete(
        `${baseUrl}/users/property-files/${id}/`,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: response.data, auctionID: id };
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

export const getAuctionBids = createAsyncThunk(
  "auctions/getAuctionBids",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, id } = initialData;
      const response = await axios.get(
        `${baseUrl}/users/property-files-bid/?property_file_id=${id}`,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: response?.data?.result };
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

export const acceptABid = createAsyncThunk(
  "auctions/acceptABid",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, transactionData } = initialData;
      const response = await axios.post(
        `${baseUrl}/users/property-files-trade/`,
        transactionData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      return response.data?.result;
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
  "auctions/paginate",
  async (data, thunkAPI) => {
    try {
      const { authToken, url } = data;
      const response = await axios.get(url,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
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
const auctionSlice = createSlice({
  name: "auctions",
  initialState,
  reducers: {
    setAuctionForm: (state, action) => {
      state.auctionForm = action.payload;
    },
    resetAuction: (state, action) => {
      state.auctionForm = action.payload;
      state.submissionStatus = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    resetSearchedAuctions: (state) => {
      state.searchedAuctions = null;
    },
    setAuctionDetail: (state, action) => {
      state.auctionDetail = action?.payload;
    },
    resetAuctionsApi: (state) => {
      state.allAuctionsApiInfo = {};
    },
    resetBidsApi: (state) => {
      state.auctionBidsApiInfo = {};
    },
    setAuctionVerificationDetail: (state, action) => {
      state.verificationDetail = action.payload;
    },
    setAuctionToEdit: (state, action) => {
      state.auctionToEdit = action.payload;
    },
    setAuctionUpdateInfo: (state, action) => {
      state.auctionUpdateInfo = action.payload;
    },
    resetUpdateAuctionApiInfo: (state, action) => {
      state.updateAuctionApiInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAuctions.pending, (state) => {
        state.isLoading = true;
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllAuctions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;

        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: false,
        };
        state.allAuctions = action.payload.data;
      })
      .addCase(getAllAuctions.rejected, (state, action) => {
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: false,
          error: action.payload,
        };

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.allAuctions = null;
      })
      //query Auctions
      .addCase(queryAuctions.pending, (state) => {
        state.searchAuctionsApiInfo = {
          ...state.searchAuctionsApiInfo,
          loading: true,
        };
      })
      .addCase(queryAuctions.fulfilled, (state, action) => {
        state.searchAuctionsApiInfo = {
          ...state.searchAuctionsApiInfo,
          loading: false,
        };
        state.searchedAuctions = action.payload?.data;
      })
      .addCase(queryAuctions.rejected, (state, action) => {
        state.searchAuctionsApiInfo = {
          ...state.searchAuctionsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(getAuctionByID.pending, (state) => {
        state.auctionDetailApiInfo = {
          ...state.auctionDetailApiInfo,
          loading: true,
        };
        //old code
        state.isLoading = true;
      })
      .addCase(getAuctionByID.fulfilled, (state, action) => {
        state.auctionDetailApiInfo = {
          ...state.auctionDetailApiInfo,
          loading: false,
        };
        state.auctionDetail = action.payload?.data;

        //old code
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.auctionDetail = action.payload.data;
      })
      .addCase(getAuctionByID.rejected, (state, action) => {
        state.auctionDetailApiInfo = {
          ...state.auctionDetailApiInfo,
          loading: false,
          error: action.payload,
        };

        //old code
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.auctionDetail = null;
      })
      .addCase(addAuction.pending, (state) => {
        state.submissionStatus = API_STATUSES.PENDING;
      })
      .addCase(addAuction.fulfilled, (state, action) => {
        state.addAuctionResponse = action.payload;
        state.submissionStatus = API_STATUSES.SUCCESS;
      })
      .addCase(addAuction.rejected, (state, action) => {
        state.message = action.payload;
        state.submissionStatus = API_STATUSES.FAILED;
      })
      .addCase(updateAuction.pending, (state) => {
        state.updateAuctionApiInfo = {
          ...state.updateAuctionApiInfo,
          loading: true,
        };
        // state.isLoading = true;
      })
      .addCase(updateAuction.fulfilled, (state, action) => {
        state.updateAuctionApiInfo = {
          ...state.updateAuctionApiInfo,
          loading: false,
        };
        state.allAuctions = {
          ...state.allAuctions,
          result: {
            ...state.allAuctions?.result,
            results: state.allAuctions?.result?.results?.map((elem) => {
              if (elem?.id === action.payload?.auctionID) return action.payload?.data;
              else return elem;
            }),
          },
        };
        // const { id } = action.payload?.data?.result;
        // state.auctionDetail = action.payload?.data?.result;
        // state.message = action.payload?.data?.message;
        // state.isLoading = false;
        // state.isError = false;
        // state.isSuccess = true;
      })
      .addCase(updateAuction.rejected, (state, action) => {
        state.updateAuctionApiInfo = {
          ...state.updateAuctionApiInfo,
          loading: false,
          error: action.payload,
        };
        // state.isLoading = false;
        // state.isError = true;
        // state.message = action.payload;
      })

      .addCase(deleteAuction.pending, (state) => {
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: true,
        };
      })
      .addCase(deleteAuction.fulfilled, (state, action) => {
        console.log({ action });
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: false,
          deleteResponse: action.payload?.data,
        };
        state.allAuctions = {
          ...state.allAuctions,
          result: {
            ...state.allAuctions?.result,
            count: state.allAuctions?.result?.count - 1,
            results: state.allAuctions?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.auctionID
            ),
          },
        };

      })
      .addCase(deleteAuction.rejected, (state, action) => {
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: false,
          error: action.payload?.data?.result,
        };

      })

      .addCase(getAuctionBids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuctionBids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.auctionBids = action.payload.data;
      })
      .addCase(getAuctionBids.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.auctionBids = null;
      })

      //accept bid
      .addCase(acceptABid.pending, (state) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: true,
        };
      })
      .addCase(acceptABid.fulfilled, (state, action) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: false,
          response: action?.payload,
        };

        state.auctionDetail = {
          ...state.auctionDetail,
          result: {
            ...state.auctionDetail?.result,
            closing_bid:
              state?.auctionDetail?.result?.closing_bid?.length > 0
                ? [...state?.auctionDetail?.result?.closing_bid, action.payload]
                : [action.payload],
          },
        };
      })
      .addCase(acceptABid.rejected, (state, action) => {
        state.auctionBidsApiInfo = {
          ...state.auctionBidsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //paginate
      .addCase(paginate.pending, (state) => {
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: false,
        };
        state.allAuctions = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allAuctionsApiInfo = {
          ...state.allAuctionsApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetAuction,
  resetAuctionsApi,
  setAuctionDetail,
  resetBidsApi,
  setAuctionForm,
  resetSearchedAuctions,
  setAuctionVerificationDetail,
  setAuctionToEdit,
  setAuctionUpdateInfo,
  resetUpdateAuctionApiInfo,
} = auctionSlice.actions;

export default auctionSlice.reducer;
