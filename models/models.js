import * as queries from '../queries/query';

export const appState = () => ({
  state: {
    accountCreated: false,
    countries: [],
  },
  reducers: {
    updateCountries(state, countries) {
      return {...state, countries: countries};
    },
    updateAccount(state, account) {
      return {...state, account: account};
    },
  },

  effects: dispatch => ({
    async loadCountries(payload, rootState) {
      await queries
        .fetchCountries()
        .then(result => dispatch.appState.updateCountries(result));
    },
    async connection(payload, rootState) {
      try {
        await queries.connection(payload).then(result => {
          console.log(result);
          dispatch.appState.updateAccount(result.response);
        });
      } catch (err) {
        console.log(err);
      }
    },
    async createAccount(payload, rootState) {
      try {
        await queries.createAccount(payload).then(result => {
          console.log(result);
          dispatch.appState.updateAccount(result);
        });
      } catch (err) {
        console.log(err);
      }
    },

    async addConstants(payload, rootState) {
      try {
        await queries.sendConstants(payload).then(result => {
          console.log(result);
          dispatch.appState.setLogin(result);
        });
      } catch (err) {
        console.log(err);
      }
    },
  }),
});
