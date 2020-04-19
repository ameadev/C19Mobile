import {createModel} from "@rematch/core";
import {AsyncStorage} from 'react-native';

import * as queries from '../queries/query';



export const AppState = () =>
    createModel({
  state: {
    accountCreated: false,
    constantSent: false,
    countries: {},
  },
  reducers: {
    updateCountries(state, countries) {
      return {...state, countries: countries};
    },
    updateAccount(state, account) {
      return {...state, account: account};
    },
    setCreationStatus(state, status) {
      return {...state, accountCreated: status};
    },
    setSendingStatus(state, status) {
      return {...state, constantSent: status};
    },
    setCurrentCountry(state, country) {
      return {...state, currentCountry: country};
    },
  },

  effects: dispatch => ({
    async loadCurrentCounty(payload, rootState){
      try {
        await AsyncStorage.getItem('country').then(value => {
          dispatch.appState.setCurrentCountry(JSON.parse(value));
        }
        );
      } catch (error) {
        return null
      }
    },
    async loadCountries(payload, rootState) {
      await queries
        .fetchCountries()
        .then(result => dispatch.appState.updateCountries(result.data.response));
    },

    async saveCountry(country, rootState) {
      try {
        await AsyncStorage.setItem('country', JSON.stringify(country), () => {
          dispatch.appState.setCurrentCountry(country);
        });
      } catch (error) {
        // Error saving data
      }
    },

    async connection(payload, rootState) {
      try {
        await queries.connection(payload).then(result => {
          dispatch.appState.updateAccount(result.data);
        });
      } catch (err) {
        console.log(err);
      }
    },

    async createAccount(payload, rootState) {
      try {
        await queries.createAccount(payload).then(result => {
          dispatch.appState.setCreationStatus(result.data.ID !== "");
        });
      } catch (err) {
        console.log(err);
      }
    },

    async addConstants(payload, rootState) {
      try {
        await queries.sendConstants(payload).then(result => {
          dispatch.appState.setSendingStatus(result.data.ID !== "");
        });
      } catch (err) {
        console.log(err);
      }
    },
  }),
});
