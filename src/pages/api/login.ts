import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await req.body;
  const { authType } = body;

  if (authType === 'password') {
    const { email, password } = await req.body;

    try {
      const tokenRes = await fetch(
        'https://app.polkapadapis.codes/auth/password/login',
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

      const isCreated = tokenRes.status === 201;

      if (tokenRes.status !== 200 && !isCreated) {
        console.log({
          status: tokenRes.status,
        });
        const error = await tokenRes.json();
        throw error;
      }

      const token = await tokenRes.text();

      console.log({
        token,
      });

      const user = {
        isLoggedIn: true,
        email,
        token: token,
        id: '',
        name: '',
        kycStatus: '',
      };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else if (authType === 'code') {
    const { email, code } = await req.body;

    try {
      const tokenRes = await fetch(
        'https://app.polkapadapis.codes/auth/code/login',
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

      const isCreated = tokenRes.status === 201;

      if (tokenRes.status !== 200 && !isCreated) {
        const error = await tokenRes.json();
        throw error;
      }

      const token = await tokenRes.text();

      const user = {
        isLoggedIn: true,
        email,
        token: token,
        id: '',
        name: '',
        kycStatus: '',
      };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json({ message: 'No auth type provided' });
  }
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
