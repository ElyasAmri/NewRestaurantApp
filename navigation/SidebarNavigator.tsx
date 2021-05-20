import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import NotFoundScreen from "../screens/NotFoundScreen";
import MenuNavigator from './MenuNavigator'
import HomeScreen from "../screens/HomeScreen";

const Sidebar = createDrawerNavigator();

export default function SidebarNavigator() {
  return (
      <Sidebar.Navigator initialRouteName="MenuScreen">
        <Sidebar.Screen name="MenuTab" component={ MenuNavigator } />
        <Sidebar.Screen name="HomeTab" component={ HomeScreen } />
        <Sidebar.Screen name="NotificationsTab" component={ NotFoundScreen } />
      </Sidebar.Navigator>
  );
}
