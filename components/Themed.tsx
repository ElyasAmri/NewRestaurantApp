/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import {StyleSheet, Text as DefaultText, TextStyle, View as DefaultView} from 'react-native';
import * as TableComponent from "react-native-table-component";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export function Text(props: ThemeProps & DefaultText['props']) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ThemeProps & DefaultView['props']) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function BorderedView(props: ThemeProps & DefaultView['props']) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  return <DefaultView style={[{ backgroundColor }, { borderColor }, style]} {...otherProps} />;
}

// export function TextThemed<T extends React.FC>(props: ThemeProps & {Component: T}) {
//   const { lightColor, darkColor, textStyle, Component, ...otherProps } = props;
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
//   const newTextStyle = StyleSheet.compose<TextStyle>({color}, textStyle as any) as any
//   return <Component textStyle={newTextStyle} {...otherProps}/>
// }

export function Row(props: TableComponent.RowProps & ThemeProps){
  const { lightColor, darkColor, textStyle, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const newTextStyle = StyleSheet.compose<TextStyle>({color}, textStyle as any) as any
  return <TableComponent.Row textStyle={newTextStyle} {...otherProps}/>
}

export function Rows(props: TableComponent.RowsProps & ThemeProps){
  const { lightColor, darkColor, textStyle, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const newTextStyle = StyleSheet.compose<TextStyle>({color}, textStyle as any) as any
  return <TableComponent.Rows textStyle={newTextStyle} {...otherProps}/>
}
