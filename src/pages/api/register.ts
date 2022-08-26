import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/constants/session';
import { NextApiRequest, NextApiResponse } from 'next';
import fetchJson from '@/services/fetchJson';
import { serviceUrl } from '@/config/env';
// import { withSentry } from '@sentry/nextjs';
import { KycStatusTypes } from '@/pages/api/kycStatus';

const signupRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = await req.body;

  try {
    const tokenRes = await fetch(
      `https://${serviceUrl}/auth/password/register`,
      {
        method: 'POST',
        body: JSON.stringify(req.body),
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

    const userRes: {
      id: string;
      name: string;
      kycStatus: KycStatusTypes;
    } = await fetchJson(
      `https://${serviceUrl}/users/currentUser`,
      undefined,
      token,
    );

    const user = {
      isLoggedIn: true,
      email,
      token: token,
      ...userRes,
    };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export default withSentry(withIronSessionApiRoute(signupRoute, sessionOptions));
export default withIronSessionApiRoute(signupRoute, sessionOptions);
