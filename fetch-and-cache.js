(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var FetchAndCache = require('./lib/fetch-and-cache.js');

self.FetchAndCache = FetchAndCache;

},{"./lib/fetch-and-cache.js":2}],2:[function(require,module,exports){
/* global fetch, caches */
'use strict';

function FetchAndCache(cacheName) {
  this.cacheName = cacheName || 'offline';
}

FetchAndCache.prototype.onFetch = function onFetch(req) {
  var _that = this;
  return this.getCache().then(function() {
    return fetch(req).then(function(res) {
      // Catch just if it's a valid response (trivial check)
      var clone = res.clone();
      if (res.status < 400) {
        return _that.cache.put(req, res).then(function() {
          return clone;
        });
      } else {
        return res;
      }
    }).catch(function() {
      return _that.cache.match(req);
    });
  });
};

FetchAndCache.prototype.getCache = function getCache() {
  if (this.cache) {
    return Promise.resolve(this.cache);
  }

  var _that = this;
  return caches.open(this.cacheName).then(function(cache) {
    _that.cache = cache;
    return cache;
  });
};

FetchAndCache.prototype.version = '0.0.1';

module.exports = FetchAndCache;

},{}]},{},[1])


//# sourceMappingURL=fetch-and-cache.js.map