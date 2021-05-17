import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import NotFoundScreen from "../screens/NotFoundScreen";
import MenuNavigator from './MenuNavigator'

const Sidebar = createDrawerNavigator();

export default function SidebarNavigator() {
  return (
      <Sidebar.Navigator initialRouteName="MenuScreen">
        <Sidebar.Screen name="MenuTab" component={ MenuNavigator } />
        <Sidebar.Screen name="NotificationsTab" component={ NotFoundScreen } />
      </Sidebar.Navigator>
  );
}
