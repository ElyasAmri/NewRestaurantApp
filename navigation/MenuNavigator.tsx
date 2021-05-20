import React from 'react';
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack"
import MenuScreen from "../screens/MenuScreen";
import ItemScreen from "../screens/ItemScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

const Stack = createStackNavigator();

function MenuNavigator() {
  return (
      <Stack.Navigator initialRouteName="Menu" headerMode="none">
        <Stack.Screen name="Menu" component={MenuScreen}/>
        <Stack.Screen name="Item" component={ItemScreen}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{...TransitionPresets.ModalSlideFromBottomIOS}}/>
      </Stack.Navigator>
  );
}

export default MenuNavigator;
