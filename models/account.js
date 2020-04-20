import {createModel} from "@rematch/core";

import * as queries from '../queries/query';



export const Account = () =>
    createModel({
  state: {
    accountCreated: false,
    constantSent: false,
  },
  reducers: {
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

    async connection(payload, rootState) {
      try {
        await queries.connection(payload).then(result => {
          dispatch.account.updateAccount(result.data);
        });
      } catch (err) {
        console.log(err);
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
