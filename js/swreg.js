/** Checking Service Worker **/

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../js/sw.js').then(function(registration) {
    console.log('SW registration ok:', registration);

  }).catch(function(error) {
    console.log('SW registration failed:', error);
  });
} 