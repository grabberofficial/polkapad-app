import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import fetchJson from '@/lib/fetchJson';

export type KYC = {
  iframeUrl: string | null;
};

const kycRoute = async (req: NextApiRequest, res: NextApiResponse<KYC>) => {
  if (req.session.user) {
    const verificationUrl: string = await fetchJson(
      '/api/kyc/verification-url',
      {
        method: 'GET',
      },
      req.session.user.token,
    );

    res.json({
      iframeUrl: verificationUrl,
    });
  } else {
    res.json({
      iframeUrl: null,
    });
  }
};

export default withIronSessionApiRoute(kycRoute, sessionOptions);
