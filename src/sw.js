var version = 3
var cacheName = `praveengopi19-${version}`

var isOnline = true

var toBeCached = [
    '/media/Hack-Regular.woff',
    '/media/Inter-SemiBold.woff2',
    '/media/Inter-Medium.woff2',
    '/media/Inter-Bold.woff2',
    '/media/errorboun.svg',
    '/offline.html'
]

self.addEventListener('install', function (event) {
    // console.log("Sw installed...")
    event.waitUntil(hadleActivation())
    self.skipWaiting()
})

self.addEventListener('activate', async function (event) {
    await clearCaches()
    await clients.claim()
})


self.addEventListener('message', onSwMessage)

self.addEventListener('fetch', function (event) {
    event.respondWith(router(event.request))
})


main()


async function hadleActivation() {

    //console.log("sw activated..")
    await cacheFiles()

}

async function main() {
    await sendMsgtoClients({ requestStatusUpdate: true })
}

async function sendMsgtoClients(msg) {
    const swClient = await clients.matchAll()
    return Promise.all(swClient.map(function (client) {
        var msgChannel = new MessageChannel()
        msgChannel.port1.onmessage = onSwMessage
        return client.postMessage(msg, [msgChannel.port2])
    }))
}

function onSwMessage({ data }) {

    if ('statusUpdate' in data) {
        isOnline = data.statusUpdate.isOnline

    }
}


async function clearCaches() {
    let cacheNames = await caches.keys()
    let oldCacheNames = cacheNames.filter(function (cachename) {
        var [, cacheVersion] = cachename.match(/^praveengopi19-(\d+)$/) || []
        cacheVersion = cacheVersion != null && Number(cacheVersion)
        return cacheVersion && cacheVersion != version
    })

    Promise.all(
        oldCacheNames.map(function (oldcache) {
            return caches.delete(oldcache)
        })
    )

}

async function cacheFiles() {
    let cacheToBe = await caches.open(cacheName)

    toBeCached.map(async function (file) {
        var response = await fetch(file, {
            method: "GET",
            cache: "no-store",
            credentials: "omit"
        })

        if (response && response.ok) {
            await cacheToBe.put(file, response)
        }
    })

}


async function router(req) {
    var url = new URL(req.url)
    var reqURL = url.pathname
    var cache = await caches.open(cacheName)

    if (url.origin == location.origin) {

        let res = await cache.match(reqURL) //check cache

        if (res) {
            return res   //if yes return it plz
        }


        if (!isOnline) {
            //  console.log("No internet")
            let html = await cache.match('/offline.html')
            return html
        }

        if (0 && req.headers.get("Accept").includes("text/html")) {

            res = await fetch(req, {
                method: req.method,
                headers: req.headers,
                credentials: "same-origin",
                redirect: 'manual'
            })

            //console.log(res.status, res.type, reqURL)

            if (res && (res.ok || res.status == 404 || res.type === 'opaqueredirect')) {
                return res
            }


        } else {
            try {
                //reqUrl since origin is same
                res = await fetch(req, {
                    method: req.method,
                    headers: req.headers,
                    credentials: "same-origin",
                    cache: 'no-cache',
                    redirect: req.redirect
                })

                //console.log(res.status, res.type, reqURL, "from non html")

                if (res && (res.ok || res.status == 404 || res.type === 'opaqueredirect')) {
                    return res
                }
            }
            catch (e) {
                console.log(e)
            }
        }


        let html = await cache.match('/offline.html')
        return html

    }
    else {
        let res = await fetch(req)
        return res
    }
}