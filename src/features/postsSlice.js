import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../components/constants/baseUrls";

const initialState = {  allPosts: null,
  searchedPosts: null,
  allPostsApiInfo: {},
  replyApiInfo: {},
  selectedPost: null,
  searchQuery: "",
  userPosts: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/zsphere/posts/`, {
        headers: data?.token
          ? {
              Authorization: `token ${data?.token}`,
            }
          : {},
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
export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/zsphere/posts/${data?.searchQuery}`,
        {
          headers: data?.token
            ? {
                Authorization: `token ${data?.token}`,
              }
            : {},
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
export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/zsphere/posts/${data?.id}?dashboard=true`);
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
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (data, thunkAPI) => {
    try {
      await axios.delete(`${baseUrl}/zsphere/comments/${data?.commentID}/`, {
        headers: {
          Authorization: `token ${data?.token}`,
        },
      });
      return { commentID: data?.commentID, postID: data?.postID };
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
export const getAllPostComments = createAsyncThunk(
  "posts/getAllPostComments",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${baseUrl}/zsphere/comments/?post_id=${data?.id}&dashboard=true`,
        {
          headers: {
            Authorization: `token ${data?.token}`,
          },
        }
      );
      // console.log({ res: response?.data?.result });
      return { result: response?.data?.result, id: data?.id };
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
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseUrl}/zsphere/posts/${data?.id}/`,
        data.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      // console.log({ res: response?.data });
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
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (data, thunkAPI) => {
    try {
      await axios.delete(`${baseUrl}/zsphere/posts/${data?.id}/`, {
        headers: {
          Authorization: `token ${data?.token}`,
        },
      });
      return data?.id;
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
export const editComment = createAsyncThunk(
  "posts/editComment",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseUrl}/zsphere/comments/${data?.commentID}/`,
        data.values,
        {
          headers: {
            Authorization: `token ${data?.token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      // console.log({ res: response?.data });
      return {data: response?.data?.result, postID: data?.postID, commentID: data?.commentID};
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
  "posts/paginate",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url);

      return { data: response?.data, isSearched: data?.isSearched };
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
export const paginateComments = createAsyncThunk(
  "posts/paginateComments",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(data.url);
      // console.log({ res: response?.data });
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
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setAllApiInfo: (state) => {
      state.allPostsApiInfo = {};
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
        };
        state.allPosts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //get searched
      .addCase(searchPosts.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: true,
        };
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
        };
        state.searchedPosts = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //get selected
      .addCase(getSinglePost.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSelected: true,
        };
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSelected: false,
        };
        state.selectedPost = action.payload;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingSelected: false,
          error: action.payload,
        };
      })
      //PAGINATE
      .addCase(paginate.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingPagination: true,
        };
      })
      .addCase(paginate.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingPagination: false,
        };
        if (action.payload?.isSearched) {
          state.searchedPosts = {
            ...state?.allPosts,
            next: action.payload?.data?.next,
            previous: action.payload?.data?.previous,
            results: [
              ...state?.allPosts?.results,
              ...action.payload?.data?.results,
            ],
          };
        } else
          state.allPosts = {
            ...state?.allPosts,
            next: action.payload?.data?.next,
            previous: action.payload?.data?.previous,
            results: [
              ...state?.allPosts?.results,
              ...action.payload?.data?.results,
            ],
          };
      })
      .addCase(paginate.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingPagination: false,
          error: action.payload,
        };
      })
      //PAGINATE comments
      .addCase(paginateComments.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentsPagination: true,
        };
      })
      .addCase(paginateComments.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentsPagination: false,
        };
        state.selectedPost = {
          ...state?.selectedPost,
          fetchedComments: {
            ...state?.selectedPost?.fetchedComments,
            next: action.payload?.next,
            previous: action.payload?.previous,
            results: [
              ...state?.selectedPost?.fetchedComments?.results,
              ...action.payload?.results,
            ],
          },
        };
      })
      .addCase(paginateComments.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentsPagination: false,
          error: action.payload,
        };
      })
      //Get post comments
      .addCase(getAllPostComments.pending, (state, { meta }) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingComments: meta?.arg?.id,
        };
      })
      .addCase(getAllPostComments.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingComments: false,
        };
        state.allPosts = {
          ...state?.allPosts,
          results: state?.allPosts?.results?.map((elem) => {
            if (elem?.id === action?.payload?.id) {
              return { ...elem, fetchedComments: action?.payload?.result };
            } else return elem;
          }),
        };
        state.selectedPost = {
          ...state?.selectedPost,
          action: "reset",
          fetchedComments: action?.payload?.result,
        };
      })
      .addCase(getAllPostComments.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingComments: false,
          error: action.payload,
        };
      })
      //edit-post
      .addCase(editPost.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingEdit: true,
          editResponseStatus: "pending",
        };
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingEdit: false,
          editResponseStatus: "success",
        };
        state.allPosts = {
          ...state.allPosts,
          results: state.allPosts.results?.map((elem) => {
            if (elem?.id === action?.payload?.id)
              return { ...elem, is_hidden: action?.payload?.is_hidden };
            else return elem;
          }),
        };
        // state?.selectedPost = state?.selectedPost !== null ? {...state.selectedPost , ...action?.payload}:action?.payload
        state.selectedPost =
          state?.selectedPost !== null
            ? { ...state.selectedPost, ...action?.payload }
            : action?.payload;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingEdit: false,
          editResponseStatus: "error",
          editError: action.payload,
        };
      })
      //delete-post
      .addCase(deletePost.pending, (state) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingDelete: true,
        };
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingDelete: false,
        };
        state.allPosts = {
          ...state.allPosts,
          results: state.allPosts.results?.filter(
            (elem) => elem?.id !== action.payload
          ),
        };
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingDelete: false,
          error: action.payload,
        };
      })
      //edit-comment
      .addCase(editComment.pending, (state, { meta }) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentUpdate: true,
        };
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentUpdate: false,
        };

        state.selectedPost = {
          ...state?.selectedPost,
          action: "updated",
        };

        // state.allPosts = {
        //   ...state?.allPosts,
        //   results: state?.allPosts?.results?.map((elem) => {
        //     if (elem?.id === action?.payload?.postID) {
        //       return {
        //         ...elem,
        //         fetchedComments: {
        //           ...elem?.fetchedComments,
        //           results: elem.fetchedComments?.results.map((cElem) => {
        //             if (cElem?.id === action?.payload?.commentID)
        //               return { ...cElem, is_hidden: action?.payload?.is_hidden };
        //             else return cElem;
        //           }),
        //         },
        //       };
        //     } else return elem;
        //   }),
        // };

        // state.selectedPost = {
        //   ...state?.selectedPost,
        //   fetchedComments: {
        //     ...state?.selectedPost?.fetchedComments,
        //     results: state?.selectedPost?.fetchedComments?.results?.filter(
        //       (elem) => elem?.id !== action.payload?.commentID
        //     ),
        //   },
        // };
      })
      .addCase(editComment.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentUpdate: false,
          error: action.payload,
        };
      })
      //delete-comment
      .addCase(deleteComment.pending, (state, { meta }) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentDelete: true,
        };
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentDelete: false,
        };

        // state.allPosts = {
        //   ...state?.allPosts,
        //   results: state?.allPosts?.results?.map((elem) => {
        //     if (elem?.id === action?.payload?.postID) {
        //       return {
        //         ...elem,
        //         fetchedComments: {
        //           ...elem?.fetchedComments,
        //           results: elem.fetchedComments?.results.filter(
        //             (elem) => elem?.id !== action.payload?.commentID
        //           ),
        //         },
        //       };
        //     } else return elem;
        //   }),
        // };

        const {fetchedComments, ...rest} = state.selectedPost;
        state.selectedPost = rest;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.allPostsApiInfo = {
          ...state.allPostsApiInfo,
          loadingCommentDelete: false,
          error: action.payload,
        };
      });
  },
});

export const {
  resetCreateApi,
  setSelectedPost,
  setAllApiInfo,
  setSearchQuery,
} = postsSlice.actions;
export default postsSlice.reducer;
