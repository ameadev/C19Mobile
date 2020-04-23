//dependencies imports
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements'
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from "react-redux";

//app imports
import useRematchDispatch from "../hooks/useRematchDispatch";
import {useTranslation} from "../hooks/useTranslation";

export default function MainScreen({navigation}) {
    const {t} = useTranslation();
    const {loadCountries, saveCountry, loadCurrentCountry} = useRematchDispatch(dispatch => ({
        loadCurrentCountry: dispatch.location.loadCurrentCountry,
        loadCountries: dispatch.location.loadCountries,
        saveCountry: dispatch.location.saveCountry,
    }));
    const countries = useSelector(state => state.location.countries);
    const currentCountry = useSelector(state => state.location.currentCountry);

    useEffect(() => {

        loadCurrentCountry();
    }, []);

    useEffect(() => {
        if (currentCountry === null) {
            loadCountries();
        } else {
            navigation.navigate("Root");
        }

    }, [currentCountry]);

    const keyExtractor = (item, index) => index.toString();

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => {
            onPressItem({item})
        }}>
            <ListItem
                title={item.name}
                leftAvatar={{source: {uri: `https://www.countryflags.io/${item.iso_code}/flat/64.png`}}}
                bottomDivider
                chevron
            />
        </TouchableOpacity>
    );

    const onPressItem = ({item}) => {
        saveCountry(item);
        navigation.navigate("Root");
    };

    return (
        <FlatList style={styles.container} contentContainerStyle={styles.contentContainer}
                  data={countries}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                  ListEmptyComponent={null}
        />
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});
