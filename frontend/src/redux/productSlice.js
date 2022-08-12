import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    allProducts: null,
    msg: "",
  },
  reducers: {
    getAllProductsStart: (state) => {
      state.loading = true;
    },

    getAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    },

    getAllProductsFail: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const {
  getAllProductsFail,
  getAllProductsSuccess,
  getAllProductsStart,
} = productSlice.actions;

export default productSlice.reducer;
