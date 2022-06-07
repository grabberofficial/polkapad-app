import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const serviceUrl = publicRuntimeConfig?.serviceUrl;
export const googleAnalyticsId = publicRuntimeConfig?.googleAnalyticsId;
