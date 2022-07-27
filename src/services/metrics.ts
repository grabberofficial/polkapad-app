import {
  analyticsSendRegistration,
  analyticsSendCreateAccountWaitList,
  analyticsSendStartKyc,
  analyticsSendSuccessKyc,
  analyticsSendWalletAdded,
} from '@/services/analytics';
import { isProduction } from '@/shared/utils/general';

export const sendMetricsCreateAccount = () => {
  if (isProduction) {
    analyticsSendRegistration();
    // fbSendCreateAccount();
  }
};

export const sendMetricsCreateAccountWaitList = () => {
  if (isProduction) {
    analyticsSendCreateAccountWaitList();
    // fbSendCreateAccountWaitList();
  }
};

export const sendMetricsWalletAdded = () => {
  if (isProduction) {
    analyticsSendWalletAdded();
    // fbSendWalletAdded();
  }
};

export const sendMetricsStartKYC = () => {
  if (isProduction) {
    analyticsSendStartKyc();
    // fbSendStartKyc();
  }
};

export const sendMetricsSuccessKYC = () => {
  if (isProduction) {
    analyticsSendSuccessKyc();
    // fbSendSuccessKYC();
  }
};
