import React, {useState} from 'react';
import {View, Text, BorderedView as BView} from "./Themed";
import {StyleSheet, TouchableOpacity} from "react-native";

type Props = {
  min?: number,
  max?: number,
  initCount?: number,
  counterPosition?: "left" | "center" | "right"
  onValueChanged?: (value: number) => void
}

// TODO: specify options for: borderColor, container size, font-size, counter Position

export default function Stepper(props: Props) {
  const min = props.min ?? 0;
  const max = props.max ?? 10;
  const counterPosition = props.counterPosition ?? "center";
  const [count, setCount] = useState(props.initCount ?? 0);

  const increaseCount = (add: number) => {
    const next = count + add;
    if(next < min) updateCount(min);
    else if (next > max) updateCount(max);
    else updateCount(next);
  }

  const updateCount = (val: number) => {
    if (props.onValueChanged)
      props.onValueChanged(val);

    setCount(val);
  }

  const isMinusDisabled = count == min;
  const isPlusDisabled = count == max;

  const minus = (<BView style={[styles.button, styles.minus, isMinusDisabled ? styles.buttonDisabled : {}]}>
                  <TouchableOpacity style={styles.touchable} disabled={isMinusDisabled}
                                    onPress={() => increaseCount(-1)}>
                    <Text style={styles.text}>-</Text>
                  </TouchableOpacity>
                </BView>);

  const text = (<BView style={styles.counterContainer}>
                  <Text style={[styles.text, styles.counter]}>{count}</Text>
                </BView>);

  const plus = (<BView style={[styles.button, styles.plus, isPlusDisabled ? styles.buttonDisabled : {}]}>
                <TouchableOpacity style={styles.touchable} disabled={isPlusDisabled}
                                  onPress={() => increaseCount(1)}>
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
              </BView>);

  const counter = (() => {
    switch (counterPosition){
      case "left":
        return <>{text}{minus}{plus}</>
      case "center":
        return <>{minus}{text}{plus}</>
      case "right":
        return <>{minus}{plus}{text}</>
    }
  })();



  return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {counter}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  touchable:{
    width: "100%",
    alignItems: "center"
  },

  container: {
    flexDirection: "row",
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    fontSize: 20,
  },

  counter: {
    minWidth: 30,
    textAlign: "center",
  },

  button: {
    borderWidth: 1,
    height: "100%",
    width: 50,
    alignItems: "center",
    //flex: 1
  },

  buttonDisabled: {
    opacity: 0.2
  },

  minus: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0
  },

  plus: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 0
  },

  counterContainer: {
    borderWidth: 1
  }
});
