import { sessionOptions } from '@/constants/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { serviceUrl } from '@/config/env';

export enum KycStatusTypes {
  NOT_VERIFIED = 'NOT_VERIFIED',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  BLOCKED = 'BLOCKED',
}

export type KYCStatus = {
  kycStatus: KycStatusTypes | null;
};

const kycStatusRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<KYCStatus>,
) => {
  if (req.session.user) {
    try {
      const response = await fetch(`https://${serviceUrl}/kyc/status`, {
        headers: {
          Authorization: req.session.user.token,
        },
      });

      if (response.status !== 200) {
        const error = await response.json();
        throw error;
      }

      const kycStatus = (await response.text()) as KycStatusTypes;

      res.json({
        kycStatus,
      });
      // eslint-disable-next-line no-empty
    } catch (e) {}
  } else {
    res.json({
      kycStatus: null,
    });
  }
};

export default withIronSessionApiRoute(kycStatusRoute, sessionOptions);
