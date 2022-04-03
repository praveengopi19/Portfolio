const version = 5;
const cacheName = `praveengopi19-${version}`;

let isOnline = true;

const toBeCached = [
  '/media/errorboun.svg',
  '/offline.html',
];

self.addEventListener('install', (event) => {
  // console.log("Sw installed...")
  event.waitUntil(hadleActivation());
  self.skipWaiting();
});

self.addEventListener('activate', async (event) => {
  await clearCaches();
  await clients.claim();
});

self.addEventListener('message', onSwMessage);

self.addEventListener('fetch', (event) => {
  event.respondWith(router(event.request));
});

main();

async function hadleActivation() {
  // console.log("sw activated..")
  await cacheFiles();
}

async function main() {
  await sendMsgtoClients({ requestStatusUpdate: true });
}

async function sendMsgtoClients(msg) {
  const swClient = await clients.matchAll();
  return Promise.all(swClient.map((client) => {
    const msgChannel = new MessageChannel();
    msgChannel.port1.onmessage = onSwMessage;
    return client.postMessage(msg, [msgChannel.port2]);
  }));
}

function onSwMessage({ data }) {
  if ('statusUpdate' in data) {
    isOnline = data.statusUpdate.isOnline;
  }
}

async function clearCaches() {
  const cacheNames = await caches.keys();
  const oldCacheNames = cacheNames.filter((cachename) => {
    let [, cacheVersion] = cachename.match(/^praveengopi19-(\d+)$/) || [];
    cacheVersion = cacheVersion != null && Number(cacheVersion);
    return cacheVersion && cacheVersion != version;
  });

  Promise.all(
    oldCacheNames.map((oldcache) => caches.delete(oldcache)),
  );
}

async function cacheFiles() {
  const cacheToBe = await caches.open(cacheName);

  toBeCached.map(async (file) => {
    const response = await fetch(file, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'omit',
    });

    if (response && response.ok) {
      await cacheToBe.put(file, response);
    }
  });
}

async function router(req) {
  const url = new URL(req.url);
  const reqURL = url.pathname;
  const cache = await caches.open(cacheName);

  if (url.origin == location.origin) {
    let res = await cache.match(reqURL); // check cache

    if (res) {
      return res; // if yes return it plz
    }
    if (reqURL.match('woff')) {
      try {
        const response = await fetch(reqURL, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'omit',
        });

        if (response && response.ok) {
          await cache.put(reqURL, response.clone());
          return response;
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (!isOnline) {
      //  console.log("No internet")
      const html = await cache.match('/offline.html');
      return html;
    }

    if (0 && req.headers.get('Accept').includes('text/html')) {
      res = await fetch(req, {
        method: req.method,
        headers: req.headers,
        credentials: 'same-origin',
        redirect: 'manual',
      });

      // console.log(res.status, res.type, reqURL)

      if (res && (res.ok || res.status == 404 || res.type === 'opaqueredirect')) {
        return res;
      }
    } else {
      try {
        // reqUrl since origin is same
        res = await fetch(req, {
          method: req.method,
          headers: req.headers,
          credentials: 'same-origin',
          cache: 'no-cache',
          redirect: req.redirect,
        });

        // console.log(res.status, res.type, reqURL, "from non html")

        if (res && (res.ok || res.status == 404 || res.type === 'opaqueredirect')) {
          return res;
        }
      } catch (e) {
        console.log(e);
      }
    }

    const html = await cache.match('/offline.html');
    return html;
  }

  const res = await fetch(req);
  return res;
}
