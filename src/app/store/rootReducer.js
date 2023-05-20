import { combineReducers } from '@reduxjs/toolkit';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';
import { routesApi } from './RoutesRoles/routesApi';
import { instruccionesApi } from './instrucciones/instruccionesApi';
import { participantesApi } from './participantesApi/participantesApi';
import { usuariosApi } from './usuariosApi/usuariosApi';

const createReducer = (asyncReducers) => (state, action) => {
  
  const combinedReducer = combineReducers({
    [routesApi.reducerPath]: routesApi.reducer,
    [instruccionesApi.reducerPath]: instruccionesApi.reducer,
    [participantesApi.reducerPath]: participantesApi.reducer,
    [usuariosApi.reducerPath]: usuariosApi.reducer,
    
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
