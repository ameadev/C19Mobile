import  React, {useEffect} from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import C19Button from '../components/C19Button';
import C19Styles from '../constants/C19Styles';

import useRematchDispatch from "../hooks/useRematchDispatch";


export default function ContactScreen() {

    return (
      <View style={C19Styles.container}>
        <ScrollView style={C19Styles.container} contentContainerStyle={C19Styles.contentContainer}>
        </ScrollView>

      </View>
    );
  }

  ContactScreen.navigationOptions = {
    header: null,
  };