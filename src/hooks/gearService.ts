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
import {
  plpdContractPublicKey,
  rootSeed,
  stakingContractPublicKey,
} from '@/config/env';

// @ts-ignore
import fungibleTokenMeta from '@/contracts/meta/fungible_token.meta.wasm';
// @ts-ignore
import stakingContractMeta from '@/contracts/meta/polkapad_staking.meta.wasm';
import { Signer } from '@polkadot/api/types';

const providerAddress = 'wss://rpc-node.gear-tech.io:443';
const balanceToTransfer = new BN('500000000000');
const CLAIM_PLPD_AMOUNT = '10';

interface PLPDBalance {
  Balance: string;
}

interface StakedPLPDBalance {
  Staked: string;
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
      fungibleTokenMeta,
      payload,
    );

    return balance.toHuman() as unknown as PLPDBalance;
  }
}

async function sendMessage(
  sourcePublicKey: `0x${string}`,
  contractAddress: `0x${string}`,
  contractMeta: Buffer,
  payload: string,
  ...signer: [any, any?]
) {
  const value = 0;
  const isOtherPanicsAllowed = false;
  const metadata = await getWasmMetadata(contractMeta);

  if (gearApi) {
    try {
      const gas = await gearApi.program.calculateGas.handle(
        sourcePublicKey,
        contractAddress,
        payload,
        value,
        isOtherPanicsAllowed,
        metadata,
      );

      const message = {
        destination: contractAddress,
        payload,
        gasLimit: gas.min_limit.toNumber(),
        value,
      };

      await gearApi.message.send(message, metadata);
      await gearApi.message.signAndSend(...signer);
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  }
}

async function approvePLPD(address: string) {
  const sourcePublicKey = u8aToHex(rootKeyRing.publicKey);
  const actorId = u8aToHex(decodeAddress(address));
  const payload = JSON.stringify({
    Approve: {
      to: actorId,
      amount: CLAIM_PLPD_AMOUNT,
    },
  });

  await sendMessage(
    sourcePublicKey,
    plpdContractPublicKey,
    fungibleTokenMeta,
    payload,
    rootKeyRing,
  );
}

async function transferPLPD(address: string) {
  const sourcePublicKey = u8aToHex(rootKeyRing.publicKey);
  const payload = JSON.stringify({
    Transfer: {
      from: sourcePublicKey,
      to: u8aToHex(decodeAddress(address)),
      amount: CLAIM_PLPD_AMOUNT,
    },
  });

  await sendMessage(
    sourcePublicKey,
    plpdContractPublicKey,
    fungibleTokenMeta,
    payload,
    rootKeyRing,
  );
  toast.success('Claim successful');
}

async function claimPLPD(address: string) {
  await approvePLPD(address);
  await transferPLPD(address);
}

async function getStakedPLPDBalance(address: string) {
  const payload = {
    StakeOf: u8aToHex(decodeAddress(address)),
  };

  if (gearApi) {
    const balance = await gearApi.programState.read(
      stakingContractPublicKey,
      stakingContractMeta,
      payload,
    );

    return balance.toHuman() as unknown as StakedPLPDBalance;
  }
}

async function stakePLPD(address: string, signer: Signer, amount: string) {
  const sourcePublicKey = u8aToHex(decodeAddress(address));
  const payload = JSON.stringify({
    Stake: amount,
  });

  await sendMessage(
    sourcePublicKey,
    stakingContractPublicKey,
    stakingContractMeta,
    payload,
    address,
    { signer },
  );
}

async function withdrawPLPD(address: string, signer: Signer, amount: string) {
  const sourcePublicKey = u8aToHex(decodeAddress(address));
  const payload = JSON.stringify({
    Withdraw: amount,
  });

  await sendMessage(
    sourcePublicKey,
    stakingContractPublicKey,
    stakingContractMeta,
    payload,
    address,
    { signer },
  );
}

export const gearService = {
  connect,
  transferBalance,
  getBalance,
  getPLPDBalance,
  claimPLPD,
  getStakedPLPDBalance,
  stakePLPD,
  withdrawPLPD,
};
