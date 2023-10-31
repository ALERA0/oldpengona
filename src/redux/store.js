import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import logger from "redux-logger";

import {
  registerSlice,
  authSlice,
  getAllDocumentsSlice,
  getAllOrdersSlice,
  getAllProductsSlice,
  getIncomingProductsSlice,
  getMusteriOrdersSlice,
  getOrderDetailSlice,
  getOutgoingProductsSlice,
  getProductDetailSlice,
  getTedarikciOrdersSlice,
  addNewProductSlice,
  updateProductSlice,
  productDeleteSlice,
  addIncomingProductSlice,
  deleteOrderSlice,
  getIncomingTransactionsSlice,
  updateOrderSlice,
  getIncomingProductDetailSlice,
  getOutgoingProductDetailSlice,
  deleteProductFromIncomingProductSlice,
  deleteProductFromOutgoingProductSlice,
  updateIncomingDocProductQuantitySlice,
  updateOutgoingDocProductQuantitySlice,
  addIncomingProductToIncomingProductSlice,
  addOutgoingProductSlice,
  addIncomingProductToOutgoingProductSlice,
  updateOutgoingDocSlice,
  updateIncomingDocSlice,
  addNewOrderSlice,
  getNextDocumentNumberSlice,
  authLogOutSlice,
  getAllCategoriesSlice,
  addNewCategorySlice,
  getProductsByCategorySlice,
  updateCategorySlice,
  deleteCategorySlice,
  getUserDetailSlice,
  updateUserSlice,
  updateUserPasswordSlice,
  addIncomingProductWithProductsSlice,
  addOutgoingProductWithProductsSlice,
  localProductsSlice,
  addProductToIncomingVirtualDocSlice,
  addVirtualIncomingDocSlice,
  deleteProductFromIncomingVirtualDocSlice,
  getVirtualIncomingProductDetailSlice,
  updateIncomingVirtualDocProductsSlice,
  deleteVirtualIncomingDocSlice,
  addVirtualOutgoingDocSlice,
  addProductToOutgoingVirtualDocSlice,
  getVirtualOutgoingProductDetailSlice,
  deleteProductFromOutgoingVirtualDocSlice,
  deleteVirtualOutgoingDocSlice,
  updateOutgoingVirtualDocProductsSlice,
} from "./slice";

const reducer = combineReducers({
  updateOutgoingVirtualDocProducts:updateOutgoingVirtualDocProductsSlice,
  deleteVirtualOutgoingDoc:deleteVirtualOutgoingDocSlice,
  deleteProductFromOutgoingVirtualDoc:deleteProductFromOutgoingVirtualDocSlice,
  getVirtualOutgoingProductDetail:getVirtualOutgoingProductDetailSlice,
  addProductToOutgoingVirtualDoc:addProductToOutgoingVirtualDocSlice,
  addVirtualOutgoingDoc:addVirtualOutgoingDocSlice,
  deleteVirtualIncomingDoc:deleteVirtualIncomingDocSlice,
  updateIncomingVirtualDocProducts: updateIncomingVirtualDocProductsSlice,
  virtualIncomingProductDetail: getVirtualIncomingProductDetailSlice,
  deleteProductFromIncomingVirtualDoc: deleteProductFromIncomingVirtualDocSlice,
  addVirtualIncomingDoc: addVirtualIncomingDocSlice,
  addProductToIncomingVirtualDoc: addProductToIncomingVirtualDocSlice,
  localProducts: localProductsSlice,
  addOutgoingProductWithProducts: addOutgoingProductWithProductsSlice,
  addIncomingProductWithProducts: addIncomingProductWithProductsSlice,
  updateUserPassword: updateUserPasswordSlice,
  updateUser: updateUserSlice,
  getUserDetail: getUserDetailSlice,
  deleteCategory: deleteCategorySlice,
  updateCategory: updateCategorySlice,
  getProductsByCategory: getProductsByCategorySlice,
  addNewCategory: addNewCategorySlice,
  getAllCategories: getAllCategoriesSlice,
  authLogOut: authLogOutSlice,
  register: registerSlice,
  auth: authSlice,
  getAllProducts: getAllProductsSlice,
  productDetail: getProductDetailSlice,
  getAllOrders: getAllOrdersSlice,
  getTedarikciOrders: getTedarikciOrdersSlice,
  getMusteriOrders: getMusteriOrdersSlice,
  orderDetail: getOrderDetailSlice,
  allDocuments: getAllDocumentsSlice,
  getIncomingProducts: getIncomingProductsSlice,
  getOutgoingProducts: getOutgoingProductsSlice,
  addNewProduct: addNewProductSlice,
  updateProduct: updateProductSlice,
  productDelete: productDeleteSlice,
  addIncomingProduct: addIncomingProductSlice,
  addOutgoingProduct: addOutgoingProductSlice,
  deleteOrder: deleteOrderSlice,
  listTransactions: getIncomingTransactionsSlice,
  updateOrder: updateOrderSlice,
  incomingProductdetail: getIncomingProductDetailSlice,
  outgoingProductdetail: getOutgoingProductDetailSlice,
  updateIncomingProductQuantity: updateIncomingDocProductQuantitySlice,
  updateOutgoingProductQuantity: updateOutgoingDocProductQuantitySlice,
  removeProduct: deleteProductFromIncomingProductSlice,
  removeOutgoingProduct: deleteProductFromOutgoingProductSlice,
  addProductToIncomingProduct: addIncomingProductToIncomingProductSlice,
  addProductToOutgoingProduct: addIncomingProductToOutgoingProductSlice,
  updateOutgoingProduct: updateOutgoingDocSlice,
  updateIncomingProduct: updateIncomingDocSlice,
  newOrder: addNewOrderSlice,
  getNextDocumentNumber: getNextDocumentNumberSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
