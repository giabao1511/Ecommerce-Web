import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: false,
    msg: "",
    registerCustomer: null,
  },
  reducers: {
    loginStart: (state, action) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },

    loginFailed: (state, action) => {
      state.msg = action.payload;
    },

    registerCustomerStart: (state) => {
      state.loading = true;
    },

    registerCustomerSuccess: (state, action) => {
      state.loading = false;
      state.registerCustomer = action.payload;
    },

    registerCustomerFailed: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerCustomerStart,
  registerCustomerFailed, 
  registerCustomerSuccess
} = authSlice.actions;
export default authSlice.reducer;
