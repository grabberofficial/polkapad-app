import { sessionOptions } from '@/lib/session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export type KYC = {
  iframeUrl: any;
};

const kycRoute = async (req: NextApiRequest, res: NextApiResponse<KYC>) => {
  const payload = {
    reference: `SP_REQUEST_${Math.random()}`,
    callback_url: 'https://yourdomain.com/profile/sp-notify-callback',
    redirect_url: 'https://yourdomain.com/site/sp-redirect',
    country: 'GB',
    language: 'EN',
    verification_mode: 'any',
    ttl: 60,
    document: {
      proof: '',
      additional_proof: '',
      name: '',
      dob: '',
      age: '',
      document_number: '',
      expiry_date: '',
      issue_date: '',
      allow_offline: '1',
      allow_online: '1',
      supported_types: ['id_card', 'passport'],
      gender: '',
    },
  };
  //BASIC AUTH TOKEN
  const token = Buffer.from(
    '2d10fb59c246949c72f39e0bce6e6892c7d84c0fbe8182f722e21319d514f4ea:KymJQ6AIwKXqt7jiMtT4NoR6Ih5Drgrl',
  ).toString('base64');

  const kycResponse = await fetch('https://api.shuftipro.com/', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + token, // if access token then replace "Basic" with "Bearer"
    },
    body: JSON.stringify(payload),
  }).then((res) => res.json());

  console.log({
    kycResponse,
  });
  res.json({
    iframeUrl: kycResponse.verification_url,
  });
  // console.log({
  //   req: req,
  // });
  // if (req.session.user) {
  //   const payload = {
  //     reference: `SP_REQUEST_${Math.random()}`,
  //     callback_url: 'https://yourdomain.com/profile/sp-notify-callback',
  //     redirect_url: 'https://yourdomain.com/site/sp-redirect',
  //     country: 'GB',
  //     language: 'EN',
  //     verification_mode: 'any',
  //     ttl: 60,
  //     document: {
  //       proof: '',
  //       additional_proof: '',
  //       name: '',
  //       dob: '',
  //       age: '',
  //       document_number: '',
  //       expiry_date: '',
  //       issue_date: '',
  //       allow_offline: '1',
  //       allow_online: '1',
  //       supported_types: ['id_card', 'passport'],
  //       gender: '',
  //     },
  //   };
  //   //BASIC AUTH TOKEN
  //   const token = btoa(
  //     '2d10fb59c246949c72f39e0bce6e6892c7d84c0fbe8182f722e21319d514f4ea:KymJQ6AIwKXqt7jiMtT4NoR6Ih5Drgrl',
  //   );

  //   const kycResponse = await fetchJson('https://api.shuftipro.com/', {
  //     method: 'post',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Authorization: 'Basic ' + token, // if access token then replace "Basic" with "Bearer"
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   console.log({
  //     kycResponse,
  //   });
  //   res.json({
  //     iframeUrl: kycResponse,
  //   });
  //   // if (kycResponse.event && kycResponse.event === 'request.pending') {
  //   // } else {
  //   //   res.status(500).json({ message: 'Something went wrong' });
  //   // }
  //   // .then(function (response) {
  //   //   return response.json();
  //   // })
  //   // .then(function (data) {

  //   // })
  //   // .catch((err) => {
  //   //   console.log({ err });
  //   //   res.status(500).json(err);
  //   // });
  // } else {
  //   console.log({ 'not logged in': true });
  //   res.status(401);
  // }
};

export default withIronSessionApiRoute(kycRoute, sessionOptions);
