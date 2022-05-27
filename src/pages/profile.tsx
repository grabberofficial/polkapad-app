import React, { useCallback, useEffect } from 'react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import WalletCard from '@/components/WalletCard/WalletCard';
import useUser from '@/lib/hooks/useUser';
import { sessionOptions } from '@/lib/session';
import {
  Flex,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputLeftElement,
  Text,
  Image,
} from '@chakra-ui/react';
import { withIronSessionSsr } from 'iron-session/next';
import { User } from './api/user';

import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
} from 'react-icons/bs';
import { useState } from 'react';
import { FormInput } from '@/components/FormInput/FormInput';
import { MdEmail } from 'react-icons/md';
import { string, object } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaUser } from 'react-icons/fa';
import { Button } from '@/components/Button';
import { KYCIframe } from '@/modules/profile/KYCIframe';

import successful_kyc from '../assets/successful_kyc.svg';
import { useRouter } from 'next/router';

const tabs = ['Profile details', 'Verify wallet', 'KYC Verification'];

enum KycStatusTypes {
  NOT_VERIFIED = 'NOT_VERIFIED',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

interface IFormInput {
  email: string;
  name: string;
}

const schema = object()
  .shape({
    email: string().required('Email is required').email('Email is invalid'),
    name: string().required('Name is required'),
  })
  .required();

const ProfilePage = () => {
  const { user } = useUser();
  const [selectedTab, setSelectedTab] = useState(0);
  const [KYCUrl, setKYCUrl] = useState('');
  const [isKYC, openKYC] = useState(false);
  const router = useRouter();

  const selectTab = useCallback((index) => {
    setSelectedTab(index);
  }, []);

  const { control, reset } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        name: user.name,
      });
    }
  }, [user, reset]);

  const fetchKYC = useCallback(async () => {
    const kyc = await fetch('/api/kyc').then((data) => data.json());

    setKYCUrl(kyc.iframeUrl);
  }, []);

  useEffect(() => {
    if (isKYC) {
      fetchKYC();
    }
  }, [isKYC, fetchKYC]);

  const tabContent = [
    <Flex
      flexBasis="356px"
      as="form"
      flexDirection="column"
      gap="28px"
      key="details"
    >
      <FormControl isInvalid={false} isDisabled>
        <FormLabel htmlFor="name">Name</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" width="55px" height="100%">
            <Flex
              height="21px"
              width="100%"
              justifyContent="center"
              alignItems="center"
              borderRight="1px solid #E0E0E0"
            >
              <Icon as={FaUser} height="21px" width="21px" color="#49C7DA" />
            </Flex>
          </InputLeftElement>
          <FormInput fieldName="name" hasError={false} control={control} />
        </InputGroup>
      </FormControl>
      <FormControl isInvalid={false} isDisabled>
        <FormLabel htmlFor="email">Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" width="55px" height="100%">
            <Flex
              height="21px"
              width="100%"
              justifyContent="center"
              alignItems="center"
              borderRight="1px solid #E0E0E0"
            >
              <Icon as={MdEmail} height="21px" width="21px" color="#49C7DA" />
            </Flex>
          </InputLeftElement>
          <FormInput fieldName="email" hasError={false} control={control} />
        </InputGroup>
      </FormControl>
    </Flex>,
    <Flex
      paddingBottom="100px"
      width="466px"
      flexDirection="column"
      key="wallet"
      alignItems={'flex-end'}
    >
      <WalletCard type="eth" />
      <WalletCard type="polka" />
      <Button width="120px" marginTop="20px" variant="primary">
        Start KYC
      </Button>
    </Flex>,
    <Flex
      flexBasis={
        user?.kycStatus === KycStatusTypes.ACCEPTED ? '404px' : '800px'
      }
      height="550px"
      flexDirection="column"
      gap="28px"
      key="kyc"
    >
      {user?.kycStatus === KycStatusTypes.ACCEPTED && (
        <>
          <Flex alignItems="center" gap="30px">
            <Image src={successful_kyc} color="#49C7DA" />
            <Text color="#303030" fontWeight="700" fontSize="24px">
              You have been successfully verified!
            </Text>
          </Flex>
          <Flex flexDirection="column" marginTop="30px">
            <Text
              color="#303030"
              fontWeight="400"
              fontSize="14px"
              marginBottom="60px"
            >
              Now that you have verified your identity, you can participate in
              sales, feel free to go to the launchpad.
            </Text>
            <Button variant="primary" onClick={() => router.push('/locker')}>
              Ready to Lock
            </Button>
          </Flex>
        </>
      )}
      {!isKYC && user?.kycStatus !== KycStatusTypes.ACCEPTED && (
        <Button
          onClick={() => {
            openKYC(true);
          }}
        >
          Start KYC
        </Button>
      )}
      {isKYC && user?.kycStatus !== KycStatusTypes.ACCEPTED && (
        <KYCIframe iframeUrl={KYCUrl} />
      )}
    </Flex>,
  ];

  return (
    <Flex padding="76px 155px 0" flexDirection="column">
      <Heading marginBottom={101} withUnderline>
        User Profile
      </Heading>

      <Flex>
        <Flex direction="column" gap="30px" flexBasis="30%">
          {/* Tab */}
          {tabs.map((tab, index) => (
            <Flex
              gap="11px"
              alignItems="center"
              justifyContent="flex-start"
              cursor="pointer"
              key={index}
              onClick={() => selectTab(index)}
            >
              <Icon
                as={
                  index === 0 ||
                    (index === 2 && user?.kycStatus === KycStatusTypes.ACCEPTED)
                    ? BsFillCheckCircleFill
                    : BsFillExclamationCircleFill
                }
                color={
                  index === 0 ||
                    (index === 2 && user?.kycStatus === KycStatusTypes.ACCEPTED)
                    ? '#49C7DA'
                    : '#FFCC15'
                }
              />
              <Text
                color={index === selectedTab ? '#49C7DA' : '#303030'}
                fontWeight="600"
                fontSize="14px"
                lineHeight="21px"
              >
                {tab}
              </Text>
            </Flex>
          ))}
        </Flex>
        {/* TabContent */}
        {tabContent[selectedTab]}
      </Flex>
    </Flex>
  );
};

export default ProfilePage;

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  // console.log('profile', {
  //   user: req.session.user,
  //   session: req.session,
  // });

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, email: '', token: '' } as User,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
  sessionOptions);
