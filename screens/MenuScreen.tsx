import React, {useState} from 'react';
import {Button, DeviceEventEmitter, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, View } from "../components/Themed";
import useLoadItems from "../hooks/useLoadItems";
import {Item, NavigationProp, SubOrder} from "../types";
import { useNavigation } from "@react-navigation/native";

export default function MenuScreen({navigation}: NavigationProp<any>) {
  const data = useLoadItems();
  let initOrder: SubOrder[] = [];

  for (let i = 0; i < data.length; i++) {
    initOrder[i] = {item: data[i], count: 0}
  }

  const [order, setOrder] = useState(initOrder);

  const onOrderUpdated = ({item, count}: SubOrder) => {
    let newOrder = [...order];
    newOrder[item.id] = {item: item, count: count}
    setOrder(newOrder);
  }

  DeviceEventEmitter.removeAllListeners('order.update');
  DeviceEventEmitter.addListener('order.update', onOrderUpdated);

  return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList data={order}
                    extraData={order}
                    renderItem={({item} : any) => <MenuItem item={item.item} count={item.count}/>}
                    keyExtractor={(item) => item.item.id.toString()}/>
        </View>
        <View>
          <Button title="Checkout" onPress={() => navigation.navigate("Checkout")}/>
        </View>
      </View>
  );
}

function MenuItem(props: SubOrder) {
  const navigation = useNavigation();
  const {item, count} = props;

  //style={styles.itemContainer}
  return (
      <View lightColor={"#f6f6f6"} darkColor={"#262626"} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Item", {item: item, count: count})}>
          <Text>{item.id}</Text>
          <Text>{item.name}</Text>
          <Text>{item.imageUrl}</Text>
          <Text>{item.price}</Text>
          <Text>{count}</Text>
          <Text>Added: {count > 0 ? "true" : "false"}</Text>
        </TouchableOpacity>
      </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listContainer: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    flex: 1
  },

  itemContainer: {
    flex: 1,
    borderRadius: 10,
    marginVertical: 2,
    padding: 4
  }
});
