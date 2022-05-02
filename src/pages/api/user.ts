import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  isLoggedIn: boolean;
  email: string;
  // avatarUrl: string;
};

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      email: '',
    });
  }
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
