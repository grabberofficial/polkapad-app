import { Flex, Image, Text } from '@chakra-ui/react';
import successful_kyc from '@/assets/successful_kyc.svg';
import { Button } from '@/components/common/Button';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import { VerificationInProgress } from '@/components/pages/Profile/components/KYCTab/components/VerificationInProgress/VerificationInProgress';
import { KycIcons } from '@/components/pages/Profile/components/KYCTab/components/KycIcons/KycIcons';
import { VerificationDisrupted } from '@/components/pages/Profile/components/KYCTab/components/VerificationDisrupted/VerificationDisrupted';
import React, { useCallback, useContext } from 'react';
import { KycStatusTypes } from '@/pages/api/kycStatus';
import { sendMetricsStartKYC } from '@/services/metrics';
import { useIsMobile } from '@/hooks/useIsMobile';
import { KYCContext } from '@/components/pages/Profile/components/KYCProvider/KYCProvider';
import { useRouter } from 'next/router';
import { WalletsContext } from '@/components/pages/Profile/components/WalletsProvider/WalletsProvider';
import {
  API_KYC_ROUTE,
  LOCKER_ROUTE,
  MOBILE_KYC_ROUTE,
} from '@/constants/routes';

export const KYCTab = () => {
  const isMobile = useIsMobile();
  const {
    isKYCAccepted,
    isKYCNotVerified,
    isKYCBlocked,
    isKYCInProgress,
    isKYCDeclined,
    setKYCStatus,
  } = useContext(KYCContext);
  const { walletsAreVerified } = useContext(WalletsContext);
  const router = useRouter();

  const startKyc = useCallback(async () => {
    if (isMobile) {
      router.push(MOBILE_KYC_ROUTE);
      return;
    }
    if (typeof window !== 'undefined') {
      setKYCStatus(KycStatusTypes.IN_PROGRESS);
      const kyc = await fetch(API_KYC_ROUTE).then((data) => data.json());
      sendMetricsStartKYC();
      window.open(kyc.iframeUrl);
    }
  }, [isMobile, router, setKYCStatus]);

  return (
    <Flex
      flexBasis={isKYCAccepted ? '404px' : '800px'}
      flexDirection="column"
      gap={isKYCAccepted ? '28px' : '9px'}
      key="kyc"
      marginBottom="60px"
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
              onClick={() => router.push(LOCKER_ROUTE)}
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
          alignItems={isMobile ? 'center' : 'flex-start'}
          justifyContent="center"
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
    </Flex>
  );
};
