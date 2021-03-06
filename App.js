import React, {Component} from 'react';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import rootReducer from './src/reducers';
import rootSaga from './src/sagas';
import RootContainer from './src/Root/RootContainer.Screen';
import 'react-native-gesture-handler';
import { ActivityIndicator, View } from "react-native";
import ApplicationStyle from './src/Themes/Application.Style';


const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export class RenderLoading extends Component {
  render(){
    return (
      <View style={ApplicationStyle.loading}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    )
  }
  
}

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<RenderLoading />} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    );
  }
}
