/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type SidebarDrawerParamList = {
  MenuScreen: undefined,
  NotificationScreen: undefined,
}

export type MenuStackNavigationParamList = {
  Menu: undefined,
  Item: SubOrder,
  Checkout: Order
}

export type SubOrder = {
  item: Item,
  count: number
}

export type Order = {
  [id: string]: SubOrder
}

export type Item = {
  id: string
  name: string,
  imageUrl: any,
  price: number,
  limitCount: number
}
