// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: `John Doe` });
};

export default withSentry(handler);
