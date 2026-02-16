self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("catdog-pwa").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./app.js",
        "./manifest.json"
      ]);
    })
  );
});