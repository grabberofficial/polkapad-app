import { serviceUrl } from '@/config/env';
import fetchJson from '@/lib/fetchJson';
import { sessionOptions } from '@/lib/session';
import { withSentry } from '@sentry/nextjs';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  email: string;
  id: string;
  name: string;
  token: string;
  kycStatus: string;
};

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  try {
    if (req.session.user) {
      const user: {
        id: string;
        name: string;
        kycStatus: string;
      } = await fetchJson(
        `https://${serviceUrl}/users/currentUser`,
        undefined,
        req.session.user.token,
      );

      req.session.user = {
        ...req.session.user,
        name: user.name,
        id: user.id,
        isLoggedIn: true,
        kycStatus: user.kycStatus,
      };
      await req.session.save();
      // in a real world application you might read the user id from the session and then do a database request
      // to get more information on the user if needed
      res.json({
        ...req.session.user,
        name: user.name,
        id: user.id,
        isLoggedIn: true,
        kycStatus: user.kycStatus,
      });
    }
  } catch {
    res.json({
      isLoggedIn: false,
      email: '',
      token: '',
      id: '',
      name: '',
      kycStatus: '',
    });
  }
};

export default withSentry(withIronSessionApiRoute(userRoute, sessionOptions));
