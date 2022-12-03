import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

let store;
if (process.env.NODE_ENV === "development") {
  store = configureStore({
    reducer: {
      cart: cartSlice,
      product: productSlice,
      auth: authSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
} else {
  store = configureStore({
    reducer: {
      cart: cartSlice,
      product: productSlice,
      auth: authSlice,
    },
  });
}

export default store;
