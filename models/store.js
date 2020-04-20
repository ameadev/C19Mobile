import {init} from '@rematch/core';
import {Account} from './account';
import {Location} from './location';


export const initModels = () => {
    return {
        location: Location(),
        account: Account(),
    };
};

export const initStore = () =>
  init({
    models: initModels()
  });
