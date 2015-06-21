document.addEventListener('DOMContentLoaded', function() {
  if (!navigator.serviceWorker) {
    return;
  }

  // Register just if there is no other SW controlling this document
  navigator.serviceWorker.getRegistration().then(function(reg) {
    if (reg) {
      return;
    }
    console.log('Registering SW for url ' + document.location);
    var scope = document.location.href;
    if (scope.lastIndexOf("/") !== scope.length - 1) {
      scope = scope.substring(0, scope.lastIndexOf("/"));
    }
    console.log("Setting scope to " + scope);
    var p = navigator.serviceWorker.register('app://sw-enabler.desre.org/sw.js',
      { scope: scope });
    p.then(() => { console.log("Registration successful!"); },
           (e) => { console.log("Registration failed! " + e.message); });
    // On SW claim, reload to cache the start page
    navigator.serviceWorker.addEventListener('controllerchange', function(evt) {
      console.log('Controller change ::: ', evt);
      document.location.reload();
    });
  });
});