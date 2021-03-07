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

    // Define runtime caching rules.
    runtimeCaching: [{
      // Match any request that ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

      // Apply a stale-while-revalidate strategy.
      handler: 'StaleWhileRevalidate',

      options: {
        // Use a custom cache name.
        cacheName: 'images',

        // Only cache 10 images.
        expiration: {
          maxEntries: 20,
        },
      },
    },{
      urlPattern: /\.(?:woff|woff2|ttf|eot)$/,

      // Apply a cache-first strategy.
      handler: 'CacheFirst',

      options: {
        // Use a custom cache name.
        cacheName: 'fonts',

        // Only cache 20 fonts.
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7* 24 * 60 * 60
        },
      },
    }
  ],
  });
};

buildSW();