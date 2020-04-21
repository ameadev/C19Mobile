import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';


import BottomTabNavigator from './BottomTabNavigator';
import {useTranslation} from "../hooks/useTranslation";
import MainScreen from "../screens/MainScreen";

const Stack = createStackNavigator();


export default function StackNavigator() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator >
            <Stack.Screen name={t('country_title')} component={MainScreen}/>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
        </Stack.Navigator>
    );
}
