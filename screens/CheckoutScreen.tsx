import React, {useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet} from "react-native";
import { Button } from "../components/Modified";
import {View, Text, BorderedView as BView, Rows, Row} from "../components/Themed";
import { MenuStackNavigationParamList, RootStackParamList, SubOrder} from "../types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/src/types";
import { Table, TableWrapper } from 'react-native-table-component';
import {format, toArray} from "../helpers";
import Parse from "parse/react-native"

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Root">;
  route: RouteProp<MenuStackNavigationParamList, "Checkout">;
}

const itemTotalPrice = (item: SubOrder) => item.item.price * item.count;


export default function CheckoutScreen({navigation, route}: Props) {
  const data: SubOrder[] = toArray(route.params).filter((e) => e.count > 0);
  const totalPrice = format(data.reduce((acc, p) => acc + itemTotalPrice(p), 0));
  const [animating, setAnimating] = useState(false);

  const onPressedPay = async () => {
    setAnimating(true);
    const order = new Parse.Object("Order");

    order.set('sub_orders', data.map((e) => ({item: e.item.id, count: e.count})));
    order.set('success', true);

    await order.save();

    Alert.alert("Payment Successful", "Payed " + totalPrice);
    navigation.replace("Root");
  }

  const rows = data.map((e) => {
    const {id, name, price} = e.item;
    const {count} = e;
    return [id, name, price, count, format(price * count)]
  });

  return (
      <View style={[styles.flex, styles.screen]}>
          <View style={table.container}>
            <Table>
              <Row textStyle={table.headText} flexArr={[1.5, 1, 1, 1, 1]} style={table.head} data={['ID', 'Name', 'Price', 'Count', 'Total']}/>
              <TableWrapper style={table.wrapper}>
                <Rows data={rows}
                      flexArr={[1.5, 1, 1, 1, 1]}
                      style={table.row}
                      textStyle={table.text} />
              </TableWrapper>
            </Table>
          </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Total price:</Text>
          <Text style={styles.totalPriceText}>{totalPrice}</Text>
        </View>
        <BView style={styles.actions}>
          <Button title={"Back"} onPress={navigation.goBack}/>
          <Button title={"Pay"} onPress={() => onPressedPay()}/>
        </BView>
        <ActivityIndicator style={styles.loadingIndicator} color={"blue"} animating={animating} size="large"/>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column"
  },

  flex: {
    flex: 1
  },

  cell: {
    justifyContent: "flex-start",
  },

  actions: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0
  },

  listContainer: {

  },

  totalPriceContainer: {
    position: "absolute",
    bottom: 50,
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  totalPriceText: {
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "bottom"
  },

  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%"
  }
});

const table = StyleSheet.create({
  container: { width: "100%", flex: 1, padding: 16 },
  head: { height: 25, marginBottom: 5 },
  headText: { textAlign: 'left', fontSize: 20 },
  wrapper: { flexDirection: 'row' },
  row: { height: 20 },
  text: { textAlign: 'left' },
});
