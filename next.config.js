const withImages = require('next-images');

module.exports = withImages({
  publicRuntimeConfig: {
    serviceUrl: process.env.SERVICE_URL,
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
});
