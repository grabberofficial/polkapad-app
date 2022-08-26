import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from '@chakra-ui/react';
import { Heading } from '@/components/common/HeadingWithUnderline/HeadingWithUnderline';
import { faq } from '@/components/pages/Staking/StakingPage.constants';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export const FAQStaking = () => {
  return (
    <Flex
      style={{ display: 'none' }}
      marginTop="250px"
      padding="89px 79px 113px 115px"
      flexDirection="column"
    >
      <Flex flexBasis="100%">
        <Heading marginBottom={75} withUnderline>
          FAQ
        </Heading>
      </Flex>
      <Flex width="100%" margin="0 -13px">
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          w="100%"
          mx="auto"
          sx={{ columnCount: [1, 2], columnGap: '26px' }}
        >
          {faq.map(({ text, title }, index) => (
            <AccordionItem
              margin="13px"
              flexBasis="48%"
              border="none"
              backgroundColor="#F6F5F5"
              key={index}
              display="inline-block"
              w="100%"
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      padding="20px 25px"
                      color="secondary.text"
                      _expanded={{ bg: 'background.dark', color: 'white' }}
                    >
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="600"
                        fontSize="14px"
                        lineHeight="21px"
                      >
                        {title}
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="20px" color="#32BBCF" />
                      ) : (
                        <AddIcon fontSize="20px" color="#32BBCF" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    padding="0px 155px 19px 25px"
                    background="background.dark"
                    color="#F6F5F5"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="21px"
                  >
                    {text}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </Flex>
  );
};
