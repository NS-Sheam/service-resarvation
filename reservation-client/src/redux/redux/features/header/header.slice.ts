import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  isMenuOpen: boolean;
};

const initialState: TInitialState = {
  isMenuOpen: false,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = headerSlice.actions;
export default headerSlice.reducer;
