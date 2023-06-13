import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  allUsers: null,
  allUsersApiInfo: {},
  selectedUser: null,
  selectedUserApiInfo: {},
  updateUser: null,
  updateUserApiInfo: {},
  deleteUserApiInfo: {},
  deactivateUserApiInfo: {},
  activateUserApiInfo: {},

  agencyAgents: null,
  agencyAgentsApiInfo: {},
  removeAgentApiInfo: {},

  userExperience: null,
  userExperienceApiInfo: {},
  updateUserExperienceDetail: null,
  updateUserExperienceDetailApiInfo: {},

  userUpdateFormData: null,

  searchUsersApiInfo: {},
  searchedUsers: null,

  userCreationData: null,
  createUserApiInfo: {},

  becomeAgentDetailApiInfo: {},

  adminIdforAgencyAddListing: null,
  allPrivateAgents: null,
  allPrivateAgentsApiInfo: {},
  addAgentRequest: null,
  addAgentRequestApiInfo: {},

  verificationDetail: { isDirect: true },
};

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (initialData, thunkAPI) => {
    try {
      const { dataURL } = initialData;
      const response = await axios.get(dataURL);
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

export const getUserByID = createAsyncThunk(
  "users/getUserByID",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/users/user/${data?.id}`);
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (initialData, thunkAPI) => {
    const { authToken, id, data } = initialData;
    try {
      const updateResponse = await axios.put(
        `${baseUrl}/users/user/${id}/`,
        data,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return updateResponse?.data;
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

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (initialData, thunkAPI) => {
    const { authToken, id } = initialData;
    try {
      const deleteResponse = await axios.delete(
        `${baseUrl}/users/user/${id}/`,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: deleteResponse.data, userID: id };
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

export const deactivateUser = createAsyncThunk(
  "users/deactivateUser",
  async (initialData, thunkAPI) => {
    const { authToken, data, userID, edit } = initialData;
    try {
      const updateResponse = await axios.post(
        `${baseUrl}/users/api/deactivate`,
        data,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: updateResponse?.data, edit, userID };
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

export const activateUser = createAsyncThunk(
  "users/activateUser",
  async (initialData, thunkAPI) => {
    const { authToken, data, userID, edit } = initialData;
    try {
      const updateResponse = await axios.post(
        `${baseUrl}/users/activate/`,
        data,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: updateResponse?.data, edit, userID };
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

export const getUserExperience = createAsyncThunk(
  "users/getUserExperience",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/agent-experience/?user_fk=${data?.userID}`,
        {
          headers: {
            Authorization: `token ${data?.token}`,
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

export const updatedUserExperience = createAsyncThunk(
  "users/updatedUserExperience",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseUrl}/users/agents/${data?.userID}/`,
        data?.formData,
        {
          headers: {
            Authorization: `token ${data?.token}`,
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

export const queryUsers = createAsyncThunk(
  "users/queryUsers",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/users/user?${data?.query}`);
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

export const becomeAgent = createAsyncThunk(
  "users/becomeAgent",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/become-agent/`,
        data?.formData,
        {
          headers: {
            Authorization: `token ${data?.token}`,
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

// get all private agents
export const getAllPrivateAgents = createAsyncThunk(
  "users/getAllPrivateAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/agents/?private_agent=${true}`
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

// send email to agent, for joining a company
export const sendAddAgentRequest = createAsyncThunk(
  "users/sendAddAgentRequest",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/send-add-agent/`,
        data?.formData
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

// get agency agents
export const getAgencyAgents = createAsyncThunk(
  "users/getAgencyAgents",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/agents/?company_id=${data?.id}`
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

// remove agent from agency
export const removeAgent = createAsyncThunk(
  "users/removeAgent",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, formData, agentID } = initialData;
      const response = await axios.post(
        `${baseUrl}/users/remove-agent/`,
        formData,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: response?.data, agentID };
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserCreationData: (state, action) => {
      state.userCreationData = action.payload;
    },
    resetUserCreation: (state) => {
      state.createUserApiInfo = {};
    },
    resetUpdateUserApi: (state) => {
      state.updateUserApiInfo = {};
    },
    resetDeleteUserApi: (state) => {
      state.deleteUserApiInfo = {};
    },
    resetDeactivateUserApi: (state) => {
      state.deactivateUserApiInfo = {};
    },
    resetActivateUserApi: (state) => {
      state.activateUserApiInfo = {};
    },
    resetRemoveAgentApi: (state) => {
      state.removeAgentApiInfo = {};
    },
    resetSearchUser: (state) => {
      state.searchedUsers = null;
    },
    setUserUpdateFormData: (state, action) => {
      state.userUpdateFormData = action.payload;
    },
    resetSelectedUser: (state, action) => {
      state.selectedUser = null;
      state.selectedUserApiInfo = {};
    },
    resetUpdatedUserExperienceApi: (state, action) => {
      state.updateUserExperienceDetailApiInfo = {};
    },
    resetBecomeAnAgentApi: (state, action) => {
      state.becomeAgentDetailApiInfo = {};
    },
    resetAddAgentRequest: (state, action) => {
      state.addAgentRequestApiInfo = {};
    },
    setAdminIdforAgencyAddListing: (state, action) => {
      state.adminIdforAgencyAddListing = action.payload;
    },
    resetAdminIdforAgencyAddListing: (state, action) => {
      state.adminIdforAgencyAddListing = null;
    },
    setVerificationDetail: (state, action) => {
      state.verificationDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.allUsersApiInfo = {
          ...state.allUsersApiInfo,
          loading: true,
        };
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsersApiInfo = {
          ...state.allUsersApiInfo,
          loading: false,
        };
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.allUsersApiInfo = {
          ...state.allUsersApiInfo,
          loading: false,
        };
        state.allUsersApiInfo = {
          ...state.allUsersApiInfo,
          error: action.payload,
        };
      })

      .addCase(getUserByID.pending, (state) => {
        state.selectedUserApiInfo = {
          ...state.selectedUserApiInfo,
          loading: true,
        };
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.selectedUserApiInfo = {
          ...state.selectedUserApiInfo,
          loading: false,
        };
        state.selectedUser = action.payload;
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.selectedUserApiInfo = {
          ...state.selectedUserApiInfo,
          loading: false,
        };
        state.selectedUserApiInfo = {
          ...state.selectedUserApiInfo,
          error: action.payload,
        };
      })

      //update user
      .addCase(updateUser.pending, (state) => {
        state.updateUserApiInfo = {
          ...state.updateUserApiInfo,
          loading: true,
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserApiInfo = {
          ...state.updateUserApiInfo,
          loading: false,
          response: action.payload,
        };
        state.updateUser = action.payload;
        state.selectedUser = action.payload?.result;
        state.userUpdateFormData = action.payload?.result;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserApiInfo = {
          ...state.updateUserApiInfo,
          loading: false,
          error: action.payload,
        };
        state.updateUser = [];
      })

      //delete user
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserApiInfo = {
          ...state.deleteUserApiInfo,
          loading: true,
        };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserApiInfo = {
          ...state.deleteUserApiInfo,
          loading: false,
          response: action.payload.data,
        };
        state.allUsers = {
          ...state.allUsers,
          result: {
            ...state.allUsers?.result,
            count: state.allUsers?.result?.count - 1,
            results: state.allUsers?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.userID
            ),
          },
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserApiInfo = {
          ...state.updateUserApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //deactivate user
      .addCase(deactivateUser.pending, (state) => {
        state.deactivateUserApiInfo = {
          ...state.deactivateUserApiInfo,
          loading: true,
        };
      })
      .addCase(deactivateUser.fulfilled, (state, action) => {
        state.deactivateUserApiInfo = {
          ...state.deactivateUserApiInfo,
          loading: false,
          response: action.payload?.data,
        };
        if (action?.payload?.edit === true) {
          if (
            action?.payload?.data?.message === "User deactivated successfully"
          ) {
            state.selectedUser = { ...state.selectedUser, is_active: false };
          }
        } else {
          state.allUsers = {
            ...state.allUsers,
            result: {
              ...state.allUsers?.result,
              results: state.allUsers?.result?.results?.map((elem) => {
                if (elem?.id === action.payload.userID) {
                  return {
                    ...elem,
                    is_active: false,
                  };
                } else return elem;
              }),
            },
          };

          state.agencyAgents = {
            ...state.agencyAgents,
            result: state.agencyAgents?.result?.map((elem) => {
              if (elem?.id === action.payload.userID) {
                return {
                  ...elem,
                  is_active: false,
                };
              } else return elem;
            }),
          };
        }
      })
      .addCase(deactivateUser.rejected, (state, action) => {
        state.deactivateUserApiInfo = {
          ...state.deactivateUserApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //Activate user
      .addCase(activateUser.pending, (state) => {
        state.activateUserApiInfo = {
          ...state.activateUserApiInfo,
          loading: true,
        };
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.activateUserApiInfo = {
          ...state.activateUserApiInfo,
          loading: false,
          response: action.payload?.data,
        };
        if (action?.payload?.edit === true) {
          if (
            action?.payload?.data?.message === "User activated successfully"
          ) {
            state.selectedUser = { ...state.selectedUser, is_active: true };
          }
        } else {
          state.allUsers = {
            ...state.allUsers,
            result: {
              ...state.allUsers?.result,
              results: state.allUsers?.result?.results?.map((elem) => {
                if (elem?.id === action.payload.userID) {
                  return {
                    ...elem,
                    is_active: true,
                  };
                } else return elem;
              }),
            },
          };
          state.agencyAgents = {
            ...state.agencyAgents,
            result: state.agencyAgents?.result?.map((elem) => {
              if (elem?.id === action.payload.userID) {
                return {
                  ...elem,
                  is_active: true,
                };
              } else return elem;
            }),
          };
        }
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.activateUserApiInfo = {
          ...state.activateUserApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // get agent experience
      .addCase(getUserExperience.pending, (state) => {
        state.userExperienceApiInfo = {
          ...state.userExperienceApiInfo,
          loading: true,
        };
      })
      .addCase(getUserExperience.fulfilled, (state, action) => {
        state.userExperienceApiInfo = {
          ...state.userExperienceApiInfo,
          loading: false,
          message: action.payload,
        };
        state.userExperience = action.payload;
      })
      .addCase(getUserExperience.rejected, (state, action) => {
        state.userExperienceApiInfo = {
          ...state.userExperienceApiInfo,
          loading: false,
          message: action.payload,
        };
      })
      // update agent experience
      .addCase(updatedUserExperience.pending, (state) => {
        state.updateUserExperienceDetailApiInfo = {
          ...state.updateUserExperienceDetailApiInfo,
          loading: true,
        };
      })
      .addCase(updatedUserExperience.fulfilled, (state, action) => {
        state.updateUserExperienceDetailApiInfo = {
          ...state.updateUserExperienceDetailApiInfo,
          loading: false,
          response: action.payload,
        };
        state.updateUserExperienceDetail = action.payload;
      })
      .addCase(updatedUserExperience.rejected, (state, action) => {
        state.updateUserExperienceDetailApiInfo = {
          ...state.updateUserExperienceDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // agency agents
      .addCase(getAgencyAgents.pending, (state) => {
        state.agencyAgentsApiInfo = {
          ...state.agencyAgentsApiInfo,
          loading: true,
        };
      })
      .addCase(getAgencyAgents.fulfilled, (state, action) => {
        state.agencyAgentsApiInfo = {
          ...state.agencyAgentsApiInfo,
          loading: false,
        };
        state.agencyAgents = action.payload;
      })
      .addCase(getAgencyAgents.rejected, (state, action) => {
        state.agencyAgentsApiInfo = {
          ...state.agencyAgentsApiInfo,
          loading: false,
        };
        state.agencyAgentsApiInfo = {
          ...state.agencyAgentsApiInfo,
          error: action.payload,
        };
      })

      // get all private agents
      .addCase(getAllPrivateAgents.pending, (state) => {
        state.allPrivateAgentsApiInfo = {
          ...state.allPrivateAgentsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllPrivateAgents.fulfilled, (state, action) => {
        state.allPrivateAgentsApiInfo = {
          ...state.allPrivateAgentsApiInfo,
          loading: false,
        };
        state.allPrivateAgents = action.payload;
      })
      .addCase(getAllPrivateAgents.rejected, (state, action) => {
        state.allPrivateAgentsApiInfo = {
          ...state.allPrivateAgentsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // send request for add agent to company
      .addCase(sendAddAgentRequest.pending, (state) => {
        state.addAgentRequestApiInfo = {
          ...state.addAgentRequestApiInfo,
          loading: true,
        };
      })
      .addCase(sendAddAgentRequest.fulfilled, (state, action) => {
        state.addAgentRequestApiInfo = {
          ...state.addAgentRequestApiInfo,
          loading: false,
          response: action.payload,
        };
        state.addAgentRequest = action.payload;
      })
      .addCase(sendAddAgentRequest.rejected, (state, action) => {
        state.addAgentRequestApiInfo = {
          ...state.addAgentRequestApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //query
      .addCase(queryUsers.pending, (state) => {
        state.searchUsersApiInfo = {
          ...state.searchUsersApiInfo,
          loading: true,
        };
      })
      .addCase(queryUsers.fulfilled, (state, action) => {
        state.searchUsersApiInfo = {
          ...state.searchUsersApiInfo,
          loading: false,
        };
        state.searchedUsers = action.payload;
      })
      .addCase(queryUsers.rejected, (state, action) => {
        state.searchUsersApiInfo = {
          ...state.searchUsersApiInfo,
          loading: false,
        };
        state.searchUsersApiInfo = {
          ...state.searchUsersApiInfo,
          error: action.payload,
        };
      })
      .addCase(becomeAgent.pending, (state) => {
        state.becomeAgentDetailApiInfo = {
          ...state.becomeAgentDetailApiInfo,
          loading: true,
        };
      })
      .addCase(becomeAgent.fulfilled, (state, action) => {
        state.becomeAgentDetailApiInfo = {
          ...state.becomeAgentDetailApiInfo,
          loading: false,
          response: action.payload,
        };
        state.becomeAgentDeatil = action.payload;
      })
      .addCase(becomeAgent.rejected, (state, action) => {
        state.becomeAgentDetailApiInfo = {
          ...state.becomeAgentDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //remove agent from agency
      .addCase(removeAgent.pending, (state) => {
        state.removeAgentApiInfo = {
          ...state.removeAgentApiInfo,
          loading: true,
        };
      })
      .addCase(removeAgent.fulfilled, (state, action) => {
        state.removeAgentApiInfo = {
          ...state.removeAgentApiInfo,
          loading: false,
          response: action.payload?.data,
        };
        state.agencyAgents = {
          ...state.agencyAgents,
          result: state.agencyAgents?.result?.filter(
            (elem) => elem?.id !== action.payload.agentID
          ),
        };
      })
      .addCase(removeAgent.rejected, (state, action) => {
        state.removeAgentApiInfo = {
          ...state.removeAgentApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setUserCreationData,
  resetUserCreation,
  setUserUpdateFormData,
  resetUpdateUserApi,
  resetDeactivateUserApi,
  resetActivateUserApi,
  resetRemoveAgentApi,
  resetDeleteUserApi,
  resetSelectedUser,
  resetUpdatedUserExperienceApi,
  resetSearchUser,
  resetBecomeAnAgentApi,
  resetAddAgentRequest,
  setAdminIdforAgencyAddListing,
  resetAdminIdforAgencyAddListing,
  setVerificationDetail,
} = usersSlice.actions;
export default usersSlice.reducer;
