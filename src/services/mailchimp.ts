import fetchJson from '@/lib/fetchJson';

export enum MAILCHIMP_INTERESTS {
  ALL_SUBSCRIBERS = '9f556022b5',
  NEWS = 'a909a3122f',
  COMPLETE_REGISTRATION = 'a67c5c40f9',
  WALLET_ADDED = '2bb55bf467',
  START_KYC = 'b68c2a4367',
  FINISHED_KYC = '029fa5f103',
}

export const mailchimpSend = async (email: string, groups: string[]) => {
  try {
    await fetchJson('/api/mailchimp', {
      method: 'POST',
      body: JSON.stringify({ email, groups }),
    });
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

export const mailchimpSendEmailSubscription = async (email: string) => {
  await mailchimpSend(email, [
    MAILCHIMP_INTERESTS.ALL_SUBSCRIBERS,
    MAILCHIMP_INTERESTS.NEWS,
  ]);
};

export const mailchimpSendAccountCreated = async (email: string) => {
  await mailchimpSend(email, [MAILCHIMP_INTERESTS.COMPLETE_REGISTRATION]);
};

export const mailchimpSendWalletAdded = async (email: string) => {
  await mailchimpSend(email, [MAILCHIMP_INTERESTS.WALLET_ADDED]);
};

export const mailchimpSendStartKyc = async (email: string) => {
  await mailchimpSend(email, [MAILCHIMP_INTERESTS.START_KYC]);
};

export const mailchimpSendFinishedKyc = async (email: string) => {
  await mailchimpSend(email, [MAILCHIMP_INTERESTS.FINISHED_KYC]);
};
