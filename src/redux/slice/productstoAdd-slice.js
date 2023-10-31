const initialState = {
    productsToAdd: [],
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PRODUCTS':
        return {
          ...state,
          productsToAdd: [...state.productsToAdd, ...action.payload],
        };
      default:
        return state;
    }
  };
  
  export default productReducer;