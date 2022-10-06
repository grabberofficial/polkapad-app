import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const serviceUrl = publicRuntimeConfig?.serviceUrl;
export const googleAnalyticsId = publicRuntimeConfig?.googleAnalyticsId;
export const facebookPixel = publicRuntimeConfig?.facebookPixel;
export const gleamRewardUrl = publicRuntimeConfig?.gleamRewardUrl;
export const environment = publicRuntimeConfig?.environment;
export const rootSeed = publicRuntimeConfig?.rootSeed;
export const plpdContractPublicKey = publicRuntimeConfig?.plpdContractPublicKey;
export const stakingContractPublicKey =
  publicRuntimeConfig?.stakingContractPublicKey;
