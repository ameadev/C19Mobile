import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import C19Styles from '../constants/C19Styles';

export default function C19Button(props) {
  return (
    <TouchableOpacity onPress={props.handlePress} style={C19Styles.button}>
        <Text style={C19Styles.buttonText}>{props.text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}