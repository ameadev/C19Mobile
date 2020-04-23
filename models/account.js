import {createModel} from "@rematch/core";

import * as queries from '../queries/query';
import {AsyncStorage} from "react-native";

export const Account = () =>
    createModel({
  state: {
    accountCreated: false,
    constantSent: false,
    currentAccount: null,
    isLogged: false,
    isLoading: false,
  },
  reducers: {
    login(state, account) {
      return {...state, currentAccount: account, isLogged: true, isLoading: false};
    },
    setLoading(state) {
      return {...state, isLoading: true};
    },
    setCreationStatus(state, status) {
      return {...state, accountCreated: status};
    },
    setSendingStatus(state, status) {
      return {...state, constantSent: status};
    },
    setLogout(state) {
      return {...state, currentAccount: null, isLogged: false};
    },
  },

  effects: dispatch => ({
    async connection(payload, rootState) {
      dispatch.account.setLoading();
      try {
        await queries.connection(payload).then(result => {
          let res = result.response;
         if (res.id !== "" && res.phone_number === payload.phone_number) {
           try {
              AsyncStorage.setItem('phoneNumber', payload.phone_number, () => {
                dispatch.account.login(res);
              });
           } catch (error) {
             return null
           }
         }
        });
      } catch (err) {
        console.log(err);
      }
    },

    async logout(payload, rootState) {
      try {
        await AsyncStorage.removeItem('phoneNumber');
              dispatch.account.setLogout();
      } catch (error) {
        return null
      }
    },

    async createAccount(payload, rootState) {
      try {
        await queries.createAccount(payload).then(result => {
          dispatch.account.setCreationStatus(result.data.ID !== "");
        });
      } catch (err) {
        console.log(err);
      }
    },

    async addConstants(payload, rootState) {
      try {
        await queries.sendConstants(payload).then(result => {
          dispatch.account.setSendingStatus(result.data.ID !== "");
        });
      } catch (err) {
        console.log(err);
      }
    },
  }),
});