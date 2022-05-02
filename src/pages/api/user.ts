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
};

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.session.user) {
    const user: {
      id: string;
      name: string;
    } = await fetchJson(
      'https://app.polkapadapis.codes/users/currentUser',
      undefined,
      req.session.user.token,
    );
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      name: user.name,
      id: user.id,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      email: '',
      token: '',
      id: '',
      name: '',
    });
  }
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
