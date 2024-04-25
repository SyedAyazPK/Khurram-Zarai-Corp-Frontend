import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import { showMessage } from "./fuse/messageSlice";
import axios from "axios";
import { authRoles } from "../auth";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  categories: { results: [] },
  categoriesForFilter: [],
  products: { results: [] },
  productsByCategory: [],
  singleProduct: {},
  brands: [],
  brandsForFilter: [],
  newNav: [
    {
      id: "Home-component",
      title: "Home",
      type: "item",
      url: "/",
    },
    // {
    //   id: "Order-component",
    //   title: "Order",
    //   type: "item",
    //   url: "/order",
    //   auth: authRoles.user,
    // },
  ],
  websiteControls: [],
};

export const getCategories = createAsyncThunk(
  "home/getCategories",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/category/public?limit=10000000`
      );
      const data = await response.data;
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
export const getWebsiteControls = createAsyncThunk(
  "home/getWebsiteControls",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/default/public`
      );
      const data = await response.data;
      return data.results;
    } catch (error) {
      // dispatch(
      //   showMessage({
      //     message: "error",
      //     autoHideDuration: 2000,
      //     variant: "error",
      //     anchorOrigin: {
      //       vertical: "top",
      //       horizontal: "right",
      //     },
      //   })
      // );
      return null;
    }
  }
);

export const getCategoriesMenu = createAsyncThunk(
  "home/getCategoriesMenu",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/company/public`
      );
      const data = await response.data;
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

export const getBrands = createAsyncThunk(
  "home/getBrands",
  async (setting, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/company/public?limit=10000000`
      );
      const data = await response.data;
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

export const getProducts = createAsyncThunk(
  "home/getProducts",
  async (params, { dispatch, getState }) => {
    const updatedParams = params || "";
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/product/public?${updatedParams}`
      );
      const data = await response.data;
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

export const getProductsByCategory = createAsyncThunk(
  "home/getProductsByCategory",
  async (categoryId, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/product/public`,
        {
          params: { Category: categoryId, limit: 10000 },
        }
      );
      const data = await response.data;
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
export const getProductsByBrand = createAsyncThunk(
  "home/getProductsByBrand",
  async (brandId, { dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_URL}/v1/product/public`,
        {
          params: { Company: brandId, limit: 10000 },
        }
      );
      const data = await response.data;
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

export const getSingleProduct = createAsyncThunk(
  "home/getSingleProduct",
  async (id, { dispatch, getState }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/v1/product/${id}`);
      const data = await response.data;
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

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.categoriesForFilter = action.payload.results;
    },
    [getCategoriesMenu.pending]: (state, action) => {
      state.newNav = [
        {
          id: "Home-component",
          title: "Home",
          type: "item",
          url: "/",
        },
        // {
        //   id: "Order-component",
        //   title: "Order",
        //   type: "item",
        //   url: "/order",
        //   auth: authRoles.user,
        // },
      ];
    },
    [getCategoriesMenu.fulfilled]: (state, action) => {
      action.payload.results.map((category) =>
        state.newNav.push({
          id: category.id,
          title: category.title,
          type: "item",
          url: `/shop/brand/${category.id}`,
        })
      );
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getProductsByCategory.fulfilled]: (state, action) => {
      state.productsByCategory = action.payload;
    },
    [getProductsByBrand.fulfilled]: (state, action) => {
      state.productsByCategory = action.payload;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.brands = action.payload.results;
      state.brandsForFilter = action.payload.results;
    },
    [getWebsiteControls.fulfilled]: (state, action) => {
      state.websiteControls = action.payload;
    },
  },
});

export const {} = homeSlice.actions;

export const selectCategories = ({ home }) => home.categories;
export const selectCategoriesForFilter = ({ home }) => home.categoriesForFilter;
export const selectBrands = ({ home }) => home.brands;
export const selectBrandsForFilter = ({ home }) => home.brandsForFilter;
export const selectProducts = ({ home }) => home.products;
export const selectProductsByCategory = ({ home }) => home.productsByCategory;
export const selectSingleProduct = ({ home }) => home.singleProduct;
export const selectNav = ({ home }) => home.newNav;
export const selectWebsiteControls = ({ home }) => home.websiteControls;

export default homeSlice.reducer;
