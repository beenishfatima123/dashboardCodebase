import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { baseUrl } from "../components/constants/baseUrls";
import axios from "axios";
import { TICKET_ENUM } from "../components/constants/global";

const initialState = {
  selectedTabIndex: 0,

  allTickets: null,
  allTicketsApiInfo: {},

  ticketHistory: null,
  ticketHistoryApiInfo: {},

  ticketDetails: null,
  ticketDetailsApiInfo : {},

  detailModalData: null,
  reponseModalData: false,
};

export const getAllTickets = createAsyncThunk(
  "tickets/getAllTickets",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${data?.dataURL}`, {
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

export const getTicketHistory = createAsyncThunk(
  "tickets/getTicketHistory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${data?.dataURL}`, {
        headers: {
          Authorization: `token ${data?.authToken}`,
        },
      });
      return { data: response?.data, ticketID: data?.ticketID };
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

export const getSelectedTicket = createAsyncThunk(
  "tickets/getSelectedTicket",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${baseUrl}/users/ticket/${data?.id}`, {
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

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetAllTickets: (state, action) => {
      state.allTickets = null;
    },
    resetTicketDetails: (state, action) => {
      state.ticketDetails = null;
    },
    resetTicketHistory: (state, action) => {
      state.ticketHistory = null;
    },
    setSelectedTab: (state, action) => {
      state.selectedTabIndex = action.payload;
    },
    setDetailModalOpen: (state, action) => {
      state.detailModalData = action.payload;
    },
    setResponseModalOpen: (state, action) => {
      state.reponseModalData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.allTicketsApiInfo = {
          ...state.allTicketsApiInfo,
          loading: true,
        };
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.allTicketsApiInfo = {
          ...state.allTicketsApiInfo,
          loading: false,
        };
        state.allTickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.allTicketsApiInfo = {
          ...state.allTicketsApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      //ticket history
      .addCase(getTicketHistory.pending, (state) => {
        state.ticketHistoryApiInfo = {
          ...state.ticketHistoryApiInfo,
          loading: true,
        };
      })
      .addCase(getTicketHistory.fulfilled, (state, action) => {
        state.ticketHistoryApiInfo = {
          ...state.ticketHistoryApiInfo,
          loading: false,
        };
        state.ticketHistory = {
          ...action?.payload?.data,
          result: {
            ...action?.payload?.data?.result,
            count: action?.payload?.data?.result?.count - 1,
            results: action?.payload?.data?.result?.results?.filter(
              (filterElem) => filterElem?.id !== parseInt(action.payload?.ticketID)
            ),
          },
        };
      })
      .addCase(getTicketHistory.rejected, (state, action) => {
        state.ticketHistoryApiInfo = {
          ...state.ticketHistoryApiInfo,
          loading: false,
          error: action.payload,
        };
      })
      
      .addCase(getSelectedTicket.pending, (state) => {
        state.ticketDetailsApiInfo = {
          ...state.ticketDetailsApiInfo,
          loading: true,
        };
      })
      .addCase(getSelectedTicket.fulfilled, (state, action) => {
        state.ticketDetailsApiInfo = {
          ...state.ticketDetailsApiInfo,
          loading: false,
        };
        state.ticketDetails = action.payload;
      })
      .addCase(getSelectedTicket.rejected, (state, action) => {
        state.ticketDetailsApiInfo = {
          ...state.ticketDetailsApiInfo,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export const {setSelectedTab, resetAllTickets, resetTicketHistory, resetTicketDetails, setDetailModalOpen, setResponseModalOpen} = ticketSlice.actions;
export default ticketSlice.reducer;
