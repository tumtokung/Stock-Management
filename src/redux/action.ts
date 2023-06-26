import {Product, AppActionType, AppActionInterface, ThemeColor} from './models';

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

export function deleteProduct(id: number): AppActionInterface {
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
