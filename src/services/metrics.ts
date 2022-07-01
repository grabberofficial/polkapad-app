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

export const sendMetricsCreateAccount = () => {
  gtagSendCreateAccount();
  fbSendCreateAccount();
};

export const sendMetricsCreateAccountWaitList = () => {
  gtagSendCreateAccountWaitList();
  fbSendCreateAccountWaitList();
};

export const sendMetricsWalletAdded = () => {
  gtagSendWalletAdded();
  fbSendWalletAdded();
};

export const sendMetricsStartKYC = () => {
  gtagSendStartKyc();
  fbSendStartKyc();
};

export const sendMetricsSuccessKYC = () => {
  gtagSendSuccessKyc();
  fbSendSuccessKYC();
};
