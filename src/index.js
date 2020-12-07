//import 'react-app-polyfill/ie11';
//import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import App from './App';


//Router
import { HashRouter as Router } from 'react-router-dom';

//reducer
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { configReducer } from './Redux/Reducers/configReducer';

import '!!file-loader?name=./manifest.json!../public/manifest.json'
import '!!file-loader?name=./icon-192x192.png!../public/icon-192x192.png'
import '!!file-loader?name=./icon-256x256.png!../public/icon-256x256.png'
import '!!file-loader?name=./icon-384x384.png!../public/icon-384x384.png'
import '!!file-loader?name=./icon-512x512.png!../public/icon-512x512.png'

import '!!file-loader?name=./sw.js!./sw.js'

import '!!file-loader?name=./pk.svg!../public/pk.svg'


//create centralised store
const store = createStore(configReducer, {}, applyMiddleware());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


if ('serviceWorker' in navigator) {
  swInit().catch(console.error)
}

async function swInit() {
  await navigator.serviceWorker.register('./sw.js', {
    updateViaCache: "none"
  })
}
