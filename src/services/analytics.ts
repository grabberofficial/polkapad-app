export const gtagSendEvent = (
  eventAction: string,
  eventCategory: string,
): void => {
  if (
    typeof window !== 'undefined' &&
    (<any>window).gtag &&
    typeof (<any>window).gtag === 'function'
  ) {
    (<any>window).gtag('event', eventAction, {
      event_category: eventCategory,
      event_action: eventAction,
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
