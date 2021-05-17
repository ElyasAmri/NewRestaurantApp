import React from 'react';
import {StyleSheet} from "react-native";
import { Button } from "../components/Modified";
import { View } from "../components/Themed";
import {NavigationProp, SubOrder} from "../types";

export default function CheckoutScreen(props: NavigationProp<SubOrder[]>) {
  return (
      <View style={[styles.container, styles.flex]}>
        <View style={styles.actions}>
          <Button title={"Back"} onPress={props.navigation.goBack}/>
          <Button title={"Pay"} onPress={()=> console.log("Payed")}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },

  actions: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0
  },

  flex: {
    flex: 1
  }
});
