import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../components/constants/baseUrls";

const initialState = {
  allListings: null,
  allListingsApiInfo: {},

  highlightedListing: null,
  highlightedListingInfo: {},

  searchListingApiInfo: {},
  searchedListings: null,

  propertyData: {
    appliances: "no",
    cooling: "no",
    currency: "PKR",
    flooring: "Marble",
    furnished: "no",
    garage: "no",
    heating: "no",
    homeType: "Residential",
    lawn: "no",
    materials: "Brick",
    newConstruction: "no",
    pool: "no",
    propertyCondition: "Good",
    propertySubtype: "Home",
    unit: "Marla",
    year_built: 2022,
    features: {},
    services: {},
  },
  createPropertyApiInfo: {},
  deletePropertyApiInfo: {},

  listingToEdit: null,
  listingUpdateInfo: null,
  updateApiInfo: {},

  propertyViewToggleApiInfo: {},
  
  verificationDetail: {isDirect: true},
};

export const getAllListings = createAsyncThunk(
  "listings/getAllListings",
  async (data, thunkAPI) => {
    try {
      const { authToken, dataURL } = data;
      const response = await axios.get(dataURL, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
      return response.data.result;
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

export const getListingDetails = createAsyncThunk(
  "listings/getListingDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/users/property/${data?.id}`);
      return {
        result: response?.data?.result,
        edit: data?.edit,
      };
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

export const updateListing = createAsyncThunk(
  "listings/updateListing",
  async (data, thunkAPI) => {
    try {
      const { id, authToken, formData } = data;
      const response = await axios.put(
        `${baseUrl}/users/property/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      return response?.data.result;
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

export const deleteProperty = createAsyncThunk(
  "listings/deleteProperty",
  async ({ authToken, id }, thunkAPI) => {
    try {
      const deleteResponse = await axios.delete(
        `${baseUrl}/users/property/${id}`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      return { response: deleteResponse, id: id };
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

export const deletePropertyImage = createAsyncThunk(
  "listings/deletePropertyImage",
  async (data, thunkAPI) => {
    try {
      // eslint-disable-next-line
      const res = await axios.delete(`${baseUrl}/users/${data?.subURL}/${data?.id}`, {
        headers: {
          Authorization: `Token ${data?.token}`,
        },
      });
      return data;
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

export const toggleListingVisibility = createAsyncThunk(
  "listings/toggleListingVisibility",
  async ({ authToken, id, formData, edit }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseUrl}/users/property/${id}/`,
        formData,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return {data: response.data.result, edit};
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

export const queryListings = createAsyncThunk(
  "listings/queryListings",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/property?dashboard=true${data?.query}`
      );
      return response?.data?.result;
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

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setPropertyData: (state, action) => {
      state.propertyData = action.payload;
    },
    resetCreateProperties: (state) => {
      state.createPropertyApiInfo = {};
      state.propertyData = {
        appliances: "no",
        cooling: "no",
        currency: "PKR",
        flooring: "Marble",
        furnished: "no",
        garage: "no",
        heating: "no",
        homeType: "Residential",
        lawn: "no",
        materials: "Brick",
        newConstruction: "no",
        pool: "no",
        propertyCondition: "Good",
        propertySubtype: "Home",
        unit: "Marla",
        yearBuilt: 2022,
      };
      state.selectedTab = "Purpose";
    },
    resetAllListingApi: (state) => {
      state.allListingsApiInfo = {};
    },
    resetCreatePropertiesApi: (state) => {
      state.createPropertyApiInfo = {};
    },
    resetPropertyViewToggleApiInfo: (state) => {
      state.propertyViewToggleApiInfo = {};
    },
    setListingUpdateInfo: (state, action) => {
      state.listingUpdateInfo = action.payload;
    },
    setListingToEdit: (state, action) => {
      state.listingToEdit = action.payload;
    },
    resetHighlightedListing: (state, action) => {
      state.highlightedListing = null;
    },
    resetUpdate: (state) => {
      state.updateApiInfo = {};
    },
    setListingVerificationDetail: (state, action) => {
      state.verificationDetail = action.payload;
    },
    resetDeletePropertyApiInfo: (state) => {
      state.deletePropertyApiInfo = {};
    },
    resetSearchListing: (state) => {
      state.searchedListings = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllListings.pending, (state) => {
        state.allListingsApiInfo = {
          ...state.allListingsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.allListingsApiInfo = {
          ...state.allListingsApiInfo,
          loading: false,
        };
        state.allListings = action.payload;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.allListingsApiInfo = {
          ...state.allListingsApiInfo,
          loading: false,
        };
        state.allListingsApiInfo = {
          ...state.allListingsApiInfo,
          error: action.payload,
        };
      })
      //get selected property
      .addCase(getListingDetails.pending, (state) => {
        state.highlightedListingInfo = {
          ...state.highlightedListingInfo,
          loading: true,
        };
      })
      .addCase(getListingDetails.fulfilled, (state, action) => {
        state.highlightedListingInfo = {
          ...state.highlightedListingInfo,
          loading: false,
        };
        state.highlightedListing = action.payload?.result;
        if (action?.payload?.edit === true) {
          state.listingToEdit = action.payload?.result;
        }
      })
      .addCase(getListingDetails.rejected, (state, action) => {
        state.highlightedListingInfo = {
          ...state.highlightedListingInfo,
          loading: false,
        };
        state.highlightedListingInfo = {
          ...state.highlightedListingInfo,
          error: action.payload,
        };
      })
      // update properties
      .addCase(updateListing.pending, (state) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          loading: true,
        };
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          loading: false,
          success: true,
        };
        state.allListings = {
          ...state.allListings,
          result: {
            ...state.allListings?.result,
            results: state.allListings?.result?.results?.map((elem) => {
              if (elem?.id === action.payload?.id) return action.payload;
              else return elem;
            }),
          },
        };
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(deleteProperty.pending, (state) => {
        state.deletePropertyApiInfo = {
          ...state.deletePropertyApiInfo,
          loading: true,
        };
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.deletePropertyApiInfo = {
          ...state.deletePropertyApiInfo,
          loading: false,
          response: action?.payload?.response?.data,
        };
        const newArray = state?.allListings?.results?.filter(
          (property) => property.id !== action?.payload?.id
        );
        state.allListings = {
          ...state.allListings,
          results: newArray,
        };
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.deletePropertyApiInfo = {
          ...state.deletePropertyApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(toggleListingVisibility.pending, (state) => {
        state.propertyViewToggleApiInfo = {
          ...state.propertyViewToggleApiInfo,
          loading: true,
        };
      })
      .addCase(toggleListingVisibility.fulfilled, (state, action) => {
        state.propertyViewToggleApiInfo = {
          ...state.propertyViewToggleApiInfo,
          loading: false,
          response: action?.payload?.data,
        };
        if(action?.payload?.edit){
          state.highlightedListing = action.payload?.data;
          state.listingToEdit = action.payload?.data;
        }
        else {
          state.allListings = {
            ...state.allListings,
            results: state.allListings.results?.map((elem) => {
              if (elem?.id === action?.payload?.data?.id)
                return { ...elem, is_active_listing: action?.payload?.data?.is_active_listing };
              else return elem;
            }),
          };
        }
      })
      .addCase(toggleListingVisibility.rejected, (state, action) => {
        state.propertyViewToggleApiInfo = {
          ...state.propertyViewToggleApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // delete property Image
      .addCase(deletePropertyImage.pending, (state) => {
        state.allListingsApiInfo = {
          ...state.allListingsApiInfo,
          deletingImage: true,
        };
      })
      .addCase(deletePropertyImage.fulfilled, (state, action) => {
        state.allListingsApiInfo = {
          ...state.allListingsApiInfo,
          deletingImage: false,
        };
        state.listingToEdit = {
          ...state.listingToEdit,
          [action.payload.attribute]: state.listingToEdit?.[
            action.payload.attribute
          ]?.filter((imageElem) => imageElem?.id !== action.payload.id),
        };
      })
      .addCase(deletePropertyImage.rejected, (state, action) => {
        state.allListingsApiInfo = {
          ...state.allListingsApiInfo,
          deletingImage: false,
          error: action.payload,
        };
      })
      
      //query
      .addCase(queryListings.pending, (state) => {
        state.searchListingApiInfo = {
          ...state.searchListingApiInfo,
          loading: true,
        };
      })
      .addCase(queryListings.fulfilled, (state, action) => {
        state.searchListingApiInfo = {
          ...state.searchListingApiInfo,
          loading: false,
        };
        state.searchedListings = action.payload;
      })
      .addCase(queryListings.rejected, (state, action) => {
        state.searchListingApiInfo = {
          ...state.searchListingApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setPropertyData,
  setListingUpdateInfo,
  setListingToEdit,
  resetUpdate,
  resetHighlightedListing,
  resetAllListingApi,
  resetPropertyViewToggleApiInfo,
  setListingVerificationDetail,
  resetDeletePropertyApiInfo,
  resetSearchListing,
} = listingsSlice.actions;

export default listingsSlice.reducer;
