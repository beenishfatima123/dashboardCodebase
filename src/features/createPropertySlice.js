import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../components/constants/baseUrls";
import {
  LISTING_TYPE,
  POST_TABS,
} from "../components/constants/propertyConstants";

const initialState = {
  propertyData: {
    appliances: "no",
    cooling: "no",
    currency: "PKR",
    flooring: "Marble",
    furnished: "no",
    garage: "no",
    heating: "no",
    home_type: "Residential",
    lawn: "no",
    materials: "Brick",
    new_construction: "no",
    pool: "no",
    property_condition: "Good",
    property_subtype: "Home",
    unit: "Marla",
    year_built: 2022,
    purpose: "sell",
  },
  auctionData: {
    unit: "Marla",
    currency: "PKR",
    totalFiles: 1,
  },
  selectedTab: "Purpose",
  allTabs: POST_TABS,
  listingType: LISTING_TYPE[0],
  inValidCategory: {
    type: {
      isValid: true,
    },
    categories: {
      isValid: true,
    },
    details: {
      isValid: true,
    },
    location: {
      isValid: true,
    },
    images: {
      isValid: true,
    },
    features: {
      isValid: true,
    },
    services: {
      isValid: true,
    },
    construction: {
      isValid: true,
    },
    purpose: {
      isValid: true,
    },
    preview: {
      isValid: true,
    },
  },
  createPropertyApiInfo: {},
};

export const createProperty = createAsyncThunk(
  "create/createProperty",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/property/`,
        data.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      // // console.log({ response });
      return response?.data;
    } catch (error) {
      // console.log({ error });
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

export const createPropertySlice = createSlice({
  name: "create",
  initialState,
  reducers: {
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
        home_type: "Residential",
        lawn: "no",
        materials: "Brick",
        new_construction: "no",
        pool: "no",
        property_condition: "Good",
        property_subtype: "Home",
        unit: "Marla",
        year_built: 2022,
      };
      state.selectedTab = "Purpose";
      state.listingType = LISTING_TYPE[0];
      state.inValidCategory = {
        type: {
          isValid: true,
        },
        categories: {
          isValid: true,
        },
        details: {
          isValid: true,
        },
        location: {
          isValid: true,
        },
        images: {
          isValid: true,
        },
        features: {
          isValid: true,
        },
        services: {
          isValid: true,
        },
        construction: {
          isValid: true,
        },
        purpose: {
          isValid: true,
        },
        preview: {
          isValid: true,
        },
      };
    },
    resetCreatePropertiesApi: (state) => {
      state.createPropertyApiInfo = {};
    },
    setPropertyData: (state, action) => {
      state.propertyData = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setAllTabs: (state, action) => {
      state.allTabs = action.payload;
    },
    setListingType: (state, action) => {
      state.listingType = action.payload;
    },
    setInvalidCategory: (state, action) => {
      state.inValidCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          loading: true,
        };
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          loading: false,
        };
        state.createPropertyApiInfo = {
          ...state.createPropertyApiInfo,
          error: action.payload,
        };
      });
  },
});

export const {
  resetCreateProperties,
  setPropertyData,
  setSelectedTab,
  setInvalidCategory,
  setAllTabs,
  setListingType,
  resetCreatePropertiesApi,
} = createPropertySlice.actions;
export default createPropertySlice.reducer;
