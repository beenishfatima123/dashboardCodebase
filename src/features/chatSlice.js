
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allConversations: null,
  selectedConversation: null,
  conversationMessages: {},
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setAllConversations: (state, action) => {
      state.allConversations = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setConversationMessages: (state, action) => {
      state.conversationMessages = action.payload;
    },
  },
});

export const {
  setAllConversations,
  setConversationMessages,
  setSelectedConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
