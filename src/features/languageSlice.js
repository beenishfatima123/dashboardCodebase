import { createSlice } from '@reduxjs/toolkit';

let temp = localStorage.getItem('@langIndex');

const initialState = {
  langIndex: temp ? temp : 0,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    language: (state, action) => {
      state.langIndex = action.payload;
    },
  },
});

export const { language } = languageSlice.actions;
export default languageSlice.reducer;
