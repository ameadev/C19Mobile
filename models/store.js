import {init} from '@rematch/core';
import {AppState} from './models';


export const initModels = () => {
    return {
        appState: AppState(),
    };
};

export const initStore = () =>
  init({
    models: initModels()
  });
