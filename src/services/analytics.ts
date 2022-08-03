import ReactGA from 'react-ga4';
import fetchJson from '@/services/fetchJson';
import { API_ANALYTICS_ROUTE } from '@/constants/routes';

export enum AnalyticsEventType {
  Registration = 'REGISTRATION',
  RegistrationWait = 'REGISTRATION_WAIT',
  StartedConnectionBinance = 'STARTED_CONNECTION_BINANCE',
  StartedConnectionPolkadot = 'STARTED_CONNECTION_POLKADOT',
  WalletAdded = 'WALLET_ADDED',
  StartKyc = 'START_KYC',
  KycSuccess = 'KYC_SUCCESS',
}

export const analyticsSend = async (type: AnalyticsEventType) => {
  try {
    await fetchJson(API_ANALYTICS_ROUTE, {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
    // eslint-disable-next-line no-empty
  } catch {}
};

export const gtagSendEvent = (
  eventAction: string,
  eventCategory: string,
): void => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      category: eventCategory,
      action: eventAction,
    });
  }
};

export const analyticsSendRegistration = async (): Promise<void> => {
  gtagSendEvent('create_account', 'wl_page');

  await analyticsSend(AnalyticsEventType.Registration);
};

export const analyticsSendRegistrationWait = async (): Promise<void> => {
  await analyticsSend(AnalyticsEventType.RegistrationWait);
};

export const analyticsSendStartKyc = async (): Promise<void> => {
  gtagSendEvent('start_kyc', 'wl_page');

  await analyticsSend(AnalyticsEventType.StartKyc);
};

export const analyticsSendSuccessKyc = async (): Promise<void> => {
  gtagSendEvent('success_kyc', 'wl_page');

  await analyticsSend(AnalyticsEventType.KycSuccess);
};

export const analyticsSendWalletAdded = async (): Promise<void> => {
  gtagSendEvent('wallet_added', 'wl_page');

  await analyticsSend(AnalyticsEventType.WalletAdded);
};

export const analyticsSendStartedConnectionBinance =
  async (): Promise<void> => {
    await analyticsSend(AnalyticsEventType.StartedConnectionBinance);
  };

export const analyticsSendStartedConnectionPolkadot =
  async (): Promise<void> => {
    await analyticsSend(AnalyticsEventType.StartedConnectionPolkadot);
  };
