import {AppState, AppActionType, AppActionInterface} from './models';

const initialState: AppState = {
  colorMode: 'device',
  products: [],
  transactions: [],
};

export function appReducer(
  state = initialState,
  action: AppActionInterface,
): AppState {
  switch (action.type) {
    case AppActionType.SET_ALL_PRODUCT:
      return {
        ...state,
        products: [...action.payload],
      };
    case AppActionType.ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case AppActionType.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product,
        ),
      };
    case AppActionType.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload,
        ),
      };
    case AppActionType.UPDATE_COLOR_MODE:
      return {
        ...state,
        colorMode: action.payload,
      };
    case AppActionType.SET_ALL_TRANSACTION:
      return {
        ...state,
        transactions: [...action.payload],
      };
    case AppActionType.ADD_TRANSACTION:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.product.id
            ? action.payload.product
            : product,
        ),
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
}
