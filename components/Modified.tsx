import React from 'react';
import {Button as DefaultButton, StyleSheet, View} from "react-native";

export function Button(props: DefaultButton['props']) {
  return (
      <View style={styles.flexButton}>
        <DefaultButton {...props}/>
      </View>
  );
}

const styles = StyleSheet.create({
  flexButton: {
    flex: 1,
    marginHorizontal: 8
  }
})
