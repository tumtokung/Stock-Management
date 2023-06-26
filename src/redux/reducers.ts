import {AppState, AppActionType, AppActionInterface} from './models';

const initialState: AppState = {
  colorMode: 'device',
  products: [],
};

export function appReducer(
  state = initialState,
  action: AppActionInterface,
): AppState {
  switch (action.type) {
    case AppActionType.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
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
    default:
      return state;
  }
}
