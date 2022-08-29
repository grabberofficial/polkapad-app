import { GearApi, GearKeyring, TransferData } from '@gear-js/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { BN } from '@polkadot/util';
import toast from 'react-hot-toast';
// import fungibleTokenMetaWasm from '@/contracts/meta/fungible_token.meta.wasm';

const providerAddress = 'wss://rpc-node.gear-tech.io:443';
const balanceToTransfer = new BN('10000000000');

interface ResponseTransferBalance {
  status?: string;
  transferredBalance?: string;
  error?: string;
}

let gearApi: GearApi;
let aliceKeyRing: KeyringPair;

async function connect() {
  aliceKeyRing = await GearKeyring.fromSuri('//Bob');
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
  from: KeyringPair = aliceKeyRing,
  balance: BN = balanceToTransfer,
): Promise<ResponseTransferBalance> {
  try {
    await transfer(from, to, balance);
    toast.success('Claim successful');
  } catch (error) {
    console.error(error, '[error]');
    toast.error('Something went wrong');
  }
  return { status: 'ok', transferredBalance: balance.toString() };
}

async function transfer(
  from: KeyringPair = aliceKeyRing,
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

// async function claimPLPD() {
//   const sendMessageToFToken = useSendMessage(seed, fungibleTokenMetaWasm);
// }

export const gearService = { connect, transferBalance, getBalance };
