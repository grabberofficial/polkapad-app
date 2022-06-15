import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import * as React from 'react';
import styled from '@emotion/styled';
import { FaGithub, FaTwitter, FaTelegram } from 'react-icons/fa';
import { GoogleDocsViewer } from '@/components/GoogleDocsViewer/GoogleDocsViewer';
import { EmailSubscribeModal } from '@/components/EmailSubscribeModal/EmailSubscribeModal';

export const Footer = () => (
  <StyledContainer as="footer" role="contentinfo">
    <Stack
      spacing="8"
      direction={{ base: 'column', md: 'row' }}
      justify="center"
      py={{ base: '12', md: '16' }}
    >
      <FirstStack spacing={{ base: '6', md: '8' }} align="start">
        <Image
          src="/images/logo_footer.png"
          alt="Polkadot fundraising hub"
          width={240}
        />
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
              <StyledButton
                variant="link"
                as="a"
                target="_blank"
                href="https://polkapad.network/docs/general/whitepaper/"
              >
                Whitepaper
              </StyledButton>
              <StyledButton
                variant="link"
                as="a"
                target="_blank"
                href="https://github.com/polkapad/"
              >
                Github
              </StyledButton>
              <StyledButton
                variant="link"
                as="a"
                target="_blank"
                href="https://polkapad.network/docs/"
              >
                Docs
              </StyledButton>
              <StyledButton
                as="a"
                target="_blank"
                variant="link"
                href="https://polkapad.network/blog/"
              >
                Blog
              </StyledButton>
            </Stack>
          </Stack>
          <GeneralStack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="#49C7DA">
              General
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <StyledButton
                variant="link"
                as="a"
                target="_blank"
                href="https://polkapad.network/sales/"
              >
                IDO Sales
              </StyledButton>
              <StyledButton
                variant="link"
                as="a"
                target="_blank"
                href="https://polkapad.network/projects/"
              >
                Apply a Project
              </StyledButton>
              <StyledButton disabled variant="link" as="a" target="_blank">
                Polkapad Academy
              </StyledButton>
              <StyledButton disabled variant="link" as="a" target="_blank">
                Ambassadors room
              </StyledButton>
            </Stack>
          </GeneralStack>
          <CommunityStack spacing="4" minW="36" flex="1">
            <Text fontSize="sm" fontWeight="semibold" color="#49C7DA">
              Community
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <StyledButton
                variant="link"
                as="a"
                target="_blank"
                href="https://twitter.com/Polkapadnetwork"
              >
                Twitter
              </StyledButton>
              <StyledButton
                variant="link"
                as="a"
                target="_blank"
                href="https://t.me/polkapadnetwork"
              >
                Telegram
              </StyledButton>
              <StyledButton disabled variant="link" as="a" target="_blank">
                Telegram chat
              </StyledButton>
            </Stack>
          </CommunityStack>
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
            <EmailSubscribeModal
              control={(props) => (
                <SubscribeButton variant="primary" flexShrink={0} {...props}>
                  Subscribe
                </SubscribeButton>
              )}
            />
          </Stack>
        </LastStack>
      </Stack>
    </Stack>
    <Stack
      spacing="8"
      direction={{ base: 'column', md: 'row' }}
      justify="center"
      alignItems="baseline"
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
        <Stack direction={['column', 'row']} spacing="8">
          <Stack spacing="4" minW="36" flex="1">
            <GoogleDocsViewer
              title="Terms and Service"
              fileUrl="https://drive.google.com/file/d/1QxeZEdb-QzQy5Ra6eD8kJcmPS1khLiAq/preview"
              control={(props) => (
                <Button
                  {...props}
                  variant="link"
                  as="a"
                  fontSize="sm"
                  color="#8E8E8E"
                  cursor="pointer"
                >
                  Terms and Service
                </Button>
              )}
            />
          </Stack>
          <Stack spacing="4" minW="36" flex="1">
            <GoogleDocsViewer
              title="Privacy Policy"
              fileUrl="https://drive.google.com/file/d/1kO34-LSkXup8c3vsspK0XILTKvKoxw8k/preview"
              control={(props) => (
                <Button
                  {...props}
                  variant="link"
                  as="a"
                  fontSize="sm"
                  color="#8E8E8E"
                  cursor="pointer"
                >
                  Privacy Policy
                </Button>
              )}
            />
          </Stack>
        </Stack>
        <LastStack spacing="4">
          <ButtonGroup variant="ghost">
            <StyledIconButton
              as="a"
              href="https://twitter.com/Polkapadnetwork"
              target="_blank"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
            <StyledIconButton
              as="a"
              href="https://t.me/polkapadnetwork"
              target="_blank"
              aria-label="Telegram"
              icon={<FaTelegram fontSize="1.25rem" />}
            />
            <StyledIconButton
              as="a"
              aria-label="GitHub"
              target="_blank"
              href="https://github.com/polkapad/"
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

const CommunityStack = styled(Stack)`
  display: none;
  @media screen and (min-width: 30em) {
    display: block;
  }
`;

const GeneralStack = styled(Stack)`
  margin-left: 0 !important;
  @media screen and (min-width: 30em) {
    margin-left: inherit;
  }
`;

export const FooterWrapper = styled.div`
  margin-top: 60px;
  @media screen and (min-width: 30em) {
    margin-top: 90px;
  }
  @media screen and (min-width: 48em) {
    margin-top: 120px;
  }
`;
