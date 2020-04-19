import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import BordScreen from '../screens/BordScreen';
import HistoryScreen from '../screens/HistoryScreen';
import InfoScreen from '../screens/InfoScreen';
import ContactScreen from '../screens/ContactScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'BordScreen';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="BordScreen"
        component={BordScreen}
        options={{
          title: 'Bord',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-analytics" />,
        }}
      />
      <BottomTab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: 'Historique',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clock" />,
        }}
      />
      <BottomTab.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          title: 'Info',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-information-circle" />,
        }}
      />
      <BottomTab.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: 'Compte',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person-add" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'BordScreen':
      return 'Tableau de bord';
    case 'HistoryScreen':
      return 'Historique';
    case 'InfoScreen':
      return 'Information de santé';
    case 'ContactScreen':
      return 'Création de compte';
  }
}
