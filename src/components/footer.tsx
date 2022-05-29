import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import styled from '@emotion/styled';
import { FaGithub, FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';
import { Logo } from './logo';

export const Footer = () => (
  <StyledContainer as="footer" role="contentinfo">
    <Stack
      spacing="8"
      direction={{ base: 'column', md: 'row' }}
      justify="center"
      py={{ base: '12', md: '16' }}
    >
      <FirstStack spacing={{ base: '6', md: '8' }} align="start">
        <Logo />
        <Text color="#8E8E8E">
          The fully decentralized protocol for launching new ideas
        </Text>
      </FirstStack>
      <Stack
        direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
        spacing={{ base: '12', md: '8' }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="#49C7DA">
              Resources
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <StyledButton variant="link" href="https://polkapad.network/docs/general/whitepaper/">Whitepaper</StyledButton>
              <StyledButton variant="link" href="https://github.com/polkapad/">Github</StyledButton>
              <StyledButton variant="link" href="https://polkapad.network/docs/general/whitepaper/">Docs</StyledButton>
              <StyledButton variant="link" href="https://polkapad.network/blog/">Blog</StyledButton>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="#49C7DA">
              General
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <StyledButton variant="link" href="https://polkapad.network/sales/">IDO Sales</StyledButton>
              <StyledButton variant="link">Apply a Project</StyledButton>
              <StyledButton variant="link">Polkapad Academy</StyledButton>
              <StyledButton variant="link">Ambassadors room</StyledButton>
            </Stack>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="#49C7DA">
              Community
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <StyledButton variant="link" href="https://twitter.com/Polkapadnetwork">Twitter</StyledButton>
              <StyledButton variant="link" href="https://t.me/polkapadnetwork">Telegram</StyledButton>
              <StyledButton variant="link">Discord</StyledButton>
            </Stack>
          </Stack>
        </Stack>
        <LastStack spacing="4">
          <Text fontSize="sm" fontWeight="semibold" color="#49C7DA">
            Join <StyledText>PolkaPad&apos;s</StyledText> mailing list
          </Text>
          <Stack
            spacing="4"
            direction={{ base: 'column', sm: 'row' }}
            maxW={{ lg: '360px' }}
            pt="7px"
          >
            <SubscribeButton variant="primary" type="submit" flexShrink={0}>
              Subscribe
            </SubscribeButton>
          </Stack>
        </LastStack>
      </Stack>
    </Stack>
    <Stack
      spacing="8"
      direction={{ base: 'column', md: 'row' }}
      justify="center"
      py={{ base: '12', md: '16' }}
    >
      <FirstStack spacing={{ base: '6', md: '8' }} align="start">
        <Text fontSize="sm" color="#8E8E8E">
          &copy; PAD {new Date().getFullYear()} All Rights Reserved
        </Text>
      </FirstStack>
      <Stack
        direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
        spacing={{ base: '12', md: '8' }}
      >
        <Stack direction="row" spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" color="#8E8E8E">
              Terms & Conditions
            </Text>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" color="#8E8E8E">
              Privacy Policy
            </Text>
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" color="#8E8E8E">
              Cookie Settings
            </Text>
          </Stack>
        </Stack>
        <LastStack spacing="4">
          <ButtonGroup variant="ghost">
            <StyledIconButton
              as="a"
              href="https://twitter.com/Polkapadnetwork"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
            <StyledIconButton
              as="a"
              href="https://t.me/polkapadnetwork"
              aria-label="Telegram"
              icon={<FaTelegram fontSize="1.25rem" />}
            />
            <StyledIconButton
              as="a"
              href="#"
              aria-label="Discord"
              icon={<FaDiscord fontSize="1.25rem" />}
            />
            <StyledIconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </LastStack>
      </Stack>
    </Stack>
  </StyledContainer>
);

const StyledContainer = styled(Container)`
  background: #303030;
  max-width: 100%;
`;

const StyledButton = styled(Button)`
  color: white;
`;

const SubscribeButton = styled(Button)`
  background: #49c7da;
  color: white;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  padding: 13px 69px;
`;

const FirstStack = styled(Stack)`
  width: 250px;
`;

const LastStack = styled(Stack)`
  width: 250px;
`;

const StyledIconButton = styled(IconButton)`
  border: 1px solid #404040;
  svg {
    color: white;
  }
  &:hover {
    background: #3a3a3a;
  }
`;

const StyledText = styled(Text)`
  color: white;
  display: inline-block;
`;
