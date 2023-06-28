import {RouteProp} from '@react-navigation/native';
import {Product} from '../redux/models';

export enum ScreenType {
  Read,
  Create,
  Edit,
}

export interface ProductDetailProp {
  product?: Product;
  screenType: ScreenType;
}

export type AppStackParamList = {
  Dashboard: undefined;
  Product: undefined;
  ProductDetail: ProductDetailProp;
  Transaction: undefined;
  TransactionDetail: undefined;
  Setting: undefined;
};

export type AppRouteProps<RouteName extends keyof AppStackParamList> =
  RouteProp<AppStackParamList, RouteName>;
