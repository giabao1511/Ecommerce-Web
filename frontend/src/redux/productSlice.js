import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    allProducts: null,
    detailProduct: null,
    modal: null,
    msg: "",
  },
  reducers: {
    setDataModal: (state, action) => {
      state.modal = action.payload;
    },

    removeDataModal: (state) => {
      state.modal = null;
    },

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

    getDetailProductStart: (state) => {
      state.loading = true;
    },

    getDetailProductSuccess: (state, action) => {
      state.loading = false;
      state.detailProduct = action.payload;
    },

    getDetailProductFail: (state, action) => {
      state.msg = action.payload;
    },

    clearDetailProduct: (state) => {
      state.detailProduct = null;
    },
  },
});

export const {
  setDataModal,
  removeDataModal,
  getAllProductsFail,
  getAllProductsSuccess,
  getAllProductsStart,
  getDetailProductStart,
  getDetailProductFail,
  getDetailProductSuccess,
  clearDetailProduct,
} = productSlice.actions;

export default productSlice.reducer;
