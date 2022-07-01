declare global {
  interface Window {
    FbEvents: any;
  }
}

window.FbEvents = window.FbEvents || {};

const { FbEvents } = window;

export const fbSendCreateAccount = () => {
  FbEvents.CompleteRegistration(null, null, true);
};

export const fbSendCreateAccountWaitList = () => {
  FbEvents.Purchase([], null);
};

export const fbSendWalletAdded = () => {
  FbEvents.CustomEvent('AddPaymentInfo', null);
};

export const fbSendStartKyc = () => {
  FbEvents.InitiateCheckout([]);
};

export const fbSendSuccessKYC = () => {
  FbEvents.SubmitApplication();
};
