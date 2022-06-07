const withImages = require('next-images');

module.exports = withImages({
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
});
