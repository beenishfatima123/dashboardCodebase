import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  data: [],
  dataDetail: [],
  agent_Listings: [],
  agent_Experiences: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  selectedAgentApiInfo: {},
  updateListingApiInfo: {},
  deleteListingApiInfo: {},
};

export const fetchAgents = createAsyncThunk(
  "agent/fetchAgents",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, dataURL } = initialData;
      const response = await axios.get(dataURL, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
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

export const updateAgent = createAsyncThunk(
  "agency/updateAgent",
  async (initialAgent, thunkAPI) => {
    const { authToken, id, data } = initialAgent;
    try {
      const response = await axios.put(`${baseUrl}/users/user/${id}/`, data, {
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

export const deleteAgent = createAsyncThunk(
  "agency/deleteAgent",
  async (initialAget, thunkAPI) => {
    const { authToken, id } = initialAget;
    try {
      const response = await axios.delete(`${baseUrl}/users/user/${id}/`, {
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

export const agentDetail = createAsyncThunk(
  "agent/agentDetail",
  async (initialAgent, thunkAPI) => {
    try {
      const { authToken, id } = initialAgent;
      const response = await axios.get(baseUrl + `/users/agents/${id}`, {
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

export const agentListings = createAsyncThunk(
  "agent/agentListings",
  async (id, data, thunkAPI) => {
    try {
      const response = await axios.get(
        baseUrl + `/users/agent-listings/?agent=${id}`,
        data
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

export const agentExperieces = createAsyncThunk(
  "agent/agentExperiences",
  async (initialData, thunkAPI) => {
    const { authToken, id } = initialData;
    try {
      const response = await axios.get(
        baseUrl + `/users/agent-experience/?user_fk=${id}`,
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

export const updateListingVisibility = createAsyncThunk(
  "agent/updateListingVisibility",
  async ({ authToken, id, formData }, thunkAPI) => {
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

export const deleteListing = createAsyncThunk(
  "agent/deleteListing",
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

export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetUpdateListingApi: (state) => {
      state.updateListingApiInfo = {};
    },
    resetDeleteListingApi: (state) => {
      state.deleteListingApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      //agent archive
      .addCase(fetchAgents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = [];
      })
      // agent detail
      .addCase(agentDetail.pending, (state) => {
        // state.isLoading = true;
        state.selectedAgentApiInfo = {
          ...state.selectedAgentApiInfo,
          loading: true,
        };
      })
      .addCase(agentDetail.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.isError = false;
        // state.isSuccess = true;
        state.selectedAgentApiInfo = {
          ...state.selectedAgentApiInfo,
          loading: false,
        };
        state.dataDetail = action.payload;
      })
      .addCase(agentDetail.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
        state.selectedAgentApiInfo = {
          ...state.selectedAgentApiInfo,
          loading: false,
        };
        state.message = action.payload;
        state.dataDetail = [];
      })
      // agent listings
      .addCase(agentListings.pending, (state) => {
        state.selectedAgentApiInfo = {
          ...state.selectedAgentApiInfo,
          listingLoading: true,
        };
        // state.isLoading = true;
      })
      .addCase(agentListings.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.isError = false;
        // state.isSuccess = true;
        state.selectedAgentApiInfo = {
          ...state.selectedAgentApiInfo,
          listingLoading: false,
        };
        state.agent_Listings = action.payload;
      })
      .addCase(agentListings.rejected, (state, action) => {
        // state.isLoading = false;
        // state.isError = true;
        state.selectedAgentApiInfo = {
          ...state.selectedAgentApiInfo,
          listingLoading: false,
        };
        state.message = action.payload;
        state.agent_Listings = [];
      })
      // agent Experience
      .addCase(agentExperieces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(agentExperieces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.agent_Experiences = action.payload;
      })
      .addCase(agentExperieces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.agent_Experiences = [];
      })
      //update agent
      .addCase(updateAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // delete agent
      .addCase(deleteAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.data = [];
      })
      // update listing
      .addCase(updateListingVisibility.pending, (state) => {
        state.updateListingApiInfo = {
          ...state.updateListingApiInfo,
          updateLoading: true,
        };
      })
      .addCase(updateListingVisibility.fulfilled, (state, action) => {
        state.updateListingApiInfo = {
          ...state.updateListingApiInfo,
          updateLoading: false,
          response: action?.payload,
        };

        state.agent_Listings = {
          ...state.agent_Listings,
          result: {
            ...state.agent_Listings?.result,
            results: state.agent_Listings?.result?.results?.map((elem) => {
              if (elem?.id === action?.payload?.id)
                return {
                  ...elem,
                  is_active_listing: action?.payload?.is_active_listing,
                };
              else return elem;
            }),
          },
        };
      })
      .addCase(updateListingVisibility.rejected, (state, action) => {
        state.updateListingApiInfo = {
          ...state.updateListingApiInfo,
          updateLoading: false,
          error: action.payload,
        };
        state.agent_Listings = [];
      })
      //delete user listing
      .addCase(deleteListing.pending, (state) => {
        state.deleteListingApiInfo = {
          ...state.deleteListingApiInfo,
          deleteLoading: true,
        };
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.deleteListingApiInfo = {
          ...state.deleteListingApiInfo,
          deleteLoading: false,
          response: action?.payload?.response?.data,
        };
        state.agent_Listings = {
          ...state.agent_Listings,
          result: {
            ...state.agent_Listings?.result,
            results: state.agent_Listings?.result?.results?.filter(
              (elem) => elem?.id !== action?.payload?.id
            ),
          },
        };
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.deleteListingApiInfo = {
          ...state.deleteListingApiInfo,
          deleteLoading: false,
          error: action.payload,
        };
      });
  },
});

export const selectAgentById = (state, agentId) =>
  state?.agent?.data?.data?.result?.results.find(
    (item) => Number(item.id) === Number(agentId)
  );

export const { reset, resetUpdateListingApi, resetDeleteListingApi } =
  agentSlice.actions;
export default agentSlice.reducer;
