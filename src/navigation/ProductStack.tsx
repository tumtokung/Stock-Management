import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../models/';
import {Product, ProductDetail} from '../screens';

const RootStack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.Product}
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name={Screens.Product} component={Product} />
      <RootStack.Screen
        name={Screens.ProductDetail}
        component={ProductDetail}
      />
    </RootStack.Navigator>
  );
};

export default ProductStack;
