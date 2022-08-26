import { sessionOptions } from '@/constants/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { serviceUrl } from '@/config/env';

const analyticsRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.session.user && req.body) {
    try {
      const response = await fetch(`https://${serviceUrl}/analytics`, {
        headers: {
          Authorization: req.session.user.token,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(req.body),
      });

      if (response.status !== 201) {
        const error = await response.json();
        throw error;
      }

      res.status(200).json('');
      // eslint-disable-next-line no-empty
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(200).json('');
  }
};

export default withIronSessionApiRoute(analyticsRoute, sessionOptions);
