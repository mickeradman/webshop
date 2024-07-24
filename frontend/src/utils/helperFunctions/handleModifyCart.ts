import { AppDispatch } from '../../store/store';
import {
  increaseProductQty,
  decreaseProductQty,
  clearCart,
} from '../../store/Cart/CartSlice';
import { Product } from '../../types/types';

type ModifyCartProps = {
  dispatch: AppDispatch;
  product?: Product;
};

export function createHandleModifyCart({ dispatch, product }: ModifyCartProps) {
  return (actionType: string) => {
    return (
      event?:
        | React.MouseEvent<SVGSVGElement>
        | React.MouseEvent<HTMLButtonElement>
    ) => {
      if (event) {
        event.stopPropagation();
      }

      switch (actionType) {
        case 'add':
          if (product) {
            dispatch(
              increaseProductQty({
                id: product._id,
                product,
              })
            );
          }
          break;
        case 'remove':
          if (product) {
            dispatch(
              decreaseProductQty({
                id: product._id,
              })
            );
          }
          break;
        case 'clear':
          dispatch(clearCart());
          break;
        default:
          console.warn(`Unhandled action type: ${actionType}`);
      }
    };
  };
}
