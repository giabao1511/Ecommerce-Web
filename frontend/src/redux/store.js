import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productModalSlice from "./productModalSlice";

export const store = configureStore({
  reducer: {
    productModal: productModalSlice,
    cart: cartSlice,
  },
});
