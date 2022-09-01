import {
  GearApi,
  GearKeyring,
  getWasmMetadata,
  TransferData,
} from '@gear-js/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { BN, u8aToHex } from '@polkadot/util';
import toast from 'react-hot-toast';
import { decodeAddress } from '@polkadot/util-crypto';
import { plpdContractPublicKey, rootSeed } from '@/config/env';

// @ts-ignore
import fungibleTokenMetaWasm from '@/contracts/meta/fungible_token.meta.wasm';

const providerAddress = 'wss://rpc-node.gear-tech.io:443';
const balanceToTransfer = new BN('1000000000');

interface PLPDBalance {
  Balance: string;
}

interface ResponseTransferBalance {
  status?: string;
  transferredBalance?: string;
  error?: string;
}

let gearApi: GearApi;
let rootKeyRing: KeyringPair;

async function connect() {
  rootKeyRing = await GearKeyring.fromSeed(rootSeed);
  gearApi = await GearApi.create({ providerAddress });
  gearApi.on('error', () => {
    GearApi.create({ providerAddress }).then(
      (newApi) => {
        gearApi = newApi;
      },
      (error) => {
        throw error;
      },
    );
  });
}

async function transferBalance(
  to: string,
  from: KeyringPair = rootKeyRing,
  balance: BN = balanceToTransfer,
): Promise<ResponseTransferBalance> {
  try {
    await transfer(from, to, balance);
    toast.success('Claim successful');
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong');
  }
  return { status: 'ok', transferredBalance: balance.toString() };
}

async function transfer(
  from: KeyringPair = rootKeyRing,
  to: string,
  balance: BN,
): Promise<TransferData> {
  gearApi.balance.transfer(to, balance);
  return new Promise((resolve, reject) => {
    gearApi.balance.signAndSend(from, ({ events }) => {
      events.forEach(({ event: { method, data } }) => {
        if (method === 'Transfer') {
          resolve(data as TransferData);
        } else if (method === 'ExtrinsicFailed') {
          reject(data);
        }
      });
    });
  });
}

async function getBalance(address: string) {
  if (gearApi) {
    return await gearApi.balance.findOut(address);
  }
}

async function getPLPDBalance(address: string) {
  const payload = {
    BalanceOf: u8aToHex(decodeAddress(address)),
  };

  if (gearApi) {
    const balance = await gearApi.programState.read(
      plpdContractPublicKey,
      fungibleTokenMetaWasm,
      payload,
    );

    return balance.toHuman() as unknown as PLPDBalance;
  }
}

async function sendMessage(
  sourcePublicKey: `0x${string}`,
  address: string,
  payload: string,
) {
  const value = 0;
  const isOtherPanicsAllowed = false;
  const metadata = await getWasmMetadata(fungibleTokenMetaWasm);

  if (gearApi) {
    try {
      const gas = await gearApi.program.calculateGas.handle(
        sourcePublicKey,
        plpdContractPublicKey,
        payload,
        value,
        isOtherPanicsAllowed,
        metadata,
      );

      const message = {
        destination: plpdContractPublicKey,
        payload,
        gasLimit: gas.min_limit.toNumber(),
        value,
      };

      await gearApi.message.send(message, metadata);
      await gearApi.message.signAndSend(rootKeyRing);
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }
}

async function approvePLPD(address: string) {
  const sourcePublicKey = u8aToHex(rootKeyRing.publicKey);
  const payload = JSON.stringify({
    Approve: {
      to: u8aToHex(decodeAddress(address)),
      amount: '5',
    },
  });

  await sendMessage(sourcePublicKey, address, payload);
}

async function transferPLPD(address: string) {
  const sourcePublicKey = u8aToHex(rootKeyRing.publicKey);
  const payload = JSON.stringify({
    Transfer: {
      from: sourcePublicKey,
      to: u8aToHex(decodeAddress(address)),
      amount: '5',
    },
  });

  await sendMessage(sourcePublicKey, address, payload);
}

async function claimPLPD(address: string) {
  await approvePLPD(address);
  await transferPLPD(address);
}

export const gearService = {
  connect,
  transferBalance,
  getBalance,
  getPLPDBalance,
  claimPLPD,
};
