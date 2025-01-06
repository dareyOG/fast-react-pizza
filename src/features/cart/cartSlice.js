import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     id: 100,
  //     name: 'Amala',
  //     quantity: 5,
  //     unitPrice: 500,
  //     totalPrice: 2500,
  //   },
  //   {
  //     id: 1,
  //     name: 'Margherita',
  //     quantity: 1,
  //     unitPrice: 12,
  //     totalPrice: 12,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem

      // spread method
      // state.cart = [...state.cart, action.payload];

      // push method
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      // payload = Id

      // filter method
      // state.cart = state.cart.filter((item) => item.id !== action.payload);

      // splice method
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload,
      );
      state.cart.splice(itemIndex, 1);
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity -= 1;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      item.totalPrice = item.quantity * item.unitPrice;
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getUsername = (state) => state.user.username;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
