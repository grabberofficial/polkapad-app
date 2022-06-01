import React, { useCallback, useEffect, Fragment } from 'react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import WalletCard from '@/components/WalletCard/WalletCard';
import useUser from '@/lib/hooks/useUser';
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
import dynamic from 'next/dynamic';

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

import successful_kyc from '../assets/successful_kyc.svg';
import { useRouter } from 'next/router';
import fetchJson from '@/lib/fetchJson';
import { Footer, FooterWrapper } from '@/components/footer';
import { gtagSendStartKyc, gtagSendSuccessKyc } from '@/services/analytics';

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
  const [wallets, setWallets] = useState<{ name: string; value: string }[]>([]);
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

  const startKyc = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const kyc = await fetch('/api/kyc').then((data) => data.json());

      gtagSendStartKyc();

      window.open(kyc.iframeUrl);
    }
  }, []);

  const fetchWallets = useCallback(async () => {
    const wallets: Array<{
      name: string;
      value: string;
    }> = await fetchJson(
      'https://app.polkapadapis.codes/wallets',
      {},
      user?.token,
    );
    setWallets(wallets);
  }, [user]);

  useEffect(() => {
    if (user?.token.length && !wallets.length) fetchWallets();
  }, [fetchWallets, user?.token.length, wallets.length]);

  useEffect(() => {
    if (router.query.kyc) {
      if (router.query.kyc === 'true') {
        setSelectedTab(2);
      } else if (router.query.kyc === 'success') {
        gtagSendSuccessKyc();
      }
    }
  }, [router, setSelectedTab]);

  const tabContent = [
    <Flex
      flexBasis="356px"
      as="form"
      flexDirection="column"
      gap="28px"
      key="details"
      minHeight="366px"
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
      <WalletCard type="eth" wallets={wallets} />
      <WalletCard type="polka" wallets={wallets} />
      <Button
        width="120px"
        marginTop="20px"
        variant="primary"
        onClick={startKyc}
      >
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
      {user?.kycStatus === KycStatusTypes.ACCEPTED ? (
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
      ) : (
        <Button onClick={startKyc}>Start KYC</Button>
      )}
    </Flex>,
  ];

  return (
    <Fragment>
      {' '}
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
                    (index === 2 &&
                      user?.kycStatus === KycStatusTypes.ACCEPTED) ||
                    (index === 1 && wallets && wallets.length === 2)
                      ? BsFillCheckCircleFill
                      : BsFillExclamationCircleFill
                  }
                  color={
                    index === 0 ||
                    (index === 2 &&
                      user?.kycStatus === KycStatusTypes.ACCEPTED) ||
                    (index === 1 && wallets && wallets.length === 2)
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
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Fragment>
  );
};

export default dynamic(() => Promise.resolve(ProfilePage), {
  ssr: false,
});
