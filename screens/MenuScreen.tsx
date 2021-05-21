import React, {useEffect, useReducer, useRef } from 'react';
import {Button, DeviceEventEmitter, FlatList, StyleSheet } from 'react-native';
import { Text, View, BorderedView as BView } from "../components/Themed";
import useLoadItems from "../hooks/useLoadItems";
import {MenuStackNavigationParamList, Order, SubOrder} from "../types";
import {StackScreenProps} from "@react-navigation/stack";
import MenuItem from "../components/MenuItem";

export default function MenuScreen({navigation}: StackScreenProps<MenuStackNavigationParamList>) {
  const orderRef = useRef<Order>({});
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [items, isLoading, failed, shouldRefresh, refresh] = useLoadItems();

  useEffect(() => {
    if(failed) {
      // return;
    }
    const next = items.map((e, i) => orderRef.current[i.toString()] ?? {item: e, count: 0});
    for (let i = 0; i < next.length; i++) {
      const n = next[i];
      orderRef.current[n.item.id] = n;
    }
    forceUpdate();
  }, [items, shouldRefresh])

  const onOrderUpdated = ({item, count}: SubOrder) => {
    orderRef.current[item.id] = {item: item, count: count}
    forceUpdate();
  };

  useEffect(() => {
    refresh();
    DeviceEventEmitter.removeAllListeners('order.update');
    DeviceEventEmitter.addListener('order.update', onOrderUpdated);
  }, [])

  const isCheckoutDisabled = !Object.values(orderRef.current).some((subOrder: SubOrder) => subOrder.count > 0);

  return (
      <View style={styles.container}>
        <Text style={{alignSelf: "center"}}>New Restaurant App</Text>
        <BView style={styles.listContainer}>
          <FlatList data={items}
                    extraData={shouldRefresh}
                    renderItem={({item} : any) => <MenuItem item={item} count={orderRef.current[item.id]?.count}/>}
                    keyExtractor={(item) => item.id.toString()}
                    onRefresh={() => refresh()} refreshing={isLoading}/>
        </BView>
        {failed &&
        <View style={styles.error}>
            <Text style={styles.errorText}>Error: couldn't get menu from server.</Text>
            <Text style={styles.errorText}>Pull down to refresh. (error count: {shouldRefresh})</Text>
        </View>
        }
        <Button title="Checkout"
                disabled={isCheckoutDisabled}
                onPress={() => navigation.navigate("Checkout", orderRef.current)}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listContainer: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 5
  },
  errorText: {

    textAlign: "center",
    //textAlignVertical: "center",
  },
  error: {
    flex: 1,
    position: "absolute",
    top: "50%",
    alignSelf: "center",
  }

});
