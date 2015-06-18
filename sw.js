console.log("Hello from sw.js!");

importScripts('app://sw-enabler.desre.org/sww.js');
importScripts('app://sw-enabler.desre.org/fetch-and-cache.js');

var worker = new ServiceWorkerWare();

worker.use({
  onActivate: function(evt) {
    evt.waitUntil(self.clients.claim());
  }
});

worker.use(new FetchAndCache());

worker.init();
