import { createSlice } from '@reduxjs/toolkit';

export type CartProps = {
  _id: string;
  productName: string;
  qty: number;
  description: string;
  price: number;
  stockQty: number;
  imgPath: string;
  category: string;
};

const initialState = {
  products: [] as CartProps[],
  cartItems: [] as CartProps[],
};

const shoppingCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseProductQty: (state, action) => {
      const { id, product } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        const productInfo = state.products.find((product) => product._id === id) || product;

        if (productInfo) {
          state.cartItems.push({
            _id: productInfo._id,
            productName: productInfo.productName,
            description: productInfo.description,
            price: productInfo.price,
            stockQty: productInfo.stockQty,
            qty: 1,
            imgPath: productInfo.imgPath,
            category: productInfo.category,
          });
        }
      }
    },
    decreaseProductQty: (state, action) => {
      const { id } = action.payload;
      const updatedCartItems = state.cartItems.map((item) => {
        if (item._id === id) {
          return { ...item, qty: Math.max(0, item.qty - 1) };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedCartItems.filter((item) => item.qty > 0),
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cartItems: [],
      };
    },
  },
});

export const { increaseProductQty, decreaseProductQty, clearCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
