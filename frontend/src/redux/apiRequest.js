import axios from "axios";
import { getAllProductsFail, getAllProductsStart, getAllProductsSuccess } from "./productSlice";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsStart());

    const { data } = await axios.get("/api/product/all");
    dispatch(getAllProductsSuccess(data?.element));
  } catch (error) {
    dispatch(getAllProductsFail(error));
  }
};
