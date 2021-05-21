import React, {useEffect, useState} from 'react';
import {StyleSheet, DeviceEventEmitter, Image} from "react-native";
import {Text, View, BorderedView as BView} from '../components/Themed';
import {MenuStackNavigationParamList} from "../types";
import Stepper from "../components/Stepper";
import {Button} from "../components/Modified";
import {StackScreenProps} from "@react-navigation/stack";
import {format} from "../helpers";


export default function ItemScreen(props: StackScreenProps<MenuStackNavigationParamList, "Item">) {
  const navigation = props.navigation;
  const item = props.route.params.item;
  const {name, imageUrl, price, limitCount} = item;
  const [count, setCount] = useState(props.route.params.count);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if(imageUrl) setImage(imageUrl.url());
  }, [imageUrl])

  const add = () => {
    DeviceEventEmitter.emit('order.update', {item: item, count: count})
    navigation.goBack();
  }

  return (
      <View style={styles.container}>
        <BView style={styles.imageContainer}>
          {image != "" &&
            <Image style={{flex: 1}} source={{uri: image}}/>
          }
        </BView>
        <View style={styles.horizontal}>
          <Text style={styles.name}>{name}  </Text>
          <Text>{format(price)}</Text>
        </View>
        <View style={styles.space}/>
        <View style={styles.configContainer}>
          <View style={styles.container}>
            <Stepper initCount={count} max={limitCount} onValueChanged={setCount}/>
          </View>
          <View style={styles.container}>
            <Text>{format(price * count)}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <Button title="Back" onPress={navigation.goBack}/>
          <Button title="Add" onPress={add}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  space: {
    flex: 0.75,
  },

  name: {
    fontSize: 24
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 1
  },

  configContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "flex-end"
  },

  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  }

});
