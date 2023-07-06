import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleProvider } from '@ant-design/cssinjs';
import './index.scss';
import App from './app/App';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import theme from './libs/antd/Theme';
import { store } from './state/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider hashPriority='high'>
      <ConfigProvider locale={viVN} theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>
);
