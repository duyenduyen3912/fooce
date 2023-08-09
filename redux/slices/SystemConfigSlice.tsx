import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  logo: undefined,
  favicon: undefined,
};

const SystemConfigSlice = createSlice({
  name: "systemConfig",
  initialState,
  reducers: {
    updateLogoConfig: (state, action) => {
      return {...state, logo: action.payload};
    },
    updateFaviconConfig: (state, action) => {
      return {...state, favicon: action.payload};
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateLogoConfig, updateFaviconConfig} =
  SystemConfigSlice.actions;

export default SystemConfigSlice.reducer;
