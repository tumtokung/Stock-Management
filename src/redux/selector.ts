import {Product, ThemeColor, Transaction} from './models';
import {RootState} from './store';

export function getProductState(state: RootState): Product[] {
  return state.products;
}

export function getColorModeState(state: RootState): ThemeColor {
  return state.colorMode;
}

export function getTransactionState(state: RootState): Transaction[] {
  return state.transactions;
}
