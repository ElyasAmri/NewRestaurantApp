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
  Checkout: SubOrder[]
}

export type SubOrder = {
  item: Item,
  count: number
}

export type Item = {
  id: number
  name: string,
  imageUrl: string,
  price: number,
  limitCount: number
}
