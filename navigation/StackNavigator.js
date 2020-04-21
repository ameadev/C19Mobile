//core imports
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";
//App imports
import BottomTabNavigator from './BottomTabNavigator';
import {useTranslation} from "../hooks/useTranslation";
import MainScreen from "../screens/MainScreen";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const currentCountry = useSelector(state => state.location.currentCountry);
    const { t } = useTranslation();

    return (
        currentCountry ?
            <Stack.Navigator >
                <Stack.Screen name="Root" component={BottomTabNavigator}/>
            </Stack.Navigator>
            :
            <Stack.Navigator >
            <Stack.Screen name={t('country_title')} component={MainScreen}/>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
        </Stack.Navigator>
    );
}
