import React, {useState} from 'react';
import {StyleSheet, DeviceEventEmitter} from "react-native";
import {Text, View} from '../components/Themed';
import {NavigationProp, SubOrder} from "../types";
import Stepper from "../components/Stepper";
import {Button} from "../components/Modified";


export default function ItemScreen(props: NavigationProp<SubOrder>) {
  const navigation = props.navigation;
  const item = props.route.params.item;
  const [count, setCount] = useState(props.route.params.count);

  const add = () => {
    DeviceEventEmitter.emit('order.update', {item: item, count: count})
    navigation.goBack();
  }

  return (
      <View style={styles.container}>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.imageUrl}</Text>
        <Text>{item.price}</Text>
        <Stepper initCount={count} onValueChanged={setCount}/>
        <View style={styles.actionsContainer}>
          <Button title="Back" onPress={navigation.goBack}/>
          <Button title="Add" onPress={add}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0
  }
});
