import { serviceUrl } from '@/config/env';
import fetchJson from '@/services/fetchJson';
import { sessionOptions } from '@/constants/session';
// import { withSentry } from '@sentry/nextjs';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { KycStatusTypes } from '@/pages/api/kycStatus';

export type User = {
  isLoggedIn: boolean;
  email: string;
  id: string;
  name: string;
  token: string;
  kycStatus: KycStatusTypes | null;
};

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  try {
    if (req.session.user) {
      const user: {
        id: string;
        name: string;
        kycStatus: KycStatusTypes | null;
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
    } else {
      res.json({
        isLoggedIn: false,
        email: '',
        token: '',
        id: '',
        name: '',
        kycStatus: null,
      });
    }
  } catch {
    res.json({
      isLoggedIn: false,
      email: '',
      token: '',
      id: '',
      name: '',
      kycStatus: null,
    });
  }
};

// export default withSentry(withIronSessionApiRoute(userRoute, sessionOptions));
export default withIronSessionApiRoute(userRoute, sessionOptions);
