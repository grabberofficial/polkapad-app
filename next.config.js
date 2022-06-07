const withImages = require('next-images');

console.log(
  'process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
);

module.exports = withImages({
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
});
