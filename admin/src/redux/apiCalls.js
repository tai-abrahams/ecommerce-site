import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { userRequest, publicRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { getUsersStart, getUsersSuccess, getUsersFailure } from "./usersRedux";
import {
  getSelectUserStart,
  getSelectUserFailure,
  getSelectUserSuccess,
  updateSelectUserStart,
  updateSelectUserSuccess,
  updateSelectUserFailure,
} from "./selectUserRedux";

import { 
  getUserOrdersStart,
  getUserOrdersSuccess,
  getUserOrdersFailure
 } from "./ordersRedux.js"

export const login = async (dispatch, user) => {
  console.log("login request only")
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users/");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure(err.message));
  }
};

export const getSelectUser = async (dispatch, userId) => {
  dispatch(getSelectUserStart());
  try {
    const res = await userRequest.get("/users/find/" + userId);
    dispatch(getSelectUserSuccess(res.data));
  } catch (err) {
    dispatch(getSelectUserFailure(err.message));
  }
};

export const updateSelectUser = async (dispatch, user) => {
  dispatch(updateSelectUserStart());
  try {
    //const res = await userRequest.put(`/${userId}` + user)
    dispatch(updateSelectUserSuccess(user));
  } catch (err) {
    dispatch(updateSelectUserFailure(err.message));
  }
};

export const getUserOrders = async(dispatch) => {
//dispatch action
  dispatch(getUserOrdersStart())
//contact api..in order to see user orders
try{
  const res = await userRequest.get("orders/")
  dispatch(getUserOrdersSuccess(res.data))
} catch(err){
  dispatch(getUserOrdersFailure(err.message))
}


}
