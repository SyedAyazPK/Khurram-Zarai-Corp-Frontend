import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import _ from "@lodash";
import axios from "axios";
import { showMessage } from "./fuse/messageSlice";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  quantity: 1,
  cart: [],
  cartSubTotal: 0,
  cartTotal: 0,
  checkout: null,
  itemSubtotal: 0,
  orderId: "",
  selectedCatBrand: "",
};

export const createCheckout = createAsyncThunk(
  "shop/createCheckout",
  async (checkout, { dispatch, getState }) => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/v1/order`,
        checkout
      );
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Order placed",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "Error occured while creating checkout",
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

export const createOrder = createAsyncThunk(
  "shop/createOrder",
  async (checkoutId, { dispatch, getState }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/order`, {
        checkout: checkoutId,
      });
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Order placed",
          autoHideDuration: 2000,
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
      return data;
    } catch (error) {
      dispatch(
        showMessage({
          message: "Error occured while placing order",
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

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      state.quantity = state.quantity + 1;
    },
    decrementQuantity: (state, action) => {
      if (state.quantity > 0) {
        state.quantity = state.quantity - 1;
      }
    },
    updateCart: (state, action) => {
      const item = action.payload;
      let index = state.cart.findIndex((cartItem) => item.id === cartItem.id);

      if (index === -1) {
        state.cart.push(item);
      } else {
        state.cart[index] = item;
      }
    },
    incrementCartQuantity: (state, action) => {
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      let total = 0;
      state.cart[index].quantity = state.cart[index].quantity + 1;
      state.cart[index].subtotal =
        state.cart[index].quantity * state.cart[index].price;
      state.cart.forEach((item) => {
        total += item.subtotal;
      });
      state.cartTotal = total;
    },
    decrementCartQuantity: (state, action) => {
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      let total = 0;
      if (state.cart[index].quantity > 0) {
        state.cart[index].quantity = state.cart[index].quantity - 1;
        state.cart[index].subtotal =
          state.cart[index].quantity * state.cart[index].price;
        state.cart.forEach((item) => {
          total += item.subtotal;
        });
        state.cartTotal = total;
      }
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCartSubtotal: (state, action) => {
      state.cartSubTotal = action.payload;
    },
    updateCartTotal: (state, action) => {
      var total = 0;
      state.cart.forEach((item) => {
        total = total + item.subtotal;
      });
      state.cartTotal = total;
    },
    setSelectedCatBrand: (state, action) => {
      state.selectedCatBrand = action.payload;
    },
  },
  extraReducers: {
    [createCheckout.fulfilled]: (state, action) => {
      state.checkout = action.payload;
      state.orderId = action.payload.id;
      state.cart = [];
    },
    [createOrder.fulfilled]: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  incrementQuantity,
  decrementQuantity,
  updateCart,
  incrementCartQuantity,
  decrementCartQuantity,
  removeCartItem,
  updateCartSubtotal,
  updateCartTotal,
  setSelectedCatBrand,
} = shopSlice.actions;

export const selectQuantity = ({ shop }) => shop.quantity;
export const selectCart = ({ shop }) => shop.cart;
export const selectCartSubtotal = ({ shop }) => shop.cartSubTotal;
export const selectCartTotal = ({ shop }) => shop.cartTotal;
export const selectCheckout = ({ shop }) => shop.checkout;
export const selectOrderId = ({ shop }) => shop.orderId;
export const selectSelectedCatBrand = ({ shop }) => shop.selectedCatBrand;

export default shopSlice.reducer;
