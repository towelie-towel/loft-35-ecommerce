import React, { createContext, useReducer } from 'react';
import { IProduct } from '../utils/data';

interface ICart {
  cartItems: IProduct[];
}

interface IState {
  cart: ICart;
}

interface IStore {
  state: IState;
  dispatch: React.Dispatch<{
    type: string;
    payload: IProduct;
  }>;
}

let cartItems: IProduct[] = [];

const initialState: IState = {
  cart: { cartItems },
};

const store: IStore = {
  state: initialState,
  dispatch: function (value: { type: string; payload: IProduct }): void {
    throw new Error('Function not implemented.');
  },
};

export const Store = createContext(store);

function reducer(
  state: IState,
  action: { type: string; payload: IProduct }
): IState {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: IProduct) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map(
            (item: IProduct): IProduct =>
              item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

interface IProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;