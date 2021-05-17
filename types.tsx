import {NavigationProp as NP} from "@react-navigation/native";

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type NavigationProp<T> = {
  navigation: NP<any>,
  route: {
    key: string,
    name: string,
    params: T
  }
}

export type SubOrder = {
  item: Item,
  count: number
}

export type Item = {
  id: number
  name: string,
  imageUrl: string,
  price: number
}
