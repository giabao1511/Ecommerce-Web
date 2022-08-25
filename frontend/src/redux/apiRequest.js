import axios from "axios";
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
