import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHeaderSearchBar: false,
  darkMode: false,
  colors: {
    primary: "#134696",
    secondary: "#0ed864",
    white: "#ffffff",
    black: "#000000",
  },
  langIndex: 0,
  currencyIndex: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setLanguage: (state, action) => {
      state.langIndex = action.payload;
    },
    setCurrencyIndex: (state, action) => {
      state.currencyIndex = action.payload;
    },
  },
});

export const {
  setDarkMode,
  setColors,
  setLanguage,
  setCurrencyIndex,
} = globalSlice.actions;
export default globalSlice.reducer;
