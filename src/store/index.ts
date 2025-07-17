import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/auth.slice';
import userReducer from './slice/user.slice';
import supportReducer from './slice/support.slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import Storage from '../utils/storage';
import rootSaga from './service/rootSaga';
import {logger} from 'redux-logger';

const createSagaMiddleware = require('redux-saga').default;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  support: supportReducer,
});

const persistConfig = {
  key: 'root',
  storage: Storage,
  whitelist: ['auth'],
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk middleware
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {store, persistor};
