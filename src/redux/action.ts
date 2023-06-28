import {
  Product,
  AppActionType,
  AppActionInterface,
  ThemeColor,
  Transaction,
} from './models';

export function setAllProduct(products: Product[]): AppActionInterface {
  return {
    type: AppActionType.SET_ALL_PRODUCT,
    payload: products,
  };
}

export function addProduct(product: Product): AppActionInterface {
  return {
    type: AppActionType.ADD_PRODUCT,
    payload: product,
  };
}

export function updateProduct(product: Product): AppActionInterface {
  return {
    type: AppActionType.UPDATE_PRODUCT,
    payload: product,
  };
}

export function deleteProduct(id: string): AppActionInterface {
  return {
    type: AppActionType.DELETE_PRODUCT,
    payload: id,
  };
}

export function updateColorMode(mode: ThemeColor): AppActionInterface {
  return {
    type: AppActionType.UPDATE_COLOR_MODE,
    payload: mode,
  };
}

export function setAllTransaction(
  transactions: Transaction[],
): AppActionInterface {
  return {
    type: AppActionType.SET_ALL_TRANSACTION,
    payload: transactions,
  };
}

export function addTransaction(transaction: Transaction): AppActionInterface {
  return {
    type: AppActionType.ADD_TRANSACTION,
    payload: transaction,
  };
}
