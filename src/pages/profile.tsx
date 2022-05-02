import React, { useCallback, useEffect } from 'react';
import { Heading } from '@/components/HeadingWithUnderline/HeadingWithUnderline';
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

const tabs = [
  'Profile details',
  'KYC Verification',
  'Verify wallet',
  'Register as Validator',
];

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

  return (
    <Flex padding="76px 155px 0" flexDirection="column">
      <Heading marginBottom={101} withUnderline>
        User Profile
      </Heading>

      <Flex>
        <Flex direction="column" gap="30px" flexBasis="40%">
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
                  index === selectedTab
                    ? BsFillCheckCircleFill
                    : BsFillExclamationCircleFill
                }
                color={index === selectedTab ? '#49C7DA' : '#FFCC15'}
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
        <Flex flexBasis="356px" as="form" flexDirection="column" gap="28px">
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
                    color="#49C7DA"
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
                    color="#49C7DA"
                  />
                </Flex>
              </InputLeftElement>
              <FormInput fieldName="email" hasError={false} control={control} />
            </InputGroup>
          </FormControl>
        </Flex>
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
