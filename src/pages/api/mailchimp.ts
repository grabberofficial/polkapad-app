import { NextApiRequest, NextApiResponse } from 'next';
import fetchJson from '@/lib/fetchJson';
import MD5 from 'crypto-js/md5';
import { mailchimpId } from '@/config/env';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, groups } = req.body;

  const emailData = {
    email_address: email,
    status: 'subscribed',
    interests: groups.reduce(
      (acc: { [key: string]: boolean }, group: string) => {
        return {
          ...acc,
          [group]: true,
        };
      },
      {},
    ),
  };

  const response = await fetchJson(
    `https://us14.api.mailchimp.com/3.0/lists/ac9b198688/members/${MD5(email)}`,
    { method: 'PUT', body: JSON.stringify(emailData) },
    `Bearer ${mailchimpId}`,
  );

  res.status(200).json(response);
};
