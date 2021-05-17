import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import { View } from './components/Themed';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete)
    return null;

  return (
    <View style={[styles.bar, styles.flex]}>
      <SafeAreaView style={styles.flex}>
        <View style={[styles.rootContainer, styles.flex]}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </View>
      </SafeAreaView>
    </View>
    );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "red"
  },

  flex: {
    flex: 1
  },

  rootContainer: {
    padding: 5
  }
});
