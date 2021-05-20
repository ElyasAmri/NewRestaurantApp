import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {useNetInfo} from "@react-native-community/netinfo";

import Navigation from './navigation';
import NotConnectedScreen from "./screens/NotConnectedScreen";
import Constants from "expo-constants";

// noinspection JSUnusedGlobalSymbols
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const netInfo = useNetInfo();

  const hasInternet = netInfo.isConnected && netInfo.isInternetReachable
  const load = (Constants.manifest.extra?.app_env == "local" || hasInternet) ?? true;
  console.log(Constants.manifest.extra)

  if (!isLoadingComplete)
    return null;

  return (
      <SafeAreaProvider style={styles.flex}>
        <SafeAreaView style={[styles.rootContainer, styles.flex]}>
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
