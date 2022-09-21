import {
  analyticsSendRegistration,
  analyticsSendRegistrationWait,
  analyticsSendStartedConnectionBinance,
  analyticsSendStartedConnectionPolkadot,
  analyticsSendStartKyc,
  analyticsSendSuccessKyc,
  analyticsSendWalletAdded,
} from '@/services/analytics';
import { isProduction } from '@/utils/general';

export const sendMetricsCreateAccount = () => {
  if (isProduction) {
    analyticsSendRegistration();
  }
};

export const sendMetricsCreateAccountWaitList = () => {
  if (isProduction) {
    analyticsSendRegistrationWait();
  }
};

export const sendMetricsWalletAdded = () => {
  if (isProduction) {
    analyticsSendWalletAdded();
  }
};

export const sendMetricsStartKYC = () => {
  if (isProduction) {
    analyticsSendStartKyc();
  }
};

export const sendMetricsSuccessKYC = () => {
  if (isProduction) {
    analyticsSendSuccessKyc();
  }
};

export const sendMetricsStartedConnectionBinance = () => {
  if (isProduction) {
    analyticsSendStartedConnectionBinance();
  }
};

export const sendMetricsStartedConnectionPolkadot = () => {
  if (isProduction) {
    analyticsSendStartedConnectionPolkadot();
  }
};
