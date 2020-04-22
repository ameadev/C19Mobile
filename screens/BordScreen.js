//dependencies imports
import React, {useEffect} from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

//app imports
import C19Button from '../components/C19Button';
import C19Styles from '../constants/C19Styles';
import {useTranslation} from "../hooks/useTranslation";
import {useSelector} from "react-redux";

const image = {uri: "./assets/images/home_bg.png"};

export default function BordScreen() {
    const {t} = useTranslation();

    const isLogged = useSelector(state => state.account.isLogged);
    let inputPhoneNumber = "";

    function phoneTextInputChanged(text) {
        inputPhoneNumber = text;
        console.log(inputPhoneNumber);
    }

    function onPressConnectionButton() {
        console.log(inputPhoneNumber);
    }

    return (
        <View style={C19Styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <ScrollView style={C19Styles.container} contentContainerStyle={C19Styles.contentContainer}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder={t('phone_number')}
                            placeholderTextColor="#003f5c"
                            onChangeText={(text) => phoneTextInputChanged(text)}
                        />
                    </View>
                    <C19Button
                        text={isLogged ? t('disconnection') : t('btn_login_text')}
                        handlePress={() => onPressConnectionButton()}
                    />
                    {isLogged ? null
                        : <Text style={styles.initText}> {t('dashboard_init_text')}</Text>
                    }
                </ScrollView>
            </ImageBackground>

        </View>
    );
}

BordScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    inputView: {
        flex: 1,
        backgroundColor: "#465881",
        borderRadius: 10,
        height: 50,
        marginBottom: 20,
        marginHorizontal: 20,
        justifyContent: "center",
        padding: 20,
        fontFamily: 'dax-regular'
    },
    inputText: {
        height: 50,
        color: "white",
        fontFamily: 'dax-regular'
    },
    initText: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 20,
        fontFamily: 'dax-regular',
    }

});
