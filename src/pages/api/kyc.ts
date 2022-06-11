import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { serviceUrl } from '@/config/env';
import { withSentry } from '@sentry/nextjs';

export type KYC = {
  iframeUrl: string | null;
};

const kycRoute = async (req: NextApiRequest, res: NextApiResponse<KYC>) => {
  if (req.session.user) {
    try {
      const verificationUrlRes = await fetch(
        `https://${serviceUrl}/kyc/verification-url`,
        {
          headers: {
            Authorization: req.session.user.token,
          },
        },
      );

      if (verificationUrlRes.status !== 200) {
        const error = await verificationUrlRes.json();
        throw error;
      }

      const verificationUrl = await verificationUrlRes.text();

      res.json({
        iframeUrl: verificationUrl,
      });
      // eslint-disable-next-line no-empty
    } catch (e) {}
  } else {
    res.json({
      iframeUrl: null,
    });
  }
};

export default withSentry(withIronSessionApiRoute(kycRoute, sessionOptions));
