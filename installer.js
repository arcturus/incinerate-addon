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
    navigator.serviceWorker.register('sw.js');
    // On SW claim, reload to cache the start page
    navigator.serviceWorker.addEventListener('controllerchange', function(evt) {
      console.log('Controller change ::: ', evt);
      document.location.reload();
    });
  });
});