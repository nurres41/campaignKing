// In your SearchSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  text: string;
}

const initialState: SearchState = {
  text: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
    appendSearchText: (state, action) => {
      state.text = state.text + action.payload;
    },
    deleteLastChar: (state) => {
      state.text = state.text.slice(0, -1);
    },
  },
});

export default searchSlice.reducer;
export const { setSearchText, appendSearchText, deleteLastChar } = searchSlice.actions;
