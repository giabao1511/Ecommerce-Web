import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

let store;
if (process.env.NODE_ENV === "development") {
  store = configureStore({
    reducer: {
      cart: cartSlice,
      product: productSlice,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
} else {
  store = configureStore({
    reducer: {
      cart: cartSlice,
      product: productSlice,
    },
  });
}

export default store;
