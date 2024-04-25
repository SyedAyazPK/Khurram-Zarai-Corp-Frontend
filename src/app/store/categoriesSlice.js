import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const getCategoriesMain = createAsyncThunk(
  "categories/getCategoriesMain",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/category/public?ParentId=${null}&limit=100000`
      );
      const data = await response.data?.results;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);
export const getCategoriesSub = createAsyncThunk(
  "categories/getCategoriesSub",
  async (mainCatId, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/category/public?ParentId=${mainCatId}`
      );
      const data = await response.data?.results;
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "error",
          autoHideDuration: 2000,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return null;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    mainCat: [],
    subCat: [],
  },
  extraReducers: {
    [getCategoriesMain.fulfilled]: (state, action) => {
      state.mainCat = action.payload;
    },
    [getCategoriesSub.fulfilled]: (state, action) => {
      state.subCat = action.payload;
    },
  },
});

export const selectMainCat = ({ categories: { mainCat } }) => mainCat;
export const selectSubCat = ({ categories: { subCat } }) => subCat;

export default categoriesSlice.reducer;
