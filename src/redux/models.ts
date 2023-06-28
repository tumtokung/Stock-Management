export interface Product {
  id: string;
  name: string;
  img: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  createdAt: string;
  updatedAt: string;
}

export enum TransactionType {
  Buy = 'Buy',
  Sell = 'Sell',
}
export interface Transaction {
  id: string;
  product: Product;
  type: TransactionType;
  quantity: number;
  createdAt: string;
}

export type ThemeColor = 'dark' | 'light' | 'device';

export interface AppState {
  colorMode: ThemeColor;
  products: Product[];
  transactions: Transaction[];
}

export enum AppActionType {
  SET_ALL_PRODUCT = 'SET_ALL_PRODUCT',
  ADD_PRODUCT = 'ADD_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  UPDATE_COLOR_MODE = 'UPDATE_COLOR_MODE',
  SET_ALL_TRANSACTION = 'SET_ALL_TRANSACTION',
  ADD_TRANSACTION = 'ADD_TRANSACTION',
}
export type AppAction = AppActionType;

export interface AppActionInterface {
  type: AppAction;
  payload: any;
}
