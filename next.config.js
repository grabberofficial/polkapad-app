const withImages = require('next-images');

module.exports = withImages({
  publicRuntimeConfig: {
    serviceUrl: process.env.SERVICE_URL,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
  },
});
