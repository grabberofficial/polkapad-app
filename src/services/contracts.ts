import { ethers } from 'ethers';
import Locker from '../constants/abi/Locker.json';
import Whitelist from '../constants/abi/Whitelist.json';
import Polkadot from '../constants/abi/Polkadot.json';
import { DOT_BSC } from '@/config/network';

export enum ADDRESS {
  WHITELIST = '0xaB8CC909Fa3BD4b7045f74874f6343903E5471ef',
  LOCKER = '0x77fb21119fb06afBa01aA02CA20dBFbB43432591'
}

export const lock = async (address: string, allocationSize: number) => {
  await approve(address, allocationSize);

  const provider = new ethers.providers.Web3Provider(window.ethereum as any)
  const signer = provider.getSigner(address)

  const transactionCount = await provider.getTransactionCount(address);

  const locker = new ethers.Contract(ADDRESS.LOCKER, Locker.abi, provider);
  const signedLocker = locker.connect(signer);

  const allocation = ethers.utils.parseUnits(allocationSize.toString(), 18);

  const transaction = await signedLocker.lock(allocation, {
    gasLimit: ethers.utils.hexlify(500000),
    nonce: ethers.utils.hexlify(transactionCount),
  });

  await transaction.wait();

  console.log('lock', await locker._locks(address));
}

export const setPlpdPrice = async (address: string, price: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any)
  const signer = provider.getSigner(address)

  const transactionCount = await provider.getTransactionCount(address);

  const locker = new ethers.Contract(ADDRESS.LOCKER, Locker.abi, provider);
  const signedLocker = locker.connect(signer);

  const plpdPrice = ethers.utils.parseUnits(price.toString(), 18);

  const transaction = await signedLocker.setPlpdPrice(plpdPrice, {
    gasLimit: ethers.utils.hexlify(100000),
    nonce: ethers.utils.hexlify(transactionCount),
  });

  await transaction.wait();
}

export const getPlpdPrice = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const locker = new ethers.Contract(ADDRESS.LOCKER, Locker.abi, provider);

  return await locker._plpdPrice();
}

export const add = async (signerAddress: string, address: string, maxAllocationSize: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any)
  const signer = provider.getSigner(signerAddress)

  const transactionCount = await provider.getTransactionCount(signerAddress);

  const whitelist = new ethers.Contract(ADDRESS.WHITELIST, Whitelist.abi, provider);
  const signedWhitelist = whitelist.connect(signer);

  const transaction = await signedWhitelist.add(address, maxAllocationSize, {
    gasLimit: ethers.utils.hexlify(100000),
    nonce: ethers.utils.hexlify(transactionCount),
  });

  await transaction.wait();
}

export const remove = async (signerAddress: string, address: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any)
  const signer = provider.getSigner(signerAddress)

  const transactionCount = await provider.getTransactionCount(signerAddress);

  const whitelist = new ethers.Contract(ADDRESS.WHITELIST, Whitelist.abi, provider);
  const signedWhitelist = whitelist.connect(signer);

  const transaction = await signedWhitelist.remove(address, {
    gasLimit: ethers.utils.hexlify(100000),
    nonce: ethers.utils.hexlify(transactionCount),
  });

  await transaction.wait();
}

export const activateBurning = async (account: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any)
  const signer = provider.getSigner(account)

  const transactionCount = await provider.getTransactionCount(account);

  const locker = new ethers.Contract(ADDRESS.LOCKER, Locker.abi, provider);
  const signedLocker = locker.connect(signer);

  const transaction = await signedLocker.activateBurning({
    gasLimit: ethers.utils.hexlify(100000),
    nonce: ethers.utils.hexlify(transactionCount),
  });

  await transaction.wait();

  console.log('can Burn', await signedLocker._canBurn());
}

export const getDefaultAllocationSize = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const whitelist = new ethers.Contract(ADDRESS.WHITELIST, Whitelist.abi, provider);

  return await whitelist.defaultAllocationSize();
}

export const getClientAllocationSize = async (client: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const whitelist = new ethers.Contract(ADDRESS.WHITELIST, Whitelist.abi, provider);

  return await whitelist.allocationSizes(client);
}

export const changeClientAllocationSize = async (account: string, client: string, maxAllocationSize: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const whitelist = new ethers.Contract(ADDRESS.WHITELIST, Whitelist.abi, provider);
  const signer = provider.getSigner(account)

  const signedWhitelist = whitelist.connect(signer);

  const transactionCount = await provider.getTransactionCount(account);

  const newMaxAllocationSize = ethers.utils.parseUnits(maxAllocationSize.toString(), 18);

  const transaction = await signedWhitelist.changeAllocationSize(client, newMaxAllocationSize, {
    gasLimit: ethers.utils.hexlify(100000),
    nonce: ethers.utils.hexlify(transactionCount),
  });

  await transaction.wait();
}

export const getDotPrice = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const locker = new ethers.Contract(ADDRESS.LOCKER, Locker.abi, provider);

  const dotPrice = (await locker.getLatestPrice()).toString();

  console.log('dot price', dotPrice);
}

export const getBurnFlag = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const locker = new ethers.Contract(ADDRESS.LOCKER, Locker.abi, provider);

  const canBurn = (await locker._canBurn()).toString();

  console.log('can burn', canBurn);
}

export const approve = async (address: string, allocationSize: number) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any)
  const signer = provider.getSigner(address)

  const transactionCount = await provider.getTransactionCount(address);

  const polkadot = new ethers.Contract(DOT_BSC, Polkadot.abi, provider);
  const signedPolkadot = polkadot.connect(signer);

  const allocation = ethers.utils.parseUnits(allocationSize.toString(), 18);
  // const estimatedGas = await signedLocker.estimateGas.lock(allocation);
  // console.log('estimatedGas', estimatedGas);

  const transaction = await signedPolkadot.approve(ADDRESS.LOCKER, allocation, {
    gasLimit: ethers.utils.hexlify(100000),
    nonce: ethers.utils.hexlify(transactionCount),
  });

  await transaction.wait();
}

