import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
import WalletCard from '@/components/WalletCard/WalletCard';
import useUser from '@/lib/hooks/useUser';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';

import {
  BsFillCheckCircleFill,
  BsFillExclamationCircleFill,
} from 'react-icons/bs';
import { FormInput } from '@/components/FormInput/FormInput';
import { MdEmail } from 'react-icons/md';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaUser } from 'react-icons/fa';
import { Button } from '@/components/Button';

import successful_kyc from '../assets/successful_kyc.svg';
import { useRouter } from 'next/router';
import fetchJson from '@/lib/fetchJson';
import { Footer, FooterWrapper } from '@/components/footer';
import {
  gtagSendStartKyc,
  gtagSendSuccessKyc,
  gtagSendWalletAdded,
} from '@/services/analytics';
import { serviceUrl } from '@/config/env';

import { KYCStatus, KycStatusTypes } from '@/pages/api/kycStatus';
import {
  mailchimpSendFinishedKyc,
  mailchimpSendStartKyc,
  mailchimpSendWalletAdded,
} from '@/services/mailchimp';
import { KycIcons } from '@/components/KycIcons/KycIcons';
import { VerificationInProgress } from '@/components/VerificationInProgress/VerificationInProgress';
import { VerificationDisrupted } from '@/components/VerificationDisrupted/VerificationDisrupted';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { SupportButton } from '@/components/SupportButton/SupportButton';
import { IoIosArrowForward } from 'react-icons/io';

const tabs = ['Profile details', 'Verify wallet', 'KYC Verification'];

