import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

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
  let svcWorker;
  let svcResgisteration;

  const sendMsgtoSW = async (msg, target) => {
    if (target) {
      target.postMessage(msg);
    } else if (svcWorker) {
      svcWorker.postMessage(msg);
    } else {
      navigator.serviceWorker.controller.postMessage(msg);
    }
  };

  const sendStatusUpdate = async (target) => {
    sendMsgtoSW({ statusUpdate: { isOnline } }, target);
  };

  const onMessage = async (event) => {
    const { data } = event;

    if (data.requestStatusUpdate) {
      sendStatusUpdate(event.ports && event.ports[0]);
    }
  };

  const swInit = async () => {
    svcResgisteration = await navigator.serviceWorker.register('./sw.js', {
      updateViaCache: 'none',
    });

    svcWorker = svcResgisteration.installing || svcResgisteration.waiting
     || svcResgisteration.active;

    sendStatusUpdate(svcWorker);
    console.log("Hi from praveengopi19.github.io's service worker");

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      svcWorker = navigator.serviceWorker.controller;
      sendStatusUpdate(svcWorker);
    });

    navigator.serviceWorker.addEventListener('message', onMessage);
  };

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

// Polyfill for Array.prototype.at
if (!Array.prototype.at) {
  function at(n) {
    // ToInteger() abstract op
    n = Math.trunc(n) || 0;
    // Allow negative indexing from the end
    if (n < 0) n += this.length;
    // OOB access is guaranteed to return undefined
    if (n < 0 || n >= this.length) return undefined;
    // Otherwise, this is just normal property access
    return this[n];
  }

  const TypedArray = Reflect.getPrototypeOf(Int8Array);
  for (const C of [Array, String, TypedArray]) {
    Object.defineProperty(
      C.prototype,
      'at',
      {
        value: at,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    );
  }
}
