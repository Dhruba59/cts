import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  startupUsers: [],
  totalPages: 0
};

const userSearchSlice = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setStartupUsers: (state, action) => {
      state.startupUsers = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSearch, setStartupUsers, setTotalPages } =
  userSearchSlice.actions;
export default userSearchSlice.reducer;
