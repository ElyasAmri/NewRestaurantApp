import React from 'react';
import {Alert, StyleSheet} from "react-native";
import { Button } from "../components/Modified";
import {View, Text, BorderedView as BView, Rows, Row} from "../components/Themed";
import { MenuStackNavigationParamList, RootStackParamList, SubOrder} from "../types";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack/src/types";
import { Table, TableWrapper } from 'react-native-table-component';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Root">;
  route: RouteProp<MenuStackNavigationParamList, "Checkout">;
}

const format = (value: number) => "$" + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
const itemTotalPrice = (item: SubOrder) => item.item.price * item.count;


export default function CheckoutScreen({navigation, route}: Props) {
  const data = route.params.filter((e) => e.count > 0);
  const totalPrice = format(data.reduce((acc, p) => acc + itemTotalPrice(p), 0));

  const onPressedPay = () => {
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
              <Row textStyle={table.headText} style={table.head} data={['ID', 'Name', 'Price', 'Count', 'Total']}/>
              <TableWrapper style={table.wrapper}>
                <Rows data={rows}
                      flexArr={[1, 1, 1, 1, 1]}
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
          <Button title={"Pay"} onPress={onPressedPay}/>
        </BView>
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

});

const table = StyleSheet.create({
  container: { width: "100%", flex: 1, padding: 16 },
  head: { height: 25, marginBottom: 5 },
  headText: { textAlign: 'left', fontSize: 20 },
  wrapper: { flexDirection: 'row' },
  row: { height: 20 },
  text: { textAlign: 'left' },
});
