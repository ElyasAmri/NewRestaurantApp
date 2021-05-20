import React from 'react';
import { View, Text } from "../components/Themed";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
      <View style={styles.container}>
        <Text>TODO: Added a good screen for home</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  }
});
