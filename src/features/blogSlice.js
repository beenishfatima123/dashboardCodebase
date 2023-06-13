import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  // categoriesData: [],

  searchBlogsApiInfo: {},
  searchedBlogs: null,

  allBlogs: null,
  allBlogsApiInfo: {},

  blogDetail: null,
  selectedBlogApiInfo: {},

  createBlogApiInfo: {},
  deleteBlogApiInfo: {},
  updateBlogApiInfo: {},
  createCategoryApiInfo: {},
  visibilityApiInfo: {},
};

export const AllBlogs = createAsyncThunk(
  "blog/AllBlogs",
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

export const getBlogDetail = createAsyncThunk(
  "blog/getBlogDetail",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(baseUrl + `/users/blogs/${data?.id}`);
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

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (initialData, thunkAPI) => {
    const { authToken, data } = initialData;
    try {
      const response = await axios.post(`${baseUrl}/users/blogs/`, data, {
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

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (initialData, thunkAPI) => {
    const { authToken, blogID, values, edit } = initialData;
    try {
      const updateResponse = await axios.put(
        `${baseUrl}/users/blogs/${blogID}/`,
        values,
        {
          headers: {
            Authorization: `token ${authToken}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      return { data: updateResponse?.data.result, edit: edit, blogID: blogID };
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

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (initialData, thunkAPI) => {
    const { authToken, blogID, opened } = initialData;
    try {
      const response = await axios.delete(`${baseUrl}/users/blogs/${blogID}/`, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
      return { data: response.data, blogID: blogID, opened: opened };
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

export const blogsCategories = createAsyncThunk(
  "blog/blogsCategories",
  async ({ authToken }, thunkAPI) => {
    try {
      const response = await axios.get(baseUrl + `/users/blogs-category/`, {
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
      console.log("error in: blogsCategories", { error });
      return false;
    }
  }
);

export const createCategory = createAsyncThunk(
  "blog/createCategory",
  async (initialData, thunkAPI) => {
    const { authToken, data } = initialData;
    try {
      const response = await axios.post(
        `${baseUrl}/users/blogs-category/`,
        data,
        {
          headers: {
            Authorization: `token ${authToken}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log({ response });
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

export const queryBlogs = createAsyncThunk(
  "blog/queryBlogs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/blogs/?search=${data?.query}`
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
  "blog/paginate",
  async (data, thunkAPI) => {
    try {
      const { authToken, url } = data;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${authToken}`,
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

export const toggleVisibility = createAsyncThunk(
  "blog/toggleVisibility",
  async (initialAuction, thunkAPI) => {
    const { authToken, blogID, values } = initialAuction;
    try {
      const updateResponse = await axios.put(
        `${baseUrl}/users/blogs/${blogID}/`,
        values,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
      );
      return { data: updateResponse?.data.result, blogID: blogID };
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

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setBlogDetails: (state, action) => {
      state.blogDetail = action.payload;
    },
    resetCreateBlogApi: (state) => {
      state.createBlogApiInfo = {};
    },
    resetUpdateBlogApi: (state) => {
      state.updateBlogApiInfo = {};
    },
    resetDeleteBlogApi: (state) => {
      state.deleteBlogApiInfo = {};
    },
    resetCreateCategoryApi: (state) => {
      state.createCategoryApiInfo = {};
    },
    resetSearchedBlogs: (state) => {
      state.searchedBlogs = null;
    },
    resetVisibilityApi: (state) => {
      state.visibilityApiInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AllBlogs.pending, (state) => {
        state.allBlogsApiInfo = {
          ...state.allBlogsApiInfo,
          loading: true,
        };
      })
      .addCase(AllBlogs.fulfilled, (state, action) => {
        state.allBlogsApiInfo = {
          ...state.allBlogsApiInfo,
          loading: false,
        };
        state.allBlogs = action.payload;
      })
      .addCase(AllBlogs.rejected, (state, action) => {
        state.allBlogsApiInfo = {
          ...state.allBlogsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      // blog-detail
      .addCase(getBlogDetail.pending, (state) => {
        state.selectedBlogApiInfo = {
          ...state.selectedBlogApiInfo,
          loading: true,
        };
      })
      .addCase(getBlogDetail.fulfilled, (state, action) => {
        state.selectedBlogApiInfo = {
          ...state.selectedBlogApiInfo,
          loading: false,
        };
        state.blogDetail = action.payload;
      })
      .addCase(getBlogDetail.rejected, (state, action) => {
        state.selectedBlogApiInfo = {
          ...state.selectedBlogApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // blog-categories
      .addCase(blogsCategories.pending, (state) => {
      })
      .addCase(blogsCategories.fulfilled, (state, action) => {
        state.categoriesData = action.payload;
      })
      .addCase(blogsCategories.rejected, (state, action) => {
        state.categoriesData = [];
      })

      // create-blog-category
      .addCase(createCategory.pending, (state) => {
        state.createCategoryApiInfo = {
          ...state.createCategoryApiInfo,
          loading: true,
        };
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createCategoryApiInfo = {
          ...state.createCategoryApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.createCategoryApiInfo = {
          ...state.createCategoryApiInfo,
          loading: false,
        };
        state.createCategoryApiInfo = {
          ...state.createCategoryApiInfo,
          error: action.payload,
        };
      })

      // create-blog-post
      .addCase(createBlog.pending, (state) => {
        state.createBlogApiInfo = {
          ...state.createBlogApiInfo,
          loading: true,
        };
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createBlogApiInfo = {
          ...state.createBlogApiInfo,
          loading: false,
          response: action.payload,
        };
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.createBlogApiInfo = {
          ...state.createBlogApiInfo,
          loading: false,
        };
        state.createBlogApiInfo = {
          ...state.createBlogApiInfo,
          error: action.payload,
        };
      })

      // edit-blog-detail
      .addCase(updateBlog.pending, (state) => {
        state.updateBlogApiInfo = {
          ...state.updateBlogApiInfo,
          loading: true,
        };
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.updateBlogApiInfo = {
          ...state.updateBlogApiInfo,
          loading: false,
          response: action.payload?.data,
          toggleVisibility: action?.payload?.edit === false ? true : null,
        };
        state.blogDetail = action.payload?.data;
        if (action?.payload?.edit === true) {
        } else {
          state.allBlogs = {
            ...state.allBlogs,
            result: {
              ...state.allBlogs?.result,
              results: state.allBlogs?.result?.results?.map((elem) => {
                if (elem?.id === action.payload.blogID) {
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
      .addCase(updateBlog.rejected, (state, action) => {
        state.updateBlogApiInfo = {
          ...state.updateBlogApiInfo,
          loading: false,
          error: action.payload,
        };
      })

      // delete-blog-post
      .addCase(deleteBlog.pending, (state, { meta }) => {
        if (meta?.arg?.opened === false) {
          state.deleteBlogApiInfo = {
            ...state.deleteBlogApiInfo,
            delNotOpened: true,
          };
        } else {
          state.deleteBlogApiInfo = {
            ...state.deleteBlogApiInfo,
            loading: true,
          };
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.deleteBlogApiInfo = {
          ...state.deleteBlogApiInfo,
          delNotOpened: false,
          loading: false,
          response: action.payload,
        };
        state.allBlogs = {
          ...state.allBlogs,
          result: {
            ...state.allBlogs?.result,
            count: state.allBlogs?.result?.count - 1,
            results: state.allBlogs?.result?.results?.filter(
              (elem) => elem?.id !== action.payload?.blogID
            ),
          },
        };
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.deleteBlogApiInfo = {
          ...state.deleteBlogApiInfo,
          loading: false,
          delNotOpened: false,
          error: action.payload,
        };
      })

      //query Blogs
      .addCase(queryBlogs.pending, (state) => {
        state.searchBlogsApiInfo = {
          ...state.searchBlogsApiInfo,
          loading: true,
        };
      })
      .addCase(queryBlogs.fulfilled, (state, action) => {
        state.searchBlogsApiInfo = {
          ...state.searchBlogsApiInfo,
          loading: false,
        };
        state.searchedBlogs = action.payload?.data;
      })
      .addCase(queryBlogs.rejected, (state, action) => {
        state.searchBlogsApiInfo = {
          ...state.searchBlogsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //paginate
      .addCase(paginate.pending, (state) => {
        state.allBlogsApiInfo = {
          ...state.allBlogsApiInfo,
          loading: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allBlogsApiInfo = {
          ...state.allBlogsApiInfo,
          loading: false,
        };
        state.allBlogs = action.payload;
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allBlogsApiInfo = {
          ...state.allBlogsApiInfo,
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
        state.allBlogs = {
          ...state.allBlogs,
          result: {
            ...state.allBlogs?.result,
            results: state.allBlogs?.result?.results?.map((elem) => {
              if (elem?.id === action.payload.blogID) {
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
      });
  },
});

export const {
  reset,
  setBlogDetails,
  resetCreateBlogApi,
  resetUpdateBlogApi,
  resetDeleteBlogApi,
  resetCreateCategoryApi,
  resetSearchedBlogs,
  resetVisibilityApi,
} = blogSlice.actions;

export default blogSlice.reducer;
export const { selectBlog } = blogSlice.actions;
export const { setDisplayNumber } = blogSlice.actions;
