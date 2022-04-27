// import type { User } from './user';

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import fetchJson from '@/lib/fetchJson';
import { NextApiRequest, NextApiResponse } from 'next';

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authType } = await req.body;
  if (authType === 'password') {
    const { email, password } = await req.body;

    try {
      const tokenRes = await fetchJson(
        'http://localhost:3000/auth/password/login',
        {
          method: 'POST',
          body: JSON.stringify({
            password: password,
            email: email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log({
        tokenRes,
        res,
      });
      const user = { isLoggedIn: true, email };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else if (authType === 'code') {
    const { email, code } = await req.body;

    try {
      const tokenRes = await fetchJson(
        'http://localhost:3000/auth/code/login',
        {
          method: 'POST',
          body: JSON.stringify({
            code: code,
            email: email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log({
        tokenRes,
        res,
      });
      const user = { isLoggedIn: true, email };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
