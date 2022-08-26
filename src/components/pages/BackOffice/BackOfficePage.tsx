import { useState } from 'react';
import { formatEther } from 'ethers/lib/utils';
import { useRouter } from 'next/router';
import { Button } from '@/components/common/Button';
import { HOME_ROUTE } from '@/constants/routes';
import {
  add,
  changeClientAllocationSize,
  getClientAllocationSize,
  getDefaultAllocationSize,
  getPlpdPrice,
  lock,
  remove,
  setPlpdPrice,
} from '@/services/contracts';
import { isProduction } from '@/utils/general';
import {
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEthers } from '@usedapp/core';

export const BackOfficePage = () => {
  const router = useRouter();

  if (isProduction) {
    router.push(HOME_ROUTE);
  }

  const { account } = useEthers();

  const [loading, setLoading] = useState(false);
  const [defaultAllocationSize, setDefaultAllocationSize] = useState('0');
  const [allocationSize, setAllocationSize] = useState('0');
  const [allocationSizeAddress, setAllocationSizeAddress] = useState('');
  const [maxAllocationSize, setMaxAllocationSize] = useState(0);

  const [plpdPrice, setPlpd] = useState('');
  const [plpdPriceNum, setPlpdNum] = useState(0);

  const getAllocationSize = async () => {
    if (!account) return;

    setLoading(true);
    const allocationSize = formatEther(
      await getDefaultAllocationSize(),
    ).toString();
    setLoading(false);

    setDefaultAllocationSize(allocationSize);
  };

  const getAllocationSizeByAddress = async () => {
    if (!account) return;

    setLoading(true);
    const allocationSize = formatEther(
      await getClientAllocationSize(allocationSizeAddress),
    ).toString();
    setLoading(false);

    setAllocationSize(allocationSize);
  };

  const changeAllocationSizeByAddress = async () => {
    if (!account) return;

    setLoading(true);
    await changeClientAllocationSize(
      account,
      allocationSizeAddress,
      maxAllocationSize,
    );
    setLoading(false);
  };

  const addToWhitelist = async () => {
    if (!account) return;

    setLoading(true);
    await add(account, allocationSizeAddress, maxAllocationSize);
    setLoading(false);
  };

  const removeFromWhitelist = async () => {
    if (!account) return;

    setLoading(true);
    await remove(account, allocationSizeAddress);
    setLoading(false);
  };

  const lockAllocation = async () => {
    if (!account) return;

    setLoading(true);
    await lock(account, maxAllocationSize);
    setLoading(false);
  };

  const getPLPDPrice = async () => {
    if (!account) return;

    setLoading(true);
    const plpdPrice = formatEther(await getPlpdPrice()).toString();
    setLoading(false);

    setPlpd(plpdPrice);
  };

  const setPLPDPrice = async () => {
    if (!account) return;

    setLoading(true);
    await setPlpdPrice(account, plpdPriceNum);
    setLoading(false);
  };

  return (
    <Flex flexDirection={'column'} padding={'10px'}>
      <Stack maxWidth={'350px'} padding={'10px'} direction="column">
        <Text fontSize="xl" fontWeight="bold">
          Locker
        </Text>
        <Divider />

        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>Lock (execute by whitelisted address only)</FormLabel>
            <FormHelperText>Allocation Size</FormHelperText>
            <Input
              onChange={(event: any) => {
                setMaxAllocationSize(event.currentTarget.value);
              }}
            />
            <Button
              marginTop={'10px'}
              onClick={lockAllocation}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Lock'}
            </Button>
          </FormControl>
        </Flex>

        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>Get PLPD price</FormLabel>
            <Button
              onClick={getPLPDPrice}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Get'}
            </Button>
            <Text fontSize="xl" fontWeight="bold">
              {plpdPrice ? plpdPrice : 0} USD
            </Text>
          </FormControl>
        </Flex>

        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>
              Set PLPD price (execute by multisig address only)
            </FormLabel>
            <FormHelperText>Price</FormHelperText>
            <Input
              onChange={(event: any) => {
                setPlpdNum(event.currentTarget.value as number);
              }}
            />
            <Button
              marginTop={'10px'}
              onClick={setPLPDPrice}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Set'}
            </Button>
          </FormControl>
        </Flex>
      </Stack>
      <Stack maxWidth={'350px'} padding={'10px'} direction="column">
        <Text fontSize="xl" fontWeight="bold">
          Whitelist
        </Text>
        <Divider />

        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>Get default max allocation size</FormLabel>
            <Button
              onClick={getAllocationSize}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Get'}
            </Button>
            <Text fontSize="xl" fontWeight="bold">
              {defaultAllocationSize ? defaultAllocationSize : 0} USD
            </Text>
          </FormControl>
        </Flex>

        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>Get max allocation size by address</FormLabel>
            <FormHelperText>Address</FormHelperText>
            <Input
              onChange={(event: any) => {
                setAllocationSizeAddress(event.currentTarget.value);
              }}
              // control={formControl}
            />
            <Button
              marginTop={'10px'}
              onClick={getAllocationSizeByAddress}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Get'}
            </Button>
            <Text fontSize="xl" fontWeight="bold">
              {allocationSize ? allocationSize : 0} USD
            </Text>
          </FormControl>
        </Flex>

        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>
              Change max allocation size of address (execute by multisig only)
            </FormLabel>
            <FormHelperText>Address</FormHelperText>
            <Input
              onChange={(event: any) => {
                setAllocationSizeAddress(event.currentTarget.value);
              }}
              // control={formControl}
            />
            <FormHelperText>Max Allocation Size</FormHelperText>
            <Input
              onChange={(event: any) => {
                setMaxAllocationSize(event.currentTarget.value);
              }}
              // control={formControl}
            />
            <Button
              marginTop={'10px'}
              onClick={changeAllocationSizeByAddress}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Change'}
            </Button>
          </FormControl>
        </Flex>

        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>Add to whitelist (execute by multisig only)</FormLabel>
            <FormHelperText>Address</FormHelperText>
            <Input
              onChange={(event: any) => {
                setAllocationSizeAddress(event.currentTarget.value);
              }}
              // control={formControl}
            />
            <FormHelperText>Max Allocation Size</FormHelperText>
            <Input
              onChange={(event: any) => {
                setMaxAllocationSize(event.currentTarget.value);
              }}
              // control={formControl}
            />
            <Button
              marginTop={'10px'}
              onClick={addToWhitelist}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Add'}
            </Button>
          </FormControl>
        </Flex>
        <Flex alignItems={'center'} marginTop={'10px'} padding={'10px'}>
          <FormControl>
            <FormLabel>
              Remove from whitelist (execute by multisig only)
            </FormLabel>
            <FormHelperText>Address</FormHelperText>
            <Input
              onChange={(event: any) => {
                setAllocationSizeAddress(event.currentTarget.value);
              }}
              // control={formControl}
            />
            <Button
              marginTop={'10px'}
              onClick={removeFromWhitelist}
              variant="primary"
              width="100px"
              type="submit"
            >
              {loading ? <Spinner /> : 'Remove'}
            </Button>
          </FormControl>
        </Flex>
      </Stack>
    </Flex>
  );
};
