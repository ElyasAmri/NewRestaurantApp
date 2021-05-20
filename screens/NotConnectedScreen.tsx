import React from 'react';
import {View, Text} from "../components/Themed";
import { StyleSheet } from "react-native";

export default function NotConnectedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.modal} lightColor={"#9c9c9c"} darkColor={"#242424"}>
        <Text>No Internet Connection</Text>
        {/*<Button title={"Refresh"} onPress={()=>alert("refreshed")}/>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    flex: 0.12,
    aspectRatio: 3.5,
    justifyContent: "space-evenly",
    alignItems: "center",
  }
});
