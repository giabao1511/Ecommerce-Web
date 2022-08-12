import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productModalSlice from "./productModalSlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    productModal: productModalSlice,
    cart: cartSlice,
    product: productSlice,
  },
});
