import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://pengona.com/api/";
// const API_KEY = 'SSVa97j7z83nMXDzhmmdHSSLPG9NueDf3J6BgCSS';

axios.defaults.baseURL = API_BASE_URL;
// axios.defaults.headers['X-API-KEY'] = API_KEY;
// axios.defaults.headers["Content-Type"] = "multipart/form-data";

const ALTERNTIVE_BASE_URL = "https://pengona.com/auth";

axios.interceptors.request.use(
  async (config) => {
    // AccessToken'ı local storage'dan alın
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Header'a AccessToken'ı ekleyin
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        try {
          const newAccessToken = await dispatch(refreshToken());
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh işlemi başarısız olursa, kullanıcıyı çıkış yapmaya yönlendirme veya başka bir işlem yapabilirsiniz
          // Örneğin: history.push("/logout");
          console.log(error);
          throw refreshError;
        }
      }
    }

    return Promise.reject(error);
  }
);

const getUserDetailProcess = createAsyncThunk(
  "getUserDetail/getUserDetailProcess",
  async () => {
    const res = await axios.post("getUserDetail");
    return res.data;
  }
);

const updateUserProcess = createAsyncThunk(
  "updateUser/updateUserProcess",
  async (data) => {
    const { id, username, email, userImage } = data;
    try {
      const res = await axios.post("updateUser", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateUserPasswordProcess = createAsyncThunk(
  "updateUserPassword/updateUserPasswordProcess",
  async (data) => {
    const { id, oldPassword, newPassword } = data;
    try {
      const res = await axios.post("updateUserPassword", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const authLogin = createAsyncThunk("auth/login", async (data) => {
  try {
    const { email, password } = data;
    const response = await axios.post(ALTERNTIVE_BASE_URL, data);
    const accessToken = response.data.accessToken;

    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    throw error.response.data;
  }
});

const refreshToken = createAsyncThunk(
  "refreshToken/refreshTokenProcess",
  async () => {
    try {
      const res = await axios.get(ALTERNTIVE_BASE_URL + "/refresh");
      const accessToken = res.data.accessToken;
      return accessToken;
    } catch (error) {
      throw error;
    }
  }
);

const registerProcess = createAsyncThunk(
  "register/registerProcess",
  async (data) => {
    try {
      const { username, password, email } = data;
      const response = await axios.post("/", data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const authLogOut = createAsyncThunk("authOut/authLogOut", async () => {
  try {
    const response = await axios.post(ALTERNTIVE_BASE_URL + "/logout");
    localStorage.removeItem("accessToken");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const getNextDocumentNumberProcess = createAsyncThunk(
  "getNextDocumentNumber/getNextDocumentNumberProcess",
  async () => {
    const res = await axios.get("getNextDocumentNumber");
    return res.data;
  }
);

const getAllProductsProcess = createAsyncThunk(
  "getAllProducts/getAllProductsProcess",
  async () => {
    const res = await axios.get("getAllProducts");
    return res.data;
  }
);
const getProductDetailProcess = createAsyncThunk(
  "productDetail/getProductDetailProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    const res = await axios.post("productDetail", params);
    return res.data;
  }
);
const productDeleteProcess = createAsyncThunk(
  "productDelete/productDeleteProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    try {
      const res = await axios.post("productDelete", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getAllOrdersProcess = createAsyncThunk(
  "getAllOrders/getAllOrdersProcess",
  async () => {
    const res = await axios.get("getlAllOrders");
    return res.data;
  }
);

const getTedarikciOrdersProcess = createAsyncThunk(
  "getTedarikciOrders/getTedarikciOrdersProcess",
  async () => {
    const res = await axios.get("getTedarikciOrders");
    return res.data;
  }
);

const getMusteriOrdersProcess = createAsyncThunk(
  "getMusteriOrders/getMusteriOrdersProcess",
  async () => {
    const res = await axios.get("getMusteriOrders");
    return res.data;
  }
);

const getOrderDetailProcess = createAsyncThunk(
  "orderDetail/getOrdersDetailProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    const res = await axios.post("orderDetail", params);
    return res.data;
  }
);

const getAllDocumentsProcess = createAsyncThunk(
  "allDocuments/getAllDocumentsProcess",
  async () => {
    try {
      const res = await axios.get("allDocuments");
      return res.data;
    } catch (error) {
      console.log(
        error,
        "şşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşşş"
      );
    }
  }
);

const getIncomingProductsProcess = createAsyncThunk(
  "getIncomingProducts/getIncomingProductsProcess",
  async () => {
    const res = await axios.get("getIncomingProducts");
    return res.data;
  }
);

const getOutgoingProductsProcess = createAsyncThunk(
  "getOutgoingProducts/getOutgoingProductsProcess",
  async () => {
    try {
      const res = await axios.get("getOutgoingProducts");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const getAllCategoriesProcess = createAsyncThunk(
  "getAllCategories/getAllCategoriesProcess",
  async () => {
    const res = await axios.get("getCategories");
    return res.data;
  }
);
const addNewCategoryProcess = createAsyncThunk(
  "addNewCategory/addNewCategoryProcess",
  async (data) => {
    const { categoryName } = data;

    try {
      const res = await axios.post("newCategory", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getProductsByCategoryProcess = createAsyncThunk(
  "getProductsByCategory/getProductsByCategoryProcess",
  async (data) => {
    const { categoryId } = data;
    const params = new FormData();
    params.append("categoryId", categoryId);
    try {
      const res = await axios.post("getProductsByCategory", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateCategoryProcess = createAsyncThunk(
  "updateCategory/updateCategoryProcess",
  async (data) => {
    const { _id, categoryName } = data;
    try {
      const res = await axios.post("updateCategory", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
const deleteCategoryProcess = createAsyncThunk(
  "deleteCategory/deleteCategoryProcess",
  async (data) => {
    const { _id } = data;
    try {
      const res = await axios.post("deleteCategory", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const addNewProductProcess = createAsyncThunk(
  "addNewProduct/addNewProductProcess",
  async (data) => {
    const {
      productCode,
      productName,
      productListPrice,
      productQuantity,
      productDescription,
      productPackageType,
      productBarcode,
      productAddress,
      productImage,
      category,
    } = data;
    try {
      const res = await axios.post("addProduct", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const updateProductProcess = createAsyncThunk(
  "productUpdate/updateProductProcess",
  async (data) => {
    const {
      _id,
      productCode,
      productName,
      productListPrice,
      productDescription,
      productPackageType,
      productBarcode,
      productAddress,
      productImage,
      category,
    } = data;
    try {
      const res = await axios.post("productUpdate", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addNewOrderProcess = createAsyncThunk(
  "newOrder/addNewOrderProcess",
  async (data) => {
    const { tcNumber, isim, email, telefon, adres, ozellik, il, ilce } = data;
    try {
      const res = await axios.post("newOrder", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addVirtualIncomingDocProcess = createAsyncThunk(
  "addVirtualIncomingDoc/addVirtualIncomingDocProcess",
  async () => {
    try {
      const res = await axios.post("addVirtualIncomingDoc");
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addVirtualOutgoingDocProcess = createAsyncThunk(
  "addVirtualOutgoingDoc/addVirtualOutgoingDocProcess",
  async () => {
    try {
      const res = await axios.post("addVirtualOutgoingDoc");
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
const getVirtualOutgoingProductDetailProcess = createAsyncThunk(
  "virtualOutgoingProductDetail/getVirtualOutgoingProductDetailProcess",
  async (data) => {
    const { virtualDocId } = data;
    try {
      const res = await axios.post("virtualOutgoingProductDetail", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addProductToOutgoingVirtualDocProcess = createAsyncThunk(
  "addProductToOutgoingVirtualDoc/addProductToOutgoingVirtualDocProcess",
  async (data) => {
    const {
      virtualDocId,
      productId,
      productQuantity,
      productSalesPrice,
      kdvPercent,
      includeKdv,
    } = data;
    try {
      const res = await axios.post("addProductToOutgoingVirtualDoc", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addProductToIncomingVirtualDocProcess = createAsyncThunk(
  "addProductToIncomingVirtualDoc/addProductToIncomingVirtualDocProcess",
  async (data) => {
    const {
      virtualDocId,
      productId,
      productQuantity,
      productPurchasePrice,
      kdvPercent,
      includeKdv,
    } = data;
    try {
      const res = await axios.post("addProductToIncomingVirtualDoc", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const getVirtualIncomingProductDetailProcess = createAsyncThunk(
  "virtualIncomingProductDetail/getVirtualIncomingProductDetailProcess",
  async (data) => {
    const { virtualDocId } = data;
    try {
      const res = await axios.post("virtualIncomingProductDetail", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addIncomingProductWithProductsProcess = createAsyncThunk(
  "addIncomingProductWithProducts/addIncomingProductWithProductsProcess",

  async (data) => {
    const { documentDate, order, description, virtualDocId } = data;

    const requestData = {
      documentDate,
      description,
      virtualDocId,
    };

    if (order) {
      requestData.order = order;
    }

    try {
      const res = await axios.post(
        "addIncomingProductWithProducts",
        requestData
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addOutgoingProductWithProductsProcess = createAsyncThunk(
  "addOutgoingProductWithProducts/addOutgoingProductWithProductsProcess",

  async (data) => {
    const { documentDate, order, description, virtualDocId } = data;

    const requestData = {
      documentDate,
      description,
      virtualDocId,
    };

    if (order) {
      requestData.order = order;
    }

    try {
      const res = await axios.post(
        "addOutgoingProductWithProducts",
        requestData
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addIncomingProductProcess = createAsyncThunk(
  "addIncomingProduct/addIncomingProductProcess",
  async (data) => {
    const { documentDate, documentNumber, order, description } = data;
    const params = new FormData();
    params.append("documentNumber", documentNumber);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("documentDate", documentDate);

    try {
      const res = await axios.post("addIncomingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const addOutgoingProductProcess = createAsyncThunk(
  "addOutgoingProduct/addOutgoingProductProcess",
  async (data) => {
    const { documentNumber, order, description, documentDate } = data;
    const params = new FormData();
    params.append("documentNumber", documentNumber);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("documentDate", documentDate);
    try {
      const res = await axios.post("addOutgoingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteOrderProcess = createAsyncThunk(
  "deleteOrder/deleteOrderProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    try {
      const res = await axios.post("deleteOrder", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const getIncomingTransactionsProcess = createAsyncThunk(
  "listTransactions/getIncomingTransactionsProcess",
  async (data) => {
    const { _id } = data;
    const params = new FormData();
    params.append("_id", _id);
    const res = await axios.post("listTransactions", params);
    return res.data;
  }
);

const updateOutgoingVirtualDocProductsProcess = createAsyncThunk(
  "updateOutgoingVirtualDocProducts/updateOutgoingVirtualDocProductsProcess",
  async (data) => {
    const {
      virtualDocId,
      productId,
      quantity,
      productSalesPrice,
      kdvPercent,
      includeKdv,
      produdctSelfId,
    } = data;
    try {
      const res = await axios.post("updateOutgoingVirtualDocProducts", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const updateIncomingVirtualDocProductsProcess = createAsyncThunk(
  "updateIncomingVirtualDocProducts/updateIncomingVirtualDocProductsProcess",
  async (data) => {
    const {
      virtualDocId,
      productId,
      quantity,
      productPurchasePrice,
      kdvPercent,
      includeKdv,
      produdctSelfId,
    } = data;
    try {
      const res = await axios.post("updateIncomingVirtualDocProducts", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const deleteVirtualIncomingDocProcess = createAsyncThunk(
  "deleteVirtualIncomingDoc/deleteVirtualIncomingDocProcess",
  async (data) => {
    const { virtualDocId } = data;
    try {
      const res = await axios.post("deleteVirtualIncomingDoc", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const deleteProductFromIncomingVirtualDocProcess = createAsyncThunk(
  "removeProductfromIncomingvirtualDoc/deleteProductFromIncomingVirtualDocProcess",
  async (data) => {
    const { virtualDocId, productId } = data;
    try {
      const res = await axios.post("removeProductfromIncomingvirtualDoc", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const updateOrderProcess = createAsyncThunk(
  "updateOrder/updateOrderProcess",
  async (data) => {
    const { _id, tcNumber, isim, email, telefon, adres, il, ilce } = data;

    try {
      const res = await axios.post("updateOrder", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const getIncomingProductDetailProcess = createAsyncThunk(
  "incomingProductdetail/getIncomingProductDetailProcess",
  async (data) => {
    const { incomingProductId } = data;
    const params = new FormData();
    params.append("incomingProductId", incomingProductId);
    const res = await axios.post("incomingProductdetail", params);
    return res.data;
  }
);

const getOutgoingProductDetailProcess = createAsyncThunk(
  "outgoingProductdetail/getOutgoingProductDetailProcess",
  async (data) => {
    const { outgoingProductId } = data;
    const params = new FormData();
    params.append("outgoingProductId", outgoingProductId);
    const res = await axios.post("outgoingProductdetail", params);
    return res.data;
  }
);

const updateIncomingDocProductQuantityProcess = createAsyncThunk(
  "updateIncomingProductQuantity/updateIncomingDocProductQuantityProcess",
  async (data) => {
    const {
      incomingProductId,
      productId,
      quantity,
      kdvPercent,
      includeKdv,
      productPurchasePrice,
      productSelfId,
    } = data;
    try {
      const res = await axios.post("updateIncomingProductQuantity", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const updateOutgoingDocProductQuantityProcess = createAsyncThunk(
  "updateOutgoingProductQuantity/updateOutgoingDocProductQuantityProcess",
  async (data) => {
    const {
      outgoingProductId,
      productId,
      quantity,
      kdvPercent,
      includeKdv,
      productSalesPrice,
      productSelfId,
    } = data;
    try {
      const res = await axios.post("updateOutgoingProductQuantity", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const deleteProductFromIncomingProductProcess = createAsyncThunk(
  "removeProduct/deleteProductFromIncomingProductProcess",
  async (data) => {
    const { incomingProductId, productId } = data;

    try {
      const res = await axios.post("removeProduct", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const deleteProductFromOutgoingProductProcess = createAsyncThunk(
  "removeOutgoingProduct/deleteProductFromOutgoingProductProcess",
  async (data) => {
    const { outgoingProductId, productId } = data;

    try {
      const res = await axios.post("removeOutgoingProduct", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addIncomingProductToIncomingProductProcess = createAsyncThunk(
  "addProductToIncomingProduct/addIncomingProductToIncomingProductProcess",
  async (data) => {
    const {
      incomingProductId,
      productId,
      productQuantity,
      kdvPercent,
      includeKdv,
      productPurchasePrice,
    } = data;

    try {
      const res = await axios.post("addProductToIncomingProduct", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const addIncomingProductToOutgoingProductProcess = createAsyncThunk(
  "addProductToOutgoingProduct/addIncomingProductToOutgoingProductProcess",
  async (data) => {
    const {
      outgoingProductId,
      productId,
      productQuantity,
      kdvPercent,
      includeKdv,
      productSalesPrice,
    } = data;
    try {
      const res = await axios.post("addProductToOutgoingProduct", data);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const updateOutgoingDocProcess = createAsyncThunk(
  "updateOutgoingProduct/updateOutgoingDocProcess",
  async (data) => {
    const { documentDate, order, description, _id } = data;
    const params = new FormData();
    params.append("documentDate", documentDate);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("_id", _id);

    try {
      const res = await axios.post("updateOutgoingProduct", params);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
const deleteProductFromOutgoingVirtualDocProcess = createAsyncThunk(
  "removeProductfromOutgoingDocvirtualDoc/deleteProductFromOutgoingVirtualDocProcess",
  async (data) => {
    const { virtualDocId, productId } = data;
    try {
      const res = await axios.post(
        "removeProductfromOutgoingDocvirtualDoc",
        data
      );
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const updateIncomingDocProcess = createAsyncThunk(
  "updateIncomingProduct/updateIncomingDocProcess",
  async (data) => {
    const { documentDate, order, description, _id } = data;
    const params = new FormData();
    params.append("documentDate", documentDate);
    if (order) {
      params.append("order", order);
    }
    params.append("description", description);
    params.append("_id", _id);

    try {
      const res = await axios.post("updateIncomingProduct", params);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const deleteVirtualOutgoingDocProcess = createAsyncThunk(
  "deleteVirtualOutgoingDoc/deleteVirtualOutgoingDocProcess",
  async (data) => {
    const { virtualDocId } = data;
    try {
      const res = await axios.post("deleteVirtualOutgoingDoc", data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export {
  deleteVirtualOutgoingDocProcess,
  deleteProductFromOutgoingVirtualDocProcess,
  getVirtualOutgoingProductDetailProcess,
  addProductToOutgoingVirtualDocProcess,
  addVirtualOutgoingDocProcess,
  deleteVirtualIncomingDocProcess,
  updateIncomingVirtualDocProductsProcess,
  updateOutgoingVirtualDocProductsProcess,
  getVirtualIncomingProductDetailProcess,
  deleteProductFromIncomingVirtualDocProcess,
  addVirtualIncomingDocProcess,
  addProductToIncomingVirtualDocProcess,
  addOutgoingProductWithProductsProcess,
  addIncomingProductWithProductsProcess,
  getUserDetailProcess,
  updateUserProcess,
  updateUserPasswordProcess,
  deleteCategoryProcess,
  updateCategoryProcess,
  registerProcess,
  getProductsByCategoryProcess,
  addNewCategoryProcess,
  getAllCategoriesProcess,
  refreshToken,
  authLogin,
  authLogOut,
  getAllProductsProcess,
  getProductDetailProcess,
  getAllOrdersProcess,
  getTedarikciOrdersProcess,
  getMusteriOrdersProcess,
  getOrderDetailProcess,
  getAllDocumentsProcess,
  getIncomingProductsProcess,
  getOutgoingProductsProcess,
  addNewProductProcess,
  updateProductProcess,
  addNewOrderProcess,
  productDeleteProcess,
  addIncomingProductProcess,
  deleteOrderProcess,
  getIncomingTransactionsProcess,
  updateOrderProcess,
  getIncomingProductDetailProcess,
  getOutgoingProductDetailProcess,
  updateIncomingDocProductQuantityProcess,
  updateOutgoingDocProductQuantityProcess,
  deleteProductFromIncomingProductProcess,
  deleteProductFromOutgoingProductProcess,
  addIncomingProductToIncomingProductProcess,
  addOutgoingProductProcess,
  addIncomingProductToOutgoingProductProcess,
  updateOutgoingDocProcess,
  updateIncomingDocProcess,
  getNextDocumentNumberProcess,
};
