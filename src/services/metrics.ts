import {
  gtagSendCreateAccount,
  gtagSendCreateAccountWaitList,
  gtagSendStartKyc,
  gtagSendSuccessKyc,
  gtagSendWalletAdded,
} from '@/services/analytics';
import {
  fbSendCreateAccount,
  fbSendCreateAccountWaitList,
  fbSendStartKyc,
  fbSendSuccessKYC,
  fbSendWalletAdded,
} from '@/services/facebook';
import { isProduction } from '@/config/env';

export const sendMetricsCreateAccount = () => {
  if (isProduction) {
    gtagSendCreateAccount();
    fbSendCreateAccount();
  }
};

export const sendMetricsCreateAccountWaitList = () => {
  if (isProduction) {
    gtagSendCreateAccountWaitList();
    fbSendCreateAccountWaitList();
  }
};

export const sendMetricsWalletAdded = () => {
  if (isProduction) {
    gtagSendWalletAdded();
    fbSendWalletAdded();
  }
};

export const sendMetricsStartKYC = () => {
  if (isProduction) {
    gtagSendStartKyc();
    fbSendStartKyc();
  }
};

export const sendMetricsSuccessKYC = () => {
  if (isProduction) {
    gtagSendSuccessKyc();
    fbSendSuccessKYC();
  }
};
