import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import reportWebVitals from './reportWebVitals';

const stripePromise = loadStripe('pk_test_51KWNKZGwNfdBPd2u5rjKBQEumTMz4autphSwZEXqWSWLTbOKrBQFnRrx5WhlsRNPFpeainUAtuOvdr9P43xWJgCo00vuhs8OMN');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CheckoutElementsProvider stripe={stripePromise}>
        <App />
      </CheckoutElementsProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
