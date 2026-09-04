const CACHE_PREFIX = "password-tea-shell-";
const CACHE_NAME = `${CACHE_PREFIX}v2`;

const APP_SHELL = [
    "./",
    "./index.html",
    "./manifest.json",
    "./favicon.ico",
    "./styles/global.css?v=1.0.0",
    "./images/PasswordTeaBackdrop.svg",
    "./images/PasswordTeaIcon.svg",
    "./images/PasswordTeaIcon-192.png",
    "./images/PasswordTeaIcon-512.png",
    "./images/PasswordTeaIcon-maskable-512.png",
    "./svgs/Add_White.svg",
    "./svgs/CheckboxOff_Blue.svg",
    "./svgs/CheckboxOn_Blue.svg",
    "./svgs/ClearStorage_White.svg",
    "./svgs/Delete_Red.svg",
    "./svgs/FileCopy_White.svg",
    "./svgs/Logout_White.svg",
    "./svgs/Settings_Blue.svg",
    "./svgs/ShowOff_White.svg",
    "./svgs/ShowOn_White.svg",
    "./scripts/Utils/Utility.js",
    "./scripts/Utils/ImportExportDialogUtility.js",
    "./scripts/Utils/StringUtility.js",
    "./scripts/Utils/RandomUtility.js",
    "./scripts/Utils/js-sha3/sha3.js",
    "./scripts/Utils/PasswordKdf.js",
    "./scripts/Utils/MYUID.js",
    "./scripts/Data/Charset.js",
    "./scripts/Data/RawPassword.js",
    "./scripts/Data/User.js",
    "./scripts/Generator.js",
    "./scripts/Controllers/MasterPasswordController.js",
    "./scripts/Controllers/SelectRawPasswordController.js",
    "./scripts/Controllers/EditPasswordController.js",
    "./scripts/Controllers/EditCharsetController.js",
    "./scripts/Controllers/Elements/RawPasswordElementController.js",
    "./scripts/Controllers/Elements/CharsetElementController.js",
    "./scripts/Views/ViewBase.js",
    "./scripts/Views/Elements/CharsetElementView.js",
    "./scripts/Views/Elements/RawPasswordElementView.js",
    "./scripts/Views/Screens/MasterPasswordScreenView.js",
    "./scripts/Views/Screens/SelectScreenView.js",
    "./scripts/Views/Screens/EditPasswordScreenView.js",
    "./scripts/Views/Screens/EditCharsetScreenView.js",
    "./scripts/Root.js"
];

self.addEventListener("install", event =>
{
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event =>
{
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(cacheName => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event =>
{
    if(event.request.method !== "GET")
    {
        return;
    }

    const requestUrl = new URL(event.request.url);
    if(requestUrl.origin !== self.location.origin)
    {
        return;
    }

    event.respondWith(FetchWithOfflineFallback(event));
});

async function FetchWithOfflineFallback(event)
{
    const cache = await caches.open(CACHE_NAME);

    try
    {
        const response = await fetch(event.request);

        if(response.ok)
        {
            event.waitUntil(cache.put(event.request, response.clone()));
        }

        return response;
    }
    catch(error)
    {
        const cachedResponse = await caches.match(event.request, { ignoreSearch: true });
        if(cachedResponse)
        {
            return cachedResponse;
        }

        if(event.request.mode === "navigate")
        {
            const cachedIndex = await cache.match("./index.html");
            if(cachedIndex)
            {
                return cachedIndex;
            }
        }

        throw error;
    }
}
