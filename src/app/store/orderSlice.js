import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrdersOfUsers = createAsyncThunk(
  "order/getOrdersOfUsers",
  async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/`)
    } catch (err) {
      return null;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  extraReducers: {},
});

export default orderSlice.reducer;
