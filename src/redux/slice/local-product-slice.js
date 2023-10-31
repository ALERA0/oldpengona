import { createSlice } from "@reduxjs/toolkit";

export const localProductsSlice = createSlice({
    name: "localProducts",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        products: [],
    },
    reducers: {
        
        addProduct: (state, action) => {
            const existingProductIndex = state.products.findIndex(
                (product) => product.productId === action.payload.productId
            );

            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
        },
        resetProducts: (state) => {
            state.products = [];
        },
        updateProduct: (state, action) => {
            const { productId, newQuantity } = action.payload;
            const existingProductIndex = state.products.findIndex(
                (product) => product.productId === productId
            );
            if (existingProductIndex !== -1) {
                // Update the quantity of the existing product
                state.products[existingProductIndex].quantity = newQuantity;
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product.productId !== action.payload
            );
        },
    },

});

export const {
    resetAddIncomingProductWithProducts,
    addProduct,
    resetProducts,
    removeProduct,
    updateProduct
} = localProductsSlice.actions;
export default localProductsSlice.reducer;