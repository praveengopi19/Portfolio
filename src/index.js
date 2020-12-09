import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
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

import '!!file-loader?name=./offline.html!../public/offline.html'

//import 'file-loader?name=./sw.js!./sw.js'

import '!!file-loader?name=./pk.svg!../public/pk.svg'

//import worker from "worker-loader!./sw.js"

import worker from "./sw.js"

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

var isOnline = ('onLine' in navigator) && navigator.onLine


if ('serviceWorker' in navigator) {
  var svcWorker
  var svcResgisteration

  window.addEventListener('online', function () {
    isOnline = true
    sendStatusUpdate()
  })

  window.addEventListener('offline', function () {
    isOnline = false
    sendStatusUpdate()
  })


  swInit().catch(console.error())
}

async function swInit() {
  svcResgisteration = await navigator.serviceWorker.register('./sw.js', {
    updateViaCache: "none"
  })

  svcWorker = svcResgisteration.installing || svcResgisteration.waiting || svcResgisteration.active
  sendStatusUpdate(svcWorker)
  console.log("Hi from praveengopi19.github.io's service worker")

  navigator.serviceWorker.addEventListener('controllerchange', function onControllerChange(event) {
    svcWorker = navigator.serviceWorker.controller
    sendStatusUpdate(svcWorker)
  })

  navigator.serviceWorker.addEventListener('message', onMessage)
}

async function onMessage(event) {
  const { data } = event

  if (data.requestStatusUpdate) {
    sendStatusUpdate(event.ports && event.ports[0])
  }

}

async function sendStatusUpdate(target) {
  sendMsgtoSW({ statusUpdate: { isOnline } }, target)
}

async function sendMsgtoSW(msg, target) {
  if (target) {
    target.postMessage(msg)
  }
  else if (svcWorker) {
    svcWorker.postMessage(msg)
  }
  else {
    navigator.serviceWorker.controller.postMessage(msg)
  }
}
