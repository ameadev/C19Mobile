import {init} from '@rematch/core';
import * as models from './models';

export const initStore = () =>
  init({
    models,
  });
