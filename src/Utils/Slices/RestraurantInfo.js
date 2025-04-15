import { createSlice } from "@reduxjs/toolkit";

const RestroInfo = createSlice({
  name: "RestroInfo",
  initialState: {
    resto: [],
  },
  reducers: {
    getResInfo: (state, action) => {
      state?.resto.push(action?.payload);
    },
   
  },
});

export const { getResInfo } = RestroInfo?.actions;

export default RestroInfo?.reducer;
