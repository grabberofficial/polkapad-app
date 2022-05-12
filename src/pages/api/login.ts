import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import fetchJson, { FetchError } from '@/lib/fetchJson';
import { NextApiRequest, NextApiResponse } from 'next';

interface TokenRes {
  accessToken: string;
}

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await req.body;
  const { authType } = body;

  if (authType === 'password') {
    const { email, password } = await req.body;

    try {
      const tokenRes: TokenRes = await fetchJson(
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
      console.log({
        tokenRes,
        res,
      });
      const user = {
        isLoggedIn: true,
        email,
        token: tokenRes.accessToken,
        id: '',
        name: '',
      };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      console.log({
        error: error as FetchError,
      });
      res
        .status((error as FetchError).data.code ?? 500)
        .json((error as FetchError).data);
    }
  } else if (authType === 'code') {
    const { email, code } = await req.body;

    try {
      const tokenRes: TokenRes = await fetchJson(
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
      console.log({
        tokenRes,
        res,
      });
      const user = {
        isLoggedIn: true,
        email,
        token: tokenRes.accessToken,
        id: '',
        name: '',
      };
      req.session.user = user;
      await req.session.save();
      res.json(user);
    } catch (error) {
      res
        .status((error as FetchError).data.code ?? 500)
        .json((error as FetchError).data);
    }
  } else {
    res.status(500).json({ message: 'No auth type provided' });
  }
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
