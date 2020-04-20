import {createModel} from "@rematch/core";
import {AsyncStorage} from 'react-native';

import * as queries from '../queries/query';



export const Location = () =>
    createModel({
  state: {
    countries: {},
  },
  reducers: {
    updateCountries(state, countries) {
      return {...state, countries: countries};
    },
    setCurrentCountry(state, country) {
      return {...state, currentCountry: country};
    },
  },

  effects: dispatch => ({
    async loadCurrentCounty(payload, rootState){
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
      await queries
        .fetchCountries()
        .then(result => dispatch.location.updateCountries(result.data.response));
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
