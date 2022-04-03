import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

// Router

// {import '!!file-loader?name=./manifest.json!../public/manifest.json'
// import '!!file-loader?name=./icon-192x192.png!../public/icon-192x192.png'
// import '!!file-loader?name=./icon-256x256.png!../public/icon-256x256.png'
// import '!!file-loader?name=./icon-384x384.png!../public/icon-384x384.png'
// import '!!file-loader?name=./icon-512x512.png!../public/icon-512x512.png'

// import '!!file-loader?name=./offline.html!../public/offline.html'

// import 'file-loader?name=./sw.js!./sw.js'

// import '!!file-loader?name=./pk.svg!../public/pk.svg'
// import '!!file-loader?name=./ogcmd.png!../public/ogcmd.png'

// import worker from "worker-loader!./sw.js"}

import worker from './sw.js';

// create centralised store

ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);

let isOnline = ('onLine' in navigator) && navigator.onLine;

if ('serviceWorker' in navigator) {
  var svcWorker;
  var svcResgisteration;

  window.addEventListener('online', () => {
    isOnline = true;
    sendStatusUpdate();
  });

  window.addEventListener('offline', () => {
    isOnline = false;
    sendStatusUpdate();
  });

  swInit().catch(console.error());
}

async function swInit() {
  svcResgisteration = await navigator.serviceWorker.register('./sw.js', {
    updateViaCache: 'none',
  });

  svcWorker = svcResgisteration.installing || svcResgisteration.waiting || svcResgisteration.active;
  sendStatusUpdate(svcWorker);
  console.log("Hi from praveengopi19.github.io's service worker");

  navigator.serviceWorker.addEventListener('controllerchange', (event) => {
    svcWorker = navigator.serviceWorker.controller;
    sendStatusUpdate(svcWorker);
  });

  navigator.serviceWorker.addEventListener('message', onMessage);
}

async function onMessage(event) {
  const { data } = event;

  if (data.requestStatusUpdate) {
    sendStatusUpdate(event.ports && event.ports[0]);
  }
}

async function sendStatusUpdate(target) {
  sendMsgtoSW({ statusUpdate: { isOnline } }, target);
}

async function sendMsgtoSW(msg, target) {
  if (target) {
    target.postMessage(msg);
  } else if (svcWorker) {
    svcWorker.postMessage(msg);
  } else {
    navigator.serviceWorker.controller.postMessage(msg);
  }
}
