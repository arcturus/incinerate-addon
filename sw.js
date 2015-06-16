importScripts('sww.js');
importScripts('fetch-and-cache.js');

var worker = new ServiceWorkerWare();

worker.use({
  onActivate: function(evt) {
    evt.waitUntil(self.clients.claim());
  }
});

worker.use(new FetchAndCache());

worker.init();