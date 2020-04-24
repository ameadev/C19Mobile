//dependencies imports
import React, {useEffect, useState} from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PureChart from 'react-native-pure-chart';
//import {LineChart} from 'react-native-charts-wrapper';
import moment from "moment";

//app imports
import C19Button from '../components/C19Button';
import C19Styles from '../constants/C19Styles';
import {useTranslation} from "../hooks/useTranslation";
import {useSelector} from "react-redux";
import useRematchDispatch from "../hooks/useRematchDispatch";

const image = {uri: "./assets/images/home_bg.png"};

export default function BordScreen() {
    const {t} = useTranslation();
    const {connection, logout, loadCurrentAccount} = useRematchDispatch(dispatch => ({
        connection: dispatch.account.connection,
        logout: dispatch.account.logout,
        loadCurrentAccount: dispatch.account.loadCurrentAccount,
    }));
    const isLoading = useSelector(state => state.account.isLoading);
    const isLogged = useSelector(state => state.account.isLogged);
    const currentAccount = useSelector(state => state.account.currentAccount);
    const currentCountry = useSelector(state => state.location.currentCountry);

    const [phoneNumber, setPhoneNumber] = useState();
    const [graphData, setGraphData] = useState();

    useEffect(() => {
        loadCurrentAccount();
    }, [])

    useEffect(() => {
        if (currentAccount === null) {
            return;
        }
        let data = [];
        currentAccount.daily_information.some((v, i) => {
            if (i === 5) {
                return true;
            }
            let x = moment(v.date_time).format(t('graph_date_format'));
            let y = v.temperature;
            data.push({x, y});
        });
        let values = data.reverse();
        //let dataSet = [{"values": values}];
        setGraphData(values);
    }, [currentAccount]);

    const buttonText = () => {
        if (isLoading === true) {
            return "...";
        }
        return isLogged ? t('disconnection') : t('btn_login_text')
    };

    function onPressConnectionButton() {
        if (isLogged === true) {
            logout();
            return;
        }
        let input = currentCountry.id + phoneNumber;
        connection({"phone_number": input})
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
                            onChangeText={(text) => setPhoneNumber(text)}
                        />
                    </View>
                    <C19Button
                        text={buttonText()}
                        handlePress={() => onPressConnectionButton()}
                    />
                    {isLogged ? null
                        : <Text style={styles.initText}> {t('dashboard_init_text')}</Text>
                    }
                    <View style={styles.graph}>
                        {graphData ?
                            <PureChart type={'line'}
                                       data={graphData}
                                       height={300}
                                       minValue={10}
                                       numberOfYAxisGuideLine={5}
                                       showEvenNumberXaxisLabel={false}
                                       customValueRenderer={(index, point) => {
                                           return (
                                               <Text style={{textAlign: 'center'}}>{point.y}</Text>
                                           )
                                       }}
                            />
                            : null}
                    </View>
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
    },
    graph: {
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 20,
        marginVertical: 20,
        fontFamily: 'dax-regular',
    }

});
