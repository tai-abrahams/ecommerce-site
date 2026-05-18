import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.js';
//import Loading from './components/loading/Loading.js'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <ThemeProvider  theme={theme} >
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </ PersistGate>
  </Provider>,
  document.getElementById('root')
);
