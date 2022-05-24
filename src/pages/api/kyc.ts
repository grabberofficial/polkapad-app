import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export type KYC = {
  iframeUrl: string | null;
};

const kycRoute = async (req: NextApiRequest, res: NextApiResponse<KYC>) => {
  if (req.session.user) {
    try {
      const verificationUrlRes = await fetch(
        'https://app.polkapadapis.codes/kyc/verification-url',
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

      console.log({
        verificationUrl,
      });

      res.json({
        iframeUrl: verificationUrl,
      });
    } catch (e) {
      console.error(e);
    }
  } else {
    res.json({
      iframeUrl: null,
    });
  }
};

export default withIronSessionApiRoute(kycRoute, sessionOptions);
