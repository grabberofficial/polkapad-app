import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { serviceUrl } from '@/config/env';

export enum MagicLinkTypes {
  WALLET = 'WALLET',
  KYC = 'KYC',
}

const magicLinksRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.session.user && req.body) {
    try {
      const response = await fetch(`https://${serviceUrl}/magic-links`, {
        headers: {
          Authorization: req.session.user.token,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: req.body,
      });

      if (response.status !== 201) {
        const error = await response.json();
        throw error;
      }

      res.status(200).json('');
      // eslint-disable-next-line no-empty
    } catch (e) {}
  } else {
    res.json('');
  }
};

export default withIronSessionApiRoute(magicLinksRoute, sessionOptions);
