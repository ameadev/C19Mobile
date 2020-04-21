//dependencies imports
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//app imports
import TabBarIcon from '../components/TabBarIcon';
import BordScreen from '../screens/BordScreen';
import HistoryScreen from '../screens/HistoryScreen';
import InfoScreen from '../screens/InfoScreen';
import ContactScreen from '../screens/ContactScreen';

import {useTranslation} from "../hooks/useTranslation";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'BordScreen';

export default function BottomTabNavigator({ navigation, route }) {
    const { t } = useTranslation();

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="BordScreen"
        component={BordScreen}
        options={{
          title: t('title_dashboard'),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-analytics" />,
        }}
      />
      <BottomTab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: t('title_history'),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clock" />,
        }}
      />
      <BottomTab.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          title: t('title_info'),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-information-circle" />,
        }}
      />
      <BottomTab.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: t('title_creation'),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person-add" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    const { t } = useTranslation();

  switch (routeName) {
    case 'BordScreen':
      return t('label_dashboard');
    case 'HistoryScreen':
      return t('label_history');
    case 'InfoScreen':
      return t('label_info');
    case 'ContactScreen':
      return t('label_creation');
  }
}
