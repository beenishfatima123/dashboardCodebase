import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  projectData: null,
  createProjectApiInfo: {},

  allProjects: null,
  allProjectsApiInfo: {},

  projectDetails: null,
  projectDetailsApiInfo: {},

  projectToEdit: null,
  projectUpdateInfo: null,
  updateApiInfo: {},
  deleteProjectApiInfo: {},

  verificationDetail: { isDirect: true },
};

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${data?.dataURL}`,{
        headers: {
          Authorization: `token ${data?.authToken}`,
        }
      });
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

export const createProject = createAsyncThunk(
  "project/createProject",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/new-project/`,
        data.values,
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

export const getProjectDetails = createAsyncThunk(
  "project/getProjectDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/new-project/${data?.id}`
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

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseUrl}/users/new-project/${data?.id}/`,
        data?.values,
        {
          headers: {
            Authorization: `Token ${data?.token}`,
          },
        }
      );
      return {data: response?.data.result, edit: data?.edit, projectID: data?.id};
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

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (initialAgency, thunkAPI) => {
    const { authToken, id } = initialAgency;
    try {
      const response = await axios.delete(`${baseUrl}/users/new-project/${id}/`, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
      return {data: response.data, projectID: id};
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
  "project/paginate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url, {
        headers: {
          Authorization: `token ${data?.authToken}`,
        },
      });
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

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetCreateProject: (state) => {
      state.createProjectApiInfo = {};
      state.projectData = null;
    },
    resetCreateProjectApi: (state) => {
      state.createProjectApiInfo = {};
    },
    setProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
    },
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
    setProjectToEdit: (state, action) => {
      state.projectToEdit = action.payload;
    },
    setProjectUpdateInfo: (state, action) => {
      state.projectUpdateInfo = action.payload;
    },
    resetUpdateApi: (state) => {
      state.updateApiInfo = {};
    },
    resetProjectToEdit: (state) => {
      state.projectToEdit = null;
    },
    resetProjectUpdateInfo: (state) => {
      state.projectUpdateInfo = null;
    },
    resetDeleteProjectApi: (state, action) => {
      state.deleteProjectApiInfo = {};
    },
    setVerificationDetail: (state, action) => {
      state.verificationDetail = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.createProjectApiInfo = {
          ...state.createProjectApiInfo,
          loading: true,
        };
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createProjectApiInfo = {
          ...state.createProjectApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createProject.rejected, (state, action) => {
        state.createProjectApiInfo = {
          ...state.createProjectApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(getAllProjects.pending, (state) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: false,
        };
        state.allProjects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(getProjectDetails.pending, (state) => {
        state.projectDetailsApiInfo = {
          ...state.projectDetailsApiInfo,
          loading: true,
        };
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.projectDetailsApiInfo = {
          ...state.projectDetailsApiInfo,
          loading: false,
        };
        state.projectDetails = action.payload;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.projectDetailsApiInfo = {
          ...state.projectDetailsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(updateProject.pending, (state) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          loading: true,
        };
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          loading: false,
          response: action.payload?.data,
          toggleVisibility: action?.payload?.edit === false ? true : null, 
        };
        if(action?.payload?.edit === true) {
          state.projectToEdit = action.payload?.data;
          state.projectDetails = action.payload?.data;
        }
        else {
          state.allProjects = {
            ...state.allProjects,
            result: {
              ...state.allProjects?.result,
              results: state.allProjects?.result?.results?.map((elem) => {
                if (elem?.id === action.payload.projectID) {
                  return {
                    ...elem,
                    is_active: !elem?.is_active,
                  };
                } else return elem;
              }),
            },
          };
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.updateApiInfo = {
          ...state.updateApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //delete project
      .addCase(deleteProject.pending, (state) => {
        state.deleteProjectApiInfo = {
          ...state.deleteProjectApiInfo,
          loading: true,
        };
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.deleteProjectApiInfo = {
          ...state.deleteProjectApiInfo,
          loading: false,
          response: action?.payload?.data,
        };
        state.allProjects = {
          ...state.allProjects,
          result: {
            ...state.allProjects?.result,
            count: state.allProjects?.result?.count - 1,
            results: state.allProjects?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.projectID
            ),
          },
        };
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.deleteProjectApiInfo = {
          ...state.deleteProjectApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //paginate
      .addCase(paginate.pending, (state) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: false,
        };
        state.allProjects = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allProjectsApiInfo = {
          ...state.allProjectsApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setProjectUpdateInfo,
  resetProjectUpdateInfo,
  resetUpdateApi,
  setProjectToEdit,
  resetCreateProject,
  resetCreateProjectApi,
  setProjectData,
  projectToEdit,
  resetProjectToEdit,
  setProjectDetails,
  resetDeleteProjectApi,
  setVerificationDetail,
} = projectSlice.actions;
export default projectSlice.reducer;
