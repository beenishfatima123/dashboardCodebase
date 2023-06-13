import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  courseData: {
    modules: [
      {
        chapters: [],
        questions: [],
      },
    ],
  },
  createCourseApiInfo: {},

  allCourses: null,
  allCoursesApiInfo: {},
  searchedCourses: null,
  searchCourseApiInfo: {},
  deleteCourseApiInfo: {},
  visibilityApiInfo: {},
  deleteApiInfo: {},

  courseDetail: null,
  courseDetailApiInfo: {},

  moduleDetail: null,

  data: [],
  dataDetail: [],
  chapterDetail: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async (initialData, thunkAPI) => {
    const { authToken, dataURL } = initialData;
    try {
      const response = await axios.get(dataURL, {
        headers: { Authorization: `token ${authToken}` },
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

export const getCourseDetail = createAsyncThunk(
  "course/courseDetail",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, courseId } = initialData;
      const response = await axios.get(baseUrl + `/users/course/${courseId}`, {
        headers: { Authorization: `token ${authToken}` },
      });
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

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, courseId } = initialData;
      const response = await axios.delete(
        baseUrl + `/users/course/${courseId}`,
        {
          headers: { Authorization: `token ${authToken}` },
        }
      );
      return { data: response.data, courseId: courseId };
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

export const deleteCourseContent = createAsyncThunk(
  "course/deleteCourseContent",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, type, contentID } = initialData;
      const response = await axios.delete(
        baseUrl + `/users/${type}/${contentID}`,
        {
          headers: { Authorization: `token ${authToken}` },
        }
      );
      return { data: response.data, type, contentID };
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

export const moduleDetails = createAsyncThunk(
  "course/moduleDetails",
  async (data, thunkAPI) => {
    try {
      const { authToken, moduleId } = data;
      const response = await axios.get(baseUrl + `/users/module/${moduleId}`, {
        headers: { Authorization: `token ${authToken}` },
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

export const chapterDetails = createAsyncThunk(
  "course/chapterDetails",
  async (data, thunkAPI) => {
    try {
      const { authToken, chapterId } = data;
      const response = await axios.get(
        baseUrl + `/users/chapter/${chapterId}`,
        {
          headers: { Authorization: `token ${authToken}` },
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

export const queryCourses = createAsyncThunk(
  "course/queryCourses",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, query } = initialData;
      const response = await axios.get(
        `${baseUrl}/users/course?search=${query}`,
        {
          headers: { Authorization: `token ${authToken}` },
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

export const paginate = createAsyncThunk(
  "course/paginate",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, dataURL } = initialData;
      const response = await axios.get(dataURL, {
        headers: { Authorization: `token ${authToken}` },
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

export const toggleVisibility = createAsyncThunk(
  "course/toggleVisibility",
  async (initialData, thunkAPI) => {
    const { authToken, type, contentID, values } = initialData;
    try {
      const updateResponse = await axios.put(
        `${baseUrl}/users/${type}/${contentID}/`,
        values,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: updateResponse?.data.result, contentID, type };
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

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    resetCreateCourse: (state) => {
      state.createCourseApiInfo = {};
      state.courseData = null;
    },
    resetSearchedCourses: (state) => {
      state.searchedCourses = null;
    },
    resetDeleteApi: (state) => {
      state.deleteApiInfo = {};
    },
    resetDeleteCourseApi: (state) => {
      state.deleteCourseApiInfo = {};
    },
    setModuleDetail: (state, action) => {
      state.moduleDetail = state?.courseDetail?.modules.find(
        (item) => Number(item.id) === Number(action?.payload?.moduleId)
      );
    },
    resetVisibilityApi: (state) => {
      state.visibilityApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // all courses
      .addCase(getAllCourses.pending, (state) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: true,
        };
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: false,
        };
        state.allCourses = action.payload;
        state.moduleDetail = null;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // course detail
      .addCase(getCourseDetail.pending, (state) => {
        state.courseDetailApiInfo = {
          ...state.courseDetailApiInfo,
          loading: true,
        };
      })
      .addCase(getCourseDetail.fulfilled, (state, action) => {
        state.courseDetailApiInfo = {
          ...state.courseDetailApiInfo,
          loading: false,
        };
        state.courseDetail = action.payload;
      })
      .addCase(getCourseDetail.rejected, (state, action) => {
        state.courseDetailApiInfo = {
          ...state.courseDetailApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // delete-course
      .addCase(deleteCourse.pending, (state) => {
        state.deleteCourseApiInfo = {
          ...state.deleteCourseApiInfo,
          loading: true,
        };
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.deleteCourseApiInfo = {
          ...state.deleteCourseApiInfo,
          delNotOpened: false,
          loading: false,
          response: action.payload?.data,
        };
        state.allCourses = {
          ...state.allCourses,
          count: state.allCourses?.count - 1,
          results: state.allCourses?.results?.filter(
            (elem) => elem?.id !== action.payload?.courseId
          ),
        };
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.deleteCourseApiInfo = {
          ...state.deleteCourseApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // delete-module/chapter
      .addCase(deleteCourseContent.pending, (state, { meta }) => {
        if (meta?.arg?.type === "module") {
          state.deleteApiInfo = {
            ...state.deleteApiInfo,
            deleteModule: true,
          };
        } else if (meta?.arg?.type === "chapter") {
          state.deleteApiInfo = {
            ...state.deleteApiInfo,
            deleteChapter: true,
          };
        }
      })
      .addCase(deleteCourseContent.fulfilled, (state, action) => {
        state.deleteApiInfo = {
          ...state.deleteApiInfo,
          deleteModule: action?.payload?.type === "module" ? false : null,
          deleteChapter: action?.payload?.type === "chapter" ? false : null,
          response: action.payload?.data,
        };
        if (action?.payload?.type === "module") {
          state.courseDetail = {
            ...state.courseDetail,
            count: state.courseDetail?.count - 1,
            modules: state.courseDetail?.modules?.filter(
              (elem) => elem?.id !== action.payload?.contentID
            ),
          };
        } else if (action?.payload?.type === "chapter") {
          state.moduleDetail = {
            ...state.moduleDetail,
            chapters: state?.moduleDetail?.chapters?.filter(
              (cElem) => cElem?.id !== action?.payload?.contentID
            ),
          };

          state.courseDetail = {
            ...state.courseDetail,
            modules: state.courseDetail?.modules?.map((mElem) => {
              if (mElem?.id === state?.moduleDetail?.id) {
                return {
                  ...mElem,
                  chapters: mElem?.chapters?.filter(
                    (cElem) => cElem?.id !== action?.payload?.contentID
                  ),
                };
              } else return mElem;
            }),
          };
        }
        // else if (action?.payload?.type === "chapter") {
        // state.courseDetail = {
        //   ...state.courseDetail,
        //   modules: state.courseDetail?.modules?.map((mElem) => {
        //     if (mElem?.id === state?.moduleDetail?.id) {
        //       console.log({melem: current(mElem)})
        //       return {
        //         ...mElem,
        //         chapters: mElem?.chapters?.filter(
        //           (cElem) => cElem?.id === action?.payload?.contentID
        //         ),
        //       };
        //     } else return mElem;
        //   }),
        // };
        // console.log({course: current(state.courseDetail)})
        // }
      })
      .addCase(deleteCourseContent.rejected, (state, action) => {
        state.deleteApiInfo = {
          ...state.deleteApiInfo,
          deleteModule: action?.payload?.type === "module" ? false : null,
          deleteChapter: action?.payload?.type === "chapter" ? false : null,
          error: action.payload,
        };
      })

      // toggle visibility
      .addCase(toggleVisibility.pending, (state, { meta }) => {
        if (meta?.arg?.type === "course") {
          state.visibilityApiInfo = {
            ...state.visibilityApiInfo,
            updatingCourse: true,
          };
        } else if (meta?.arg?.type === "module") {
          state.visibilityApiInfo = {
            ...state.visibilityApiInfo,
            updatingModule: true,
          };
        } else if (meta?.arg?.type === "chapter") {
          state.visibilityApiInfo = {
            ...state.visibilityApiInfo,
            updatingChapter: true,
          };
        }
      })
      .addCase(toggleVisibility.fulfilled, (state, action) => {
        state.visibilityApiInfo = {
          ...state.visibilityApiInfo,
          loading: false,
          updatingCourse: false,
          updatingModule: false,
          updatingChapter: false,
          toggleType: action?.payload?.type,
          response: action.payload?.data,
        };
        if (action.payload.type === "course") {
          state.allCourses = {
            ...state.allCourses,
            results: state.allCourses?.results?.map((elem) => {
              if (elem?.id === action.payload.contentID) {
                return {
                  ...elem,
                  is_active: !elem?.is_active,
                };
              } else return elem;
            }),
          };
          state.courseDetail = {
            ...state.courseDetail,
            is_active: action?.payload?.data?.is_active,
          };
        }
        if (action.payload.type === "module") {
          state.courseDetail = {
            ...state?.courseDetail,
            modules: state.courseDetail?.modules?.map((mElem) => {
              if (mElem?.id === action.payload.contentID) {
                return {
                  ...mElem,
                  is_active: !mElem?.is_active,
                };
              } else return mElem;
            }),
          };
        }
        if (action.payload.type === "chapter") {
          state.courseDetail = {
            ...state?.courseDetail,
            modules: state.courseDetail?.modules?.map((mElem) => {
              if (mElem?.id === state?.moduleDetail?.id) {
                return {
                  ...mElem,
                  chapters: mElem?.chapters?.map((cElem) => {
                    if (cElem?.id === action?.payload?.contentID) {
                      return {
                        ...cElem,
                        is_active: !cElem?.is_active,
                      };
                    } else return cElem;
                  }),
                };
              } else return mElem;
            }),
          };
          state.moduleDetail = {
            ...state?.moduleDetail,
            chapters: state.moduleDetail?.chapters?.map((cElem) => {
              if (cElem?.id === action?.payload?.contentID) {
                return {
                  ...cElem,
                  is_active: !cElem?.is_active,
                };
              } else return cElem;
            }),
          };
        }
      })
      .addCase(toggleVisibility.rejected, (state, action) => {
        state.visibilityApiInfo = {
          ...state.visibilityApiInfo,
          updatingCourse: false,
          updatingModule: false,
          updatingChapter: false,
          error: action.payload,
        };
      })

      //query
      .addCase(queryCourses.pending, (state) => {
        state.searchCourseApiInfo = {
          ...state.searchCourseApiInfo,
          loading: true,
        };
      })
      .addCase(queryCourses.fulfilled, (state, action) => {
        state.searchCourseApiInfo = {
          ...state.searchCourseApiInfo,
          loading: false,
        };
        state.searchedCourses = action.payload;
      })
      .addCase(queryCourses.rejected, (state, action) => {
        state.searchCourseApiInfo = {
          ...state.searchCourseApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      //paginate
      .addCase(paginate.pending, (state) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: false,
        };
        state.allCourses = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allCoursesApiInfo = {
          ...state.allCoursesApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // .addCase(courseDetail.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(courseDetail.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.dataDetail = action.payload;
      // })
      // .addCase(courseDetail.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.dataDetail = [];
      // })
      // .addCase(deleteCourse.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteCourse.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   // state.data = action.payload;
      // })
      // .addCase(deleteCourse.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.data = [];
      // })

      // .addCase(moduleDetails.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(moduleDetails.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.moduleDetail = action.payload;
      // })
      // .addCase(moduleDetails.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.moduleDetail = [];
      // })

      .addCase(chapterDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(chapterDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.chapterDetail = action.payload;
      })
      .addCase(chapterDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.chapterDetail = [];
      });
  },
});

export const {
  setCourseData,
  resetCreateCourse,
  resetVisibilityApi,
  resetSearchedCourses,
  resetDeleteApi,
  resetDeleteCourseApi,
  setModuleDetail,
} = courseSlice.actions;
export default courseSlice.reducer;
