import { CartProps } from '../../store/Cart/cartSlice';

export function getAddedToCartQty(id: string, cartItems: CartProps[]) {
  return cartItems.find((item) => item._id === id)?.qty || 0;
}
