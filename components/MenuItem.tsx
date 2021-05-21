import React, {useEffect, useState} from "react";
import {SubOrder} from "../types";
import {useNavigation} from "@react-navigation/native";
import {Button, DeviceEventEmitter, Image, StyleSheet, TouchableOpacity} from "react-native";
import {Text, View, BorderedView as BView} from "./Themed";

export default function MenuItem(props: SubOrder) {
  const navigation = useNavigation();
  const {item, count} = props;
  // noinspection JSUnusedLocalSymbols
  const { name, imageUrl, price} = item;
  const added = count > 0;
  const addedColor = "#349334";
  const lightColor = added ? addedColor : "#f6f6f6";
  const darkColor = added ? addedColor : "#262626";
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if(imageUrl) setImage(imageUrl.url());
  }, [imageUrl])

  const onRemove = () => {
    DeviceEventEmitter.emit('order.update', {item: item, count: 0});
  }

  const remove = (
      <View style={styles.remove}>
          <Text>Added: {count}</Text>
          <Button title="Remove" onPress={onRemove}/>
      </View>);

  return (
      <View lightColor={lightColor} darkColor={darkColor} style={styles.itemContainer} >
        <TouchableOpacity style={styles.touchable}
                          onPress={() => navigation.navigate("Item", {item: item, count: count})}>
          <Text style={styles.name}>{name}</Text>
          <BView style={styles.image}>
            {image != "" &&
              <Image style={{flex: 1}} source={
                {uri: image}
              }/>
            }
          </BView>
          <Text style={styles.price}>{price}</Text>
        </TouchableOpacity>
        {added ? remove : <></> }
      </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 4,
  },

  remove: {
    flex: 0.3,
    position: "absolute",
    right: 0,
    alignSelf: "flex-end",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 5,
    backgroundColor: "transparent"
  },

  name: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    fontSize: 20,
    textShadowRadius: 10
  },

  price: {
    position: "absolute",
    alignSelf: "center",
    top: 0,
    right: 10,
  },

  image: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "transparent",
    borderWidth: 1
  }
});
