/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import {LinkingOptions} from "@react-navigation/native";

const linkingOptions : LinkingOptions =
    {
      prefixes: [Linking.makeUrl('/')],
      config: {
        initialRouteName: "Menu",
        screens: {
          Root: {
            screens: {
              MenuTab: {
                screens: {
                  MenuScreen: 'Menu',
                  ItemScreen: 'Item',
                  CheckoutScreen: 'Checkout'
                }
              },
            },
          },
          NotFound: '*',
        },
      },
    }

export default {...linkingOptions}
