import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import storageSession from 'redux-persist/lib/storage/session'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, createStore } from 'redux';
import reducer from './store/reducers/calcReducers'

const allReducers = combineReducers({
  calc: reducer
})

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = createStore(persistedReducer)

const persistor = persistStore(store)


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
