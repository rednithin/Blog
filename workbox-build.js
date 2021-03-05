const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild.generateSW({
    globDirectory: 'public',
    globPatterns: [
      '**/*.{html,json,js,css}',
    ],
    swDest: 'public/sw.js',
  });
};

buildSW();