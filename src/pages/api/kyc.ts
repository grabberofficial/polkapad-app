import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import fetchJson from '@/lib/fetchJson';

export type KYC = {
  iframeUrl: string;
};

const kycRoute = async (req: NextApiRequest, res: NextApiResponse<KYC>) => {
  const verificationUrl: string = await fetchJson('/api/kyc/verification-url', {
    method: 'GET',
  });

  res.json({
    iframeUrl: verificationUrl,
  });
};

export default withIronSessionApiRoute(kycRoute, sessionOptions);