const KYC_STATUS_POLL_INTERVAL = 3000;

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
  const { user } = useUser({
    redirectTo: '/auth/login',
  });
  const intervalID = useRef<NodeJS.Timer | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [kycStatus, setKycStatus] = useState<KycStatusTypes | null | undefined>(
    user?.kycStatus,
  );
  const [wallets, setWallets] = useState<{ name: string; value: string }[]>([]);
  const router = useRouter();
  const isMobile = useIsMobile();
  const isKYCAccepted = kycStatus === KycStatusTypes.ACCEPTED;
  const isKYCBlocked = kycStatus === KycStatusTypes.BLOCKED;
  const isKYCDeclined = kycStatus === KycStatusTypes.DECLINED;
  const isKYCNotVerified = kycStatus === KycStatusTypes.NOT_VERIFIED;
  const isKYCInProgress = kycStatus === KycStatusTypes.IN_PROGRESS;

  const getKycStatus = useCallback(async () => {
    const newStatus: KYCStatus = await fetchJson('/api/kycStatus');

    if (newStatus.kycStatus !== kycStatus) {
      setKycStatus(newStatus.kycStatus);
    }
  }, [kycStatus]);

  // Init
  useEffect(() => {
    if (!kycStatus && user?.kycStatus) {
      setKycStatus(user.kycStatus);
    }
  }, [getKycStatus, kycStatus, user?.kycStatus]);

  useEffect(() => {
    if (kycStatus === KycStatusTypes.IN_PROGRESS && !intervalID.current) {
      intervalID.current = setInterval(getKycStatus, KYC_STATUS_POLL_INTERVAL);
    }

    if (kycStatus !== KycStatusTypes.IN_PROGRESS && intervalID.current) {
      clearInterval(intervalID.current);
      intervalID.current = null;
    }

    if (kycStatus === KycStatusTypes.ACCEPTED && user?.email) {
      mailchimpSendFinishedKyc(user?.email);
    }
  }, [getKycStatus, kycStatus]);

  useEffect(() => {
    return () => {
      if (intervalID.current) {
        clearInterval(intervalID.current);
        intervalID.current = null;
      }
    };
  }, []);

  const walletsAreVerified = useMemo(() => wallets.length === 2, [wallets]);

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
    if (isMobile) {
      router.push('/mobile-kyc');
      return;
    }
    if (typeof window !== 'undefined') {
      setKycStatus(KycStatusTypes.IN_PROGRESS);
      const kyc = await fetch('/api/kyc').then((data) => data.json());
      gtagSendStartKyc();

      if (user?.email) {
        mailchimpSendStartKyc(user.email);
      }

      window.open(kyc.iframeUrl);
    }
  }, [isMobile, router, user?.email]);

  const fetchWallets = useCallback(async () => {
    const wallets: Array<{
      name: string;
      value: string;
    }> = await fetchJson(`https://${serviceUrl}/wallets`, {}, user?.token);
    setWallets(wallets);
    gtagSendWalletAdded();

    if (user?.email) {
      mailchimpSendWalletAdded(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (user?.token?.length && !wallets.length) fetchWallets();
  }, [fetchWallets, user?.token?.length, wallets?.length]);

  useEffect(() => {
    if (router.query.kyc) {
      if (router.query.kyc === 'true') {
        setSelectedTab(2);
      } else if (router.query.kyc === 'success') {
        gtagSendSuccessKyc();

        if (user?.email) {
          mailchimpSendFinishedKyc(user.email);
        }
      }
    }

    if (router.query.wallet) {
      setSelectedTab(1);
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
              <Icon
                as={FaUser}
                height="21px"
                width="21px"
                color="primary.basic"
              />
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
              <Icon
                as={MdEmail}
                height="21px"
                width="21px"
                color="primary.basic"
              />
            </Flex>
          </InputLeftElement>
          <FormInput fieldName="email" hasError={false} control={control} />
        </InputGroup>
      </FormControl>
    </Flex>,
    <Flex
      paddingBottom="100px"
      width={['100%', '100%', '100%', '100%', '466px']}
      flexDirection="column"
      key="wallet"
      alignItems={'flex-end'}
    >
      <WalletCard type="eth" wallets={wallets} verifyCallback={fetchWallets} />
      <WalletCard
        type="polka"
        wallets={wallets}
        verifyCallback={fetchWallets}
      />
      {user && !isKYCAccepted && (
        <Button
          width="120px"
          marginTop="20px"
          variant="primary"
          onClick={() => selectTab(2)}
          disabled={!walletsAreVerified}
        >
          To KYC
        </Button>
      )}
    </Flex>,
    <Flex
      flexBasis={isKYCAccepted ? '404px' : '800px'}
      flexDirection="column"
      gap={isKYCAccepted ? '28px' : '9px'}
      key="kyc"
    >
      {isKYCAccepted && (
        <>
          <Flex alignItems="center" gap="30px">
            <Image src={successful_kyc} color="primary.basic" />
            <Text color="secondary.text" fontWeight="700" fontSize="24px">
              You have been successfully verified!
            </Text>
          </Flex>
          <Flex flexDirection="column" marginTop="30px">
            <Text
              color="secondary.text"
              fontWeight="400"
              fontSize="14px"
              marginBottom="60px"
            >
              Now that you have verified your identity, you can participate in
              sales. Feel free to go to the launchpad.
            </Text>
            <Button
              variant="primary"
              onClick={() => router.push('/locker')}
              width="158px"
            >
              Ready to Lock
            </Button>
          </Flex>
        </>
      )}
      {isKYCNotVerified && (
        <>
          <Heading
            color="secondary.text"
            fontFamily="Poppins"
            fontSize="24px"
            fontWeight="700"
          >
            Individual KYC verification
          </Heading>
          <Text
            marginBottom="7px"
            color="secondary.text"
            maxWidth={340}
            fontSize={14}
          >
            {walletsAreVerified
              ? 'The type and name of the documents may differ depending on your country of residence.'
              : 'You can start KYC only after verifying wallets'}
          </Text>
          {walletsAreVerified && (
            <Text
              marginBottom="20px"
              color="secondary.textLight"
              maxWidth={340}
              fontSize={12}
            >
              We recommend using a document on which the full name is indicated
              in Latin.
            </Text>
          )}
        </>
      )}
      {isKYCDeclined && (
        <>
          <Heading
            color="secondary.text"
            fontFamily="Poppins"
            fontSize="24px"
            fontWeight="700"
          >
            KYC verification got failed.
          </Heading>
          <Text color="secondary.text" fontSize={12} lineHeight="28px">
            Here&apos;s why your KYC verification may have failed:
            <br />
            <ol style={{ padding: '24px 15px 0 15px' }}>
              <li>Name on documents and entered info does not match</li>
              <li>Uploaded images are not clear</li>
              <li>
                Uploaded photocopy image does not match with the original
                document image
              </li>
              <li>Mentioned document ID is Incorrect</li>
              <li>Uploaded documents are not valid ones</li>
              <li>Same document image uploaded for both documents</li>
              <li>Document belong to an underage person</li>
              <li>Selfie is invalid</li>
            </ol>
          </Text>
          <Text
            fontWeight={500}
            marginBottom="20px"
            fontSize={12}
            lineHeight="28px"
          >
            To upload your KYC documents again, click on the start KYC button.
          </Text>
        </>
      )}
      {isKYCBlocked && (
        <>
          <Heading
            color="secondary.text"
            fontFamily="Poppins"
            fontSize="24px"
            fontWeight="700"
          >
            KYC verification got failed.
          </Heading>
          <Text maxWidth={468}>
            If you have any problems regarding KYC verification, please reach us
            via support@polkapad.network. We will respond as soon as possible.
            <br />
            <br />
            Email support is available in the following languages: English,
            Chinese.
          </Text>
        </>
      )}
      {isKYCInProgress && (
        <Flex
          minHeight="300px"
          alignItems="center"
          justifyContent={isMobile ? 'center' : 'flex-start'}
          flexDirection="column"
        >
          <VerificationInProgress />
          {!isMobile && (
            <>
              <KycIcons />
              <VerificationDisrupted onButtonClick={startKyc} />
            </>
          )}
        </Flex>
      )}
      {!isKYCBlocked && !isKYCAccepted && !isKYCInProgress && (
        <KycIcons direction={isKYCDeclined ? 'row' : 'column'} />
      )}
      {!isKYCAccepted && !isKYCInProgress && (
        <Button
          variant={isKYCBlocked ? 'secondary' : 'primary'}
          onClick={startKyc}
          disabled={!walletsAreVerified || isKYCBlocked}
          width={158}
          marginTop="40px"
          flexShrink={0}
        >
          {isKYCBlocked ? 'KYC blocked' : 'Start KYC'}
        </Button>
      )}
    </Flex>,
  ];

  return (
    <Fragment>
      {' '}
      <Flex
        padding={['40px 16px', '40px 16px', '40px 16px', '76px 155px 0']}
        flexDirection="column"
        position="relative"
      >
        {isMobile ? (
          <Heading fontSize="20px" marginBottom="20px">
            User Profile
          </Heading>
        ) : (
          <Heading marginBottom={101} withUnderline>
            User Profile
          </Heading>
        )}

        <Flex flexDirection={['column', 'column', 'column', 'row']}>
          {!isMobile && (
            <Flex
              direction={['column', 'row', 'row', 'column']}
              gap="30px"
              flexBasis="30%"
              mr={[0, 0, 0, '20px']}
              mb={['20px', '20px', '20px', 0]}
            >
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
                      (index === 2 && isKYCAccepted) ||
                      (index === 1 && walletsAreVerified)
                        ? BsFillCheckCircleFill
                        : BsFillExclamationCircleFill
                    }
                    color={
                      index === 0 ||
                      (index === 2 && isKYCAccepted) ||
                      (index === 1 && walletsAreVerified)
                        ? 'primary.basic'
                        : 'warning'
                    }
                  />
                  <Text
                    color={
                      index === selectedTab ? 'primary.basic' : 'secondary.text'
                    }
                    _hover={{ color: 'secondary.textHover' }}
                    fontWeight="600"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    {tab}
                  </Text>
                </Flex>
              ))}
            </Flex>
          )}
          <SupportButton />
          {isMobile ? (
            <Accordion allowMultiple w="100%" sx={{ columnCount: [1] }}>
              {tabContent.map((tab, index) => (
                <AccordionItem
                  margin="10px 0"
                  border="none"
                  key="index"
                  w="100%"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        padding="20px 25px"
                        color="secondary.text"
                        backgroundColor="secondary.basic"
                        border="1px solid var(--chakra-colors-border)"
                        borderRadius="4px"
                        _expanded={{
                          bg: 'secondary.basic',
                          borderBottom: 'none',
                          borderBottomRadius: '0',
                        }}
                      >
                        <Flex
                          flex="1"
                          flexDirection="row"
                          textAlign="left"
                          fontWeight="600"
                          fontSize="14px"
                          lineHeight="21px"
                        >
                          <Icon
                            as={
                              index === 0 ||
                              (index === 2 && isKYCAccepted) ||
                              (index === 1 && walletsAreVerified)
                                ? BsFillCheckCircleFill
                                : BsFillExclamationCircleFill
                            }
                            width={19}
                            height={19}
                            marginRight="11px"
                            color={
                              index === 0 ||
                              (index === 2 && isKYCAccepted) ||
                              (index === 1 && walletsAreVerified)
                                ? 'primary.basic'
                                : 'warning'
                            }
                          />
                          <div>{tabs[index]}</div>
                        </Flex>
                        {isExpanded ? (
                          <IoIosArrowForward
                            fontSize="20px"
                            style={{
                              transform: 'rotate(90deg)',
                              transition: 'transform 0.2s',
                            }}
                          />
                        ) : (
                          <IoIosArrowForward
                            fontSize="20px"
                            style={{ transition: 'transform 0.2s' }}
                          />
                        )}
                      </AccordionButton>
                      <AccordionPanel
                        border="1px solid var(--chakra-colors-border)"
                        borderTop="none"
                        borderBottomRadius="4px"
                        fontWeight="400"
                        fontSize="14px"
                        lineHeight="21px"
                      >
                        {tab}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            tabContent[selectedTab]
          )}
        </Flex>
      </Flex>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Fragment>
  );
};

export default ProfilePage;
