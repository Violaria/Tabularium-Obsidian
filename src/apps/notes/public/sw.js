// Service worker of the web notes page: keeps the page and its bundle available without a network.
// The API and synchronisation requests are never cached.
const CACHE = "tabularium-notes-v1";
const PAGE = "/notes/";

async function cachePage() {
    const cache = await caches.open(CACHE);
    const response = await fetch(PAGE, { cache: "no-store" });
    if (!response.ok) return;
    const html = await response.clone().text();
    await cache.put(PAGE, response);
    const assets = [...html.matchAll(/(?:src|href)="(\/notes\/assets\/[^"]+)"/g)].map((match) => match[1]);
    await cache.addAll(assets);
    // Drop assets of earlier builds.
    const keep = new Set([PAGE, ...assets].map((path) => new URL(path, self.location.origin).href));
    for (const request of await cache.keys()) if (!keep.has(request.url) && !request.url.includes("/notes/assets/index.browser")) await cache.delete(request);
}

self.addEventListener("install", (event) => {
    event.waitUntil(cachePage().then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (event.request.method !== "GET" || url.origin !== self.location.origin || !url.pathname.startsWith("/notes/")) return;
    if (url.pathname.startsWith("/notes/assets/")) {
        // Hashed file names: a cached copy is always current.
        event.respondWith(
            caches.match(event.request).then(
                (cached) =>
                    cached ??
                    fetch(event.request).then(async (response) => {
                        if (response.ok) await (await caches.open(CACHE)).put(event.request, response.clone());
                        return response;
                    })
            )
        );
        return;
    }
    if (url.pathname === PAGE || url.pathname === "/notes/index.html") {
        // The page: from the network when possible, so that a new release is picked up, otherwise from the cache.
        event.respondWith(
            fetch(event.request)
                .then(async (response) => {
                    if (response.ok) {
                        await (await caches.open(CACHE)).put(PAGE, response.clone());
                        void cachePage();
                    }
                    return response;
                })
                .catch(async () => (await caches.match(PAGE)) ?? Response.error())
        );
    }
});
