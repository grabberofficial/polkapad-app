import fetchJson from '@/lib/fetchJson';
import { sessionOptions } from '@/lib/session';
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
  console.log('userApi', {
    user: req.session.user,
    session: req.session,
  });
  if (req.session.user) {
    const user: {
      id: string;
      name: string;
      kycStatus: string;
    } = await fetchJson(
      'https://app.polkapadapis.codes/users/currentUser',
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
      kycStatus: '',
    });
  }
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
