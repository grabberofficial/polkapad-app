const withImages = require('next-images');
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(
  withImages({
    publicRuntimeConfig: {
      serviceUrl: process.env.SERVICE_URL,
      mailchimpId: process.env.MAILCHIMP_ID,
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
      environment: process.env.ENVIRONMENT,
    },
  }),
  sentryWebpackPluginOptions,
);
