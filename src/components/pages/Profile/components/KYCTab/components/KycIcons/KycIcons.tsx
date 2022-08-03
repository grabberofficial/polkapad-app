import { Flex, Image, Text } from '@chakra-ui/react';
import nationalIdIcon from '@/assets/national_id.svg';
import passportIcon from '@/assets/passport.svg';
import drivingLicenseIcon from '@/assets/driving_license.svg';
import { useIsMobile } from '@/hooks/useIsMobile';

interface KycIconsProps {
  direction?: 'column' | 'row';
}

export const KycIcons = ({ direction = 'column' }: KycIconsProps) => {
  const isMobile = useIsMobile();

  return (
    <Flex flexDirection={isMobile ? 'column' : direction} gap="12px">
      <Flex alignItems="center" height="36px">
        <Flex
          borderRadius="50%"
          backgroundColor="kycIcons"
          width="36px"
          height="36px"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={nationalIdIcon} width="22px" height="14px" />
        </Flex>
        <Text fontWeight={600} marginLeft="20px" fontSize={12}>
          National ID
        </Text>
      </Flex>
      <Flex alignItems="center" height="36px">
        <Flex
          borderRadius="50%"
          backgroundColor="kycIcons"
          width="36px"
          height="36px"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={passportIcon} width="15px" height="21px" />
        </Flex>
        <Text fontWeight={600} marginLeft="20px" fontSize={12}>
          Passport
        </Text>
      </Flex>
      <Flex alignItems="center" height="36px">
        <Flex
          borderRadius="50%"
          backgroundColor="kycIcons"
          width="36px"
          height="36px"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={drivingLicenseIcon} width="22px" height="17px" />
        </Flex>
        <div>
          <Text fontWeight={600} marginLeft="20px" fontSize={12}>
            Driving license
          </Text>
          <Text marginLeft="20px" fontSize={12} color="secondary.textLight">
            Coming soon
          </Text>
        </div>
      </Flex>
    </Flex>
  );
};
