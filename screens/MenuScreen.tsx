import React, {useEffect, useReducer, useRef } from 'react';
import {Button, DeviceEventEmitter, FlatList, StyleSheet } from 'react-native';
import { Text, View, BorderedView as BView } from "../components/Themed";
import useLoadItems from "../hooks/useLoadItems";
import { MenuStackNavigationParamList, SubOrder } from "../types";
import {StackScreenProps} from "@react-navigation/stack";
import MenuItem from "../components/MenuItem";


export default function MenuScreen({navigation}: StackScreenProps<MenuStackNavigationParamList>) {
  // TODO: modify the state so that it only takes itemID and count
  // Should pass a global data between screens
  const orderRef = useRef<SubOrder[]>([]);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [shouldRefresh, refresh] = useReducer(x => x + 1, 0);
  const [data, isLoading, failed] = useLoadItems(shouldRefresh);

  useEffect(() => {
    if(failed) return;
    orderRef.current = data.map((e, i) => orderRef.current[i] ?? {item: e, count: 0});
    forceUpdate();
  }, [shouldRefresh])

  const onOrderUpdated = ({item, count}: SubOrder) => {
    orderRef.current[item.id] = {item: item, count: count}
    forceUpdate();
  };

  useEffect(() => {
    refresh();
    DeviceEventEmitter.removeAllListeners('order.update');
    DeviceEventEmitter.addListener('order.update', onOrderUpdated);
  }, [])

  const isCheckoutDisabled = !orderRef.current.some((item: SubOrder) => item.count > 0);

  return (
      <View style={styles.container}>
        <Text style={{alignSelf: "center"}}>New Restaurant App</Text>
        <BView style={styles.listContainer}>
          <FlatList data={orderRef.current}
                    extraData={shouldRefresh}
                    renderItem={({item} : any) => <MenuItem item={item.item} count={item.count}/>}
                    keyExtractor={(item) => item.item.id.toString()}
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
