import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../models/';
import {Transaction, TransactionDetail} from '../screens';

const RootStack = createNativeStackNavigator();

function TransactionStack() {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.Transaction}
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name={Screens.Transaction} component={Transaction} />
      <RootStack.Screen
        name={Screens.TransactionDetail}
        component={TransactionDetail}
      />
    </RootStack.Navigator>
  );
}

export default TransactionStack;
