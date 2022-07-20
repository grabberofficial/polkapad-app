import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const serviceUrl = publicRuntimeConfig?.serviceUrl;
export const googleAnalyticsId = publicRuntimeConfig?.googleAnalyticsId;
export const mailchimpId = publicRuntimeConfig?.mailchimpId;
export const facebookPixel = publicRuntimeConfig?.facebookPixel;
export const facebookVerifyId = publicRuntimeConfig?.facebookVerifyId;
export const environment = publicRuntimeConfig?.environment;
