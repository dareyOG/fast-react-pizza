import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   cart: [],
  cart: [
    {
      id: 100,
      name: 'Amala',
      quantity: 5,
      unitPrice: 500,
      totalPrice: 2500,
    },
    {
      id: 1,
      name: 'Margherita',
      quantity: 1,
      unitPrice: 12,
      totalPrice: 12,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem

      // state.cart = [...state.cart, action.payload];

      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      // payload = Id
      // state.cart = state.cart.filter((item) => item.id !== action.payload);

      const item = (item) => item.id === action.payload.id;
      state.cart.splice(state.cart.findIndex(item), 1);
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);

      item.quantity = +1;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);

      item.quantity = -1;
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
