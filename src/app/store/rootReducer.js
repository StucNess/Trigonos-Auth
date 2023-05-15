import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import { routesApi } from './RoutesRoles/routesApi';

const createReducer = (asyncReducers) => (state, action) => {
  
  const combinedReducer = combineReducers({
    [routesApi.reducerPath]: routesApi.reducer,
    fuse,
    i18n,
    user,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
