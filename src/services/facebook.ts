declare global {
  interface Window {
    FbEvents: any;
  }
}

export const fbSendCreateAccount = () => {
  window.FbEvents.CompleteRegistration(null, null, true);
};

export const fbSendCreateAccountWaitList = () => {
  window.FbEvents.Purchase([], null);
};

export const fbSendWalletAdded = () => {
  window.FbEvents.CustomEvent('AddPaymentInfo', null);
};

export const fbSendStartKyc = () => {
  window.FbEvents.InitiateCheckout([]);
};

export const fbSendSuccessKYC = () => {
  window.FbEvents.SubmitApplication();
};
