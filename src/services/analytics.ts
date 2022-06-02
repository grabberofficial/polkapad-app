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
  gtagSendEvent('create-account', 'registration-form');
};

export const gtagSendStartKyc = (): void => {
  gtagSendEvent('start-kyc', 'kyc');
};

export const gtagSendSuccessKyc = (): void => {
  gtagSendEvent('success-kyc', 'kyc');
};
