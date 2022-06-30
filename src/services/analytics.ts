import ReactGA from 'react-ga4';

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

export const gtagSendCreateAccount = (): void => {
  gtagSendEvent('create_account', 'wl_page');
};

export const gtagSendCreateAccountWaitList = (): void => {
  gtagSendEvent('succes-waitlested', 'thx_page');
};

export const gtagSendStartKyc = (): void => {
  gtagSendEvent('start_kyc', 'wl_page');
};

export const gtagSendSuccessKyc = (): void => {
  gtagSendEvent('success_kyc', 'wl_page');
};

export const gtagSendWalletAdded = (): void => {
  gtagSendEvent('wallet_added', 'wl_page');
};
