import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerCustomerFailed,
  registerCustomerStart,
  registerCustomerSuccess,
} from "./authSlice";
import {
  getAllProductsFail,
  getAllProductsStart,
  getAllProductsSuccess,
  getDetailProductFail,
  getDetailProductStart,
  getDetailProductSuccess,
} from "./productSlice";

const URL = "https://shopgiabao.herokuapp.com";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsStart());

    const { data } = await axios.get(`${URL}/api/product/all`);
    dispatch(getAllProductsSuccess(data?.element));
  } catch (error) {
    dispatch(getAllProductsFail(error));
  }
};

export const getDetailProduct = (slug) => async (dispatch) => {
  try {
    dispatch(getDetailProductStart());

    const { data } = await axios.get(`${URL}/api/product/detail/${slug}`);
    dispatch(getDetailProductSuccess(data?.element));
  } catch (error) {
    dispatch(getDetailProductFail(error));
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const { data } = await axios.post(
      `http://localhost:5000/api/auth/login`,
      user
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailed(error.message));
  }
};

export const registerCustomer = (user) => async (dispatch) => {
  try {
    dispatch(registerCustomerStart());
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/customer/register",
      user
    );
    dispatch(registerCustomerSuccess(data));
  } catch (error) {
    dispatch(registerCustomerFailed(error.message));
  }
};
