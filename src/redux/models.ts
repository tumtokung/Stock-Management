export interface Product {
  id: string;
  name: string;
  quantity: number;
  quantityMinimum: number;
  purchasePrice: number;
  sellingPrice: number;
  createdAt: string;
  updatedAt: string;
}

export type ThemeColor = 'dark' | 'light' | 'device';

export interface AppState {
  colorMode: ThemeColor;
  products: Product[];
}

export enum AppActionType {
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  UPDATE_COLOR_MODE = 'UPDATE_COLOR_MODE',
}
export type AppAction = AppActionType;

export interface AppActionInterface {
  type: AppAction;
  payload: any;
}
