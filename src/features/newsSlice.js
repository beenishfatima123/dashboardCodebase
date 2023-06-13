import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  latestNews: null,
  allNews: null,
  allNewsApiInfo: {},

  searchedNews: null,
  searchNewsApiInfo: {},

  data: [],
  newsDetail: null,
  categoriesData: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  selectedNewsApiInfo: {},
  createNewsApiInfo: {},
  updateNewsApiInfo: {},
  deleteNewsApiInfo: {},
  visibilityApiInfo: {},
};

export const getAllNews = createAsyncThunk(
  "news/AllNews",
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

export const getNewsDetail = createAsyncThunk(
  "news/getNewsDetail",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(baseUrl + `/users/news/${data?.id}`);
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

export const createNews = createAsyncThunk(
  "news/createNews",
  async (initialData, thunkAPI) => {
    const { authToken, data } = initialData;
    try {
      const response = await axios.post(`${baseUrl}/users/news/`, data, {
        headers: {
          Authorization: `token ${authToken}`,
          "Content-type": "multipart/form-data",
        },
      });
      return response?.data;
    } catch (error) {
      console.log({ error });
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

export const updateNews = createAsyncThunk(
  "news/UpdateNews",
  async (initialAuction, thunkAPI) => {
    const { authToken, newsID, values, edit } = initialAuction;
    try {
      const updateResponse = await axios.put(
        `${baseUrl}/users/news/${newsID}/`,
        values,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: updateResponse?.data.result, edit: edit, newsID: newsID };
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

export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (initialData, thunkAPI) => {
    const { authToken, newsID, opened } = initialData;
    try {
      const response = await axios.delete(`${baseUrl}/users/news/${newsID}/`, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
      return { data: response.data, newsID: newsID, opened: opened };
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

export const newsCategories = createAsyncThunk(
  "news/newsCategories",
  async ({ authToken }, thunkAPI) => {
    try {
      const response = await axios.get(baseUrl + `/users/news-category/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${authToken}`,
        },
      });
      if (response) {
        return response?.data;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error in: News Categories", { error });
      return false;
    }
  }
);

export const queryNews = createAsyncThunk(
  "news/queryNews",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/news/?search=${data?.query}`
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

export const paginate = createAsyncThunk(
  "news/paginate",
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

export const toggleVisibility = createAsyncThunk(
  "news/toggleVisibility",
  async (initialAuction, thunkAPI) => {
    const { authToken, newsID, values } = initialAuction;
    try {
      const updateResponse = await axios.put(
        `${baseUrl}/users/news/${newsID}/`,
        values,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: updateResponse?.data.result, newsID: newsID };
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

export const getLatestNews = createAsyncThunk(
  "news/getLatestNews",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/news/?order_by=latest`
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

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setNewsDetails: (state, action) => {
      state.newsDetail = action.payload;
    },
    resetSearchedNews: (state) => {
      state.searchedNews = null;
    },
    resetCreateNewsApi: (state) => {
      state.createNewsApiInfo = {};
    },
    resetUpdateNewsApi: (state) => {
      state.updateNewsApiInfo = {};
    },
    resetDeleteNewsApi: (state) => {
      state.deleteNewsApiInfo = {};
    },
    resetVisibilityApi: (state) => {
      state.visibilityApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loading: true,
        };
        state.isLoading = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loading: false,
        };
        state.allNews = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // create-news
      .addCase(createNews.pending, (state) => {
        state.createNewsApiInfo = {
          ...state.createNewsApiInfo,
          loading: true,
        };
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.createNewsApiInfo = {
          ...state.createNewsApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createNews.rejected, (state, action) => {
        state.createNewsApiInfo = {
          ...state.createNewsApiInfo,
          loading: false,
        };
        state.createNewsApiInfo = {
          ...state.createNewsApiInfo,
          error: action.payload,
        };
      })

      // news-detail
      .addCase(getNewsDetail.pending, (state) => {
        state.selectedNewsApiInfo = {
          ...state.selectedNewsApiInfo,
          loading: true,
        };
      })
      .addCase(getNewsDetail.fulfilled, (state, action) => {
        state.selectedNewsApiInfo = {
          ...state.selectedNewsApiInfo,
          loading: false,
        };
        state.newsDetail = action.payload;
      })
      .addCase(getNewsDetail.rejected, (state, action) => {
        state.selectedNewsApiInfo = {
          ...state.selectedNewsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // edit-news-detail
      .addCase(updateNews.pending, (state) => {
        state.updateNewsApiInfo = {
          ...state.updateNewsApiInfo,
          loading: true,
        };
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.updateNewsApiInfo = {
          ...state.updateNewsApiInfo,
          loading: false,
          response: action.payload?.data,
          toggleVisibility: action?.payload?.edit === false ? true : null,
        };
        state.newsDetail = action.payload?.data;
        if (action?.payload?.edit === true) {
        } else {
          state.allNews = {
            ...state.allNews,
            result: {
              ...state.allNews?.result,
              results: state.allNews?.result?.results?.map((elem) => {
                if (elem?.id === action.payload.newsID) {
                  return {
                    ...elem,
                    is_active: !elem?.is_active,
                  };
                } else return elem;
              }),
            },
          };
          state.latestNews = {
            ...state.latestNews,
            result: {
              ...state.latestNews?.result,
              results: state.latestNews?.result?.results?.map((elem) => {
                if (elem?.id === action.payload.newsID) {
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
      .addCase(updateNews.rejected, (state, action) => {
        state.updateNewsApiInfo = {
          ...state.updateNewsApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // toggle visibility
      .addCase(toggleVisibility.pending, (state) => {
        state.visibilityApiInfo = {
          ...state.visibilityApiInfo,
          loading: true,
        };
      })
      .addCase(toggleVisibility.fulfilled, (state, action) => {
        state.visibilityApiInfo = {
          ...state.visibilityApiInfo,
          loading: false,
          response: action.payload?.data,
        };
        state.allNews = {
          ...state.allNews,
          result: {
            ...state.allNews?.result,
            results: state.allNews?.result?.results?.map((elem) => {
              if (elem?.id === action.payload.newsID) {
                return {
                  ...elem,
                  is_active: !elem?.is_active,
                };
              } else return elem;
            }),
          },
        };
        state.latestNews = {
          ...state.latestNews,
          result: {
            ...state.latestNews?.result,
            results: state.latestNews?.result?.results?.map((elem) => {
              if (elem?.id === action.payload.newsID) {
                return {
                  ...elem,
                  is_active: !elem?.is_active,
                };
              } else return elem;
            }),
          },
        };
      })
      .addCase(toggleVisibility.rejected, (state, action) => {
        state.visibilityApiInfo = {
          ...state.visibilityApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // delete-news
      .addCase(deleteNews.pending, (state, { meta }) => {
        if (meta?.arg?.opened === false) {
          state.deleteNewsApiInfo = {
            ...state.deleteNewsApiInfo,
            delNotOpened: true,
          };
        } else {
          state.deleteNewsApiInfo = {
            ...state.deleteNewsApiInfo,
            loading: true,
          };
        }
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.deleteNewsApiInfo = {
          ...state.deleteNewsApiInfo,
          delNotOpened: false,
          loading: false,
          response: action.payload,
        };
        state.allNews = {
          ...state.allNews,
          result: {
            ...state.allNews?.result,
            count: state.allNews?.result?.count - 1,
            results: state.allNews?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.newsID
            ),
          },
        };
        state.latestNews = {
          ...state.latestNews,
          result: {
            ...state.latestNews?.result,
            count: state.latestNews?.result?.count - 1,
            results: state.latestNews?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.newsID
            ),
          },
        };
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.deleteNewsApiInfo = {
          ...state.deleteNewsApiInfo,
          loading: false,
          delNotOpened: false,
        };
        state.deleteNewsApiInfo = {
          ...state.deleteNewsApiInfo,
          error: action.payload,
        };
      })

      // news-categories
      .addCase(newsCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newsCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoriesData = action.payload;
      })
      .addCase(newsCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.categoriesData = [];
      })
      //query News
      .addCase(queryNews.pending, (state) => {
        state.searchNewsApiInfo = {
          ...state.searchNewsApiInfo,
          loading: true,
        };
      })
      .addCase(queryNews.fulfilled, (state, action) => {
        state.searchNewsApiInfo = {
          ...state.searchNewsApiInfo,
          loading: false,
        };
        state.searchedNews = action.payload?.data;
      })
      .addCase(queryNews.rejected, (state, action) => {
        state.searchNewsApiInfo = {
          ...state.searchNewsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //paginate
      .addCase(paginate.pending, (state) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loading: false,
        };
        state.allNews = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //latest-news
      .addCase(getLatestNews.pending, (state) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loadingLatestNews: true,
        };
      })
      .addCase(getLatestNews.fulfilled, (state, action) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loadingLatestNews: false,
        };
        state.latestNews = action.payload;
      })
      .addCase(getLatestNews.rejected, (state, action) => {
        state.allNewsApiInfo = {
          ...state.allNewsApiInfo,
          loadingLatestNews: false,
          error: action.payload,
        };
      });
  },
});

export const {
  setNewsDetails,
  reset,
  resetSearchedNews,
  resetCreateNewsApi,
  resetUpdateNewsApi,
  resetDeleteNewsApi,
  resetVisibilityApi,
} = newsSlice.actions;
export default newsSlice.reducer;
