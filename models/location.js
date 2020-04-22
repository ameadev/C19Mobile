import {createModel} from "@rematch/core";
import {AsyncStorage} from 'react-native';

import * as queries from '../queries/query';


export const Location = () =>
    createModel({
        state: {
            countries: {},
            currentCountry: null,
        },
        reducers: {
            setCountries(state, countries) {
                return {...state, countries: countries};
            },
            setCurrentCountry(state, country) {
                return {...state, currentCountry: country};
            },
        },

        effects: dispatch => ({
            async loadCurrentCountry(payload, rootState) {
                try {
                    await AsyncStorage.getItem('country').then(value => {
                            dispatch.location.setCurrentCountry(JSON.parse(value));
                        }
                    );
                } catch (error) {
                    return null
                }
            },
            async loadCountries(payload, rootState) {
                try {
                    await queries
                        .fetchCountries()
                        .then(result => dispatch.location.setCountries(result.data.response))
                        .catch(err => console.log(err));
                } catch (err) {
                    console.log(err);
                }
            },

            async saveCountry(country, rootState) {
                try {
                    await AsyncStorage.setItem('country', JSON.stringify(country), () => {
                        dispatch.location.setCurrentCountry(country);
                    });
                } catch (error) {
                    // Error saving data
                }
            },
        }),
    });
