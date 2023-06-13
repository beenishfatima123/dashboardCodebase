import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";

const initialState = {
  allPosts: [],
  searchResults: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllPosts = createAsyncThunk(
  "social/getAllPosts",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, dataURL } = initialData;
      const response = await axios.get(dataURL, {
        headers: {
          Authorization: `token ${authToken}`,
        },
      });
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

export const updatePost = createAsyncThunk(
  "social/updatePost",
  async (initialPost, thunkAPI) => {
    const { authToken, id, data } = initialPost;
    try {
      const response = await axios.put(
        `${baseUrl}/users/property-posts/${id}/`,
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

export const getPostByID = createAsyncThunk(
  "social/getPostByID",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, postId } = initialData;
      const response = await axios.get(
        `${baseUrl}/users/dashboard-property-posts/?post_id=${postId}`,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
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

export const getPostByTitle = createAsyncThunk(
  "social/getPostByTitle",
  async (initialData, thunkAPI) => {
    try {
      const { authToken, postTitle } = initialData;
      const response = await axios.get(
        `${baseUrl}/users/dashboard-property-posts/?search=${postTitle}`,
        {
          headers: {
            Authorization: `token ${authToken}`,
          },
        }
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

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.allPosts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.status) {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        } else {
          const { id } = action.payload.result;
          const posts = state?.allPosts?.results.filter(
            (post) => post.id !== id
          );
          state.allPosts.results = [...posts, action.payload.result];
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getPostByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostByID.fulfilled, (state, action) => {
        if (action.payload?.count > 0) {
          state.searchResults = action.payload;
        } else {
          state.searchResults = [];
        }
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getPostByID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getPostByTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        if (action.payload?.count > 0) {
          state.searchResults = action.payload;
        } else {
          state.searchResults = [];
        }
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getPostByTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetSearch } = socialSlice.actions;

export default socialSlice.reducer;
