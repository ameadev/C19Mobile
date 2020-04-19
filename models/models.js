import {createModel} from "@rematch/core";

import * as queries from '../queries/query';

export const AppState = () =>
    createModel({
  state: {
    accountCreated: false,
    constantSent: false,
    countries: [],
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
  },

  effects: dispatch => ({
    async loadCountries(payload, rootState) {
      await queries
        .fetchCountries()
        .then(result => dispatch.appState.updateCountries(result.data));
    },
    async connection(payload, rootState) {
      try {
        await queries.connection(payload).then(result => {
          console.log(result);
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
