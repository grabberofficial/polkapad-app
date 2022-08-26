import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/constants/session';
import { NextApiRequest, NextApiResponse } from 'next';
// import { withSentry } from '@sentry/nextjs';
// import type { User } from 'pages/api/user';

const logoutRoute = (req: NextApiRequest, res: NextApiResponse<any>) => {
  req.session.destroy();
  res.json({ isLoggedIn: false, login: '', avatarUrl: '' });
};

// export default withSentry(withIronSessionApiRoute(logoutRoute, sessionOptions));
export default withIronSessionApiRoute(logoutRoute, sessionOptions);
