import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  data: [],
  dataDetail: [],
  agency_Listings: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  allAgencies: null,
  allAgenciesApiInfo: {},

  agencyDetails: null,
  agencyDetailsApiInfo: {},

  allAgencyProjectsApiInfo: {},
  allAgencyProjects: null,

  allAgencyListings: null,
  allAgencyListingsApiInfo: {},

  searchAgenciesApiInfo: {},
  searchedAgencies: null,

  agencyToEdit: null,
  agencyUpdateInfo: null,
  updateAgencyApiInfo: {},
  deleteAgencyApiInfo: {},

  createAgencyData: null,
  createAgencyDataApiInfo: {},

  verificationDetail: { isDirect: true },
};

export const fetchAgencies = createAsyncThunk(
  "agency/fetchAgencies",
  async (data, thunkAPI) => {
    const { dataURL } = data;
    try {
      const response = await axios.get(dataURL);
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

export const getAgency = createAsyncThunk(
  "agency/getAgency",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/users/company/${data?.id}`);
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

export const getAgencyProjects = createAsyncThunk(
  "agency/getAgencyProjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/company-project/${data?.id}`
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

export const getAgencyListings = createAsyncThunk(
  "agency/getAgencyListings",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/agency-listings/?company=${data?.id}`
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

export const queryAgencies = createAsyncThunk(
  "agency/queryAgencies",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/company?${data?.query}`
      );
      // // console.log({ response });
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
  "agency/paginate",
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

export const createAgency = createAsyncThunk(
  "agency/createAgency",
  async (initialAgency, thunkAPI) => {
    const { authToken, id, data } = initialAgency;
    try {
      const response = await axios.post(`${baseUrl}/users/company/`, data, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
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

export const updateAgency = createAsyncThunk(
  "agency/updateAgencyDetails",
  async (initialAgency, thunkAPI) => {
    const { authToken, id, data } = initialAgency;
    try {
      const response = await axios.put(
        `${baseUrl}/users/company/${id}/`,
        data,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
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

export const deleteAgency = createAsyncThunk(
  "agency/deleteAgency",
  async (initialAgency, thunkAPI) => {
    const { authToken, id } = initialAgency;
    try {
      const response = await axios.delete(`${baseUrl}/users/company/${id}/`, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
      return {data: response.data, agencyID: id};
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

/* OLD code */
export const agencyDetail = createAsyncThunk(
  "agency/agencyDetail",
  async (initialAgency, thunkAPI) => {
    const { agencyID } = initialAgency;
    try {
      const response = await axios.get(
        baseUrl + `/users/company/${agencyID}`,
        {}
      );
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

export const agencyListings = createAsyncThunk(
  "agency/agencyListings",
  async (initialAgency, thunkAPI) => {
    const { agencyID } = initialAgency;
    try {
      const response = await axios.get(
        baseUrl + `/users/company-project/${agencyID}`
      );
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

export const addAgency = createAsyncThunk(
  "agency/addAgency",
  async (initialAgency, thunkAPI) => {
    const { authToken, data } = initialAgency;
    try {
      const response = await axios.post(`${baseUrl}/users/company/`, data, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
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


export const agencySlice = createSlice({
  name: "agency",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetSearchAgency: (state) => {
      state.searchedAgencies = null;
    },
    resetAllAgencyProjects: (state) => {
      state.allAgencyProjects = null;
    },
    setAgencyToEdit: (state, action) => {
      state.agencyToEdit = action.payload;
    },
    setAgencyUpdateInfo: (state, action) => {
      state.agencyUpdateInfo = action.payload;
    },
    resetUpdateAgencyApiInfo: (state, action) => {
      state.updateAgencyApiInfo = null;
    },
    setAgencyVerificationDetail: (state, action) => {
      state.verificationDetail = action.payload;
    },
    setCreateAgencyData: (state, action) => {
      state.createAgencyData = action.payload;
    },
    resetCreateAgencyDataApi: (state, action) => {
      state.createAgencyDataApiInfo = {};
    },
    resetDeleteAgencyApi: (state, action) => {
      state.deleteAgencyApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // agency-archive
      .addCase(fetchAgencies.pending, (state) => {
        state.isLoading = true;

        state.allAgenciesApiInfo = {
          ...state.allAgenciesApiInfo,
          loading: true,
        };
      })
      .addCase(fetchAgencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;

        state.allAgenciesApiInfo = {
          ...state.allAgenciesApiInfo,
          loading: false,
        };
        state.allAgencies = action.payload;
      })
      .addCase(fetchAgencies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];

        state.allAgenciesApiInfo = {
          ...state.allAgenciesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // agency-detail
      .addCase(agencyDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(agencyDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.dataDetail = action.payload;
      })
      .addCase(agencyDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.dataDetail = [];
      })
      // agency-listings
      .addCase(agencyListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(agencyListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.agency_Listings = action.payload;
      })
      .addCase(agencyListings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.agency_Listings = [];
      })
      .addCase(addAgency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAgency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        if (action.payload?.status) {
          const agencies = state?.data?.result?.results;
          let result = Object.entries(agencies);
          state.data = [...result, action.payload.result];
        }
      })
      .addCase(addAgency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //create agency
      .addCase(createAgency.pending, (state) => {
        state.createAgencyDataApiInfo = {
          ...state.createAgencyDataApiInfo,
          loading: true,
        };
      })
      .addCase(createAgency.fulfilled, (state, action) => {
        state.createAgencyDataApiInfo = {
          ...state.createAgencyDataApiInfo,
          loading: false,
          response: action?.payload,
        };
      })
      .addCase(createAgency.rejected, (state, action) => {
        state.createAgencyDataApiInfo = {
          ...state.createAgencyDataApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //update agency
      .addCase(updateAgency.pending, (state) => {
        state.isLoading = true;
        state.updateAgencyApiInfo = {
          ...state.updateAgencyApiInfo,
          loading: true,
        };
      })
      .addCase(updateAgency.fulfilled, (state, action) => {
        state.updateAgencyApiInfo = {
          ...state.updateAgencyApiInfo,
          loading: false,
          response: action?.payload,
        };
        state.allAgencies = {
          ...state.allAgencies,
          result: {
            ...state.allAgencies?.result,
            results: state.allAgencies?.result?.results?.map((elem) => {
              if (elem?.id === action.payload?.result?.id)
                return action.payload?.result;
              else return elem;
            }),
          },
        };
      })
      .addCase(updateAgency.rejected, (state, action) => {
        state.updateAgencyApiInfo = {
          ...state.updateAgencyApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //delete agency
      .addCase(deleteAgency.pending, (state) => {
        state.deleteAgencyApiInfo = {
          ...state.deleteAgencyApiInfo,
          loading: true,
        };
      })
      .addCase(deleteAgency.fulfilled, (state, action) => {
        state.deleteAgencyApiInfo = {
          ...state.deleteAgencyApiInfo,
          loading: false,
          response: action?.payload?.data,
        };
        state.allAgencies = {
          ...state.allAgencies,
          result: {
            ...state.allAgencies?.result,
            count: state.allAgencies?.result?.count - 1,
            results: state.allAgencies?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.agencyID
            ),
          },
        };
      })
      .addCase(deleteAgency.rejected, (state, action) => {
        state.deleteAgencyApiInfo = {
          ...state.deleteAgencyApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //get agency details
      .addCase(getAgency.pending, (state) => {
        state.agencyDetailsApiInfo = {
          ...state.agencyDetailsApiInfo,
          loading: true,
        };
      })
      .addCase(getAgency.fulfilled, (state, action) => {
        state.agencyDetailsApiInfo = {
          ...state.agencyDetailsApiInfo,
          loading: false,
        };
        state.agencyDetails = action.payload;
      })
      .addCase(getAgency.rejected, (state, action) => {
        state.agencyDetailsApiInfo = {
          ...state.agencyDetailsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //get agency projects
      .addCase(getAgencyProjects.pending, (state) => {
        state.allAgencyProjectsApiInfo = {
          ...state.allAgencyProjectsApiInfo,
          loading: true,
        };
      })
      .addCase(getAgencyProjects.fulfilled, (state, action) => {
        state.allAgencyProjectsApiInfo = {
          ...state.allAgencyProjectsApiInfo,
          loading: false,
        };
        state.allAgencyProjects = action.payload;
      })
      .addCase(getAgencyProjects.rejected, (state, action) => {
        state.allAgencyProjectsApiInfo = {
          ...state.allAgencyProjectsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //get agency listings
      .addCase(getAgencyListings.pending, (state) => {
        state.allAgencyListingsApiInfo = {
          ...state.allAgencyListingsApiInfo,
          loading: true,
        };
      })
      .addCase(getAgencyListings.fulfilled, (state, action) => {
        state.allAgencyListingsApiInfo = {
          ...state.allAgencyListingsApiInfo,
          loading: false,
        };
        state.allAgencyListings = action.payload;
      })
      .addCase(getAgencyListings.rejected, (state, action) => {
        state.allAgencyListingsApiInfo = {
          ...state.allAgencyListingsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //query
      .addCase(queryAgencies.pending, (state) => {
        state.searchAgenciesApiInfo = {
          ...state.searchAgenciesApiInfo,
          loading: true,
        };
      })
      .addCase(queryAgencies.fulfilled, (state, action) => {
        state.searchAgenciesApiInfo = {
          ...state.searchAgenciesApiInfo,
          loading: false,
        };
        state.searchedAgencies = action.payload;
      })
      .addCase(queryAgencies.rejected, (state, action) => {
        state.searchAgenciesApiInfo = {
          ...state.searchAgenciesApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //paginate
      .addCase(paginate.pending, (state) => {
        state.allAgenciesApiInfo = {
          ...state.allAgenciesApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allAgenciesApiInfo = {
          ...state.allAgenciesApiInfo,
          loading: false,
        };
        state.allAgencies = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allAgenciesApiInfo = {
          ...state.allAgenciesApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const selectAllAgencies = (state) => state.agency.data;
export const selectAgencyById = (state, agencyId) =>
  state?.agency?.data?.result?.results.find(
    (item) => Number(item.id) === Number(agencyId)
  );

export const {
  reset,
  resetSearchAgency,
  resetAllAgencyProjects,
  setAgencyToEdit,
  setAgencyUpdateInfo,
  resetUpdateAgencyApiInfo,
  setAgencyVerificationDetail,
  setCreateAgencyData,
  resetCreateAgencyDataApi,
  resetDeleteAgencyApi,
} = agencySlice.actions;
export default agencySlice.reducer;
