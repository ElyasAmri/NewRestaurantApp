import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {useNetInfo} from "@react-native-community/netinfo";

import Navigation from './navigation';
import NotConnectedScreen from "./screens/NotConnectedScreen";
import {useThemeColor} from "./components/Themed";

import Parse from "parse/react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "./env";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(env('back4app_app_id') as string, env('back4app_js_id') as string);
Parse.serverURL = 'https://parseapi.back4app.com/';

// noinspection JSUnusedGlobalSymbols
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const netInfo = useNetInfo();
  const color = useThemeColor({}, 'background');

  const hasInternet = netInfo.isConnected && netInfo.isInternetReachable
  const load = (env("env") == "local" || hasInternet) ?? true;

  if (!isLoadingComplete)
    return null;

  return (
      <SafeAreaProvider style={styles.flex}>
        <SafeAreaView style={[styles.rootContainer, styles.flex, {backgroundColor: color}]}>
          {load ? <Navigation colorScheme={colorScheme} /> : <NotConnectedScreen/>}
        </SafeAreaView>
        <StatusBar style="inverted" backgroundColor={"#30efb3"}/>
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },

  rootContainer: {
    padding: 5
  }
});
