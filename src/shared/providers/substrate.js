import React, { useReducer, useContext, useEffect, useCallback } from 'react';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { formatEther } from 'ethers/lib/utils';

import { UserContext } from '../providers/userContext';
import { sendMetricsStartedConnectionPolkadot } from '@/services/metrics';

const POLKA_CONNECT_KEY = 'shouldConnectPolka';
const connectedSocket = 'wss://kusama-rpc.polkadot.io';
const RPC = {};
const CUSTOM_TYPES = {};
export const DEVELOPMENT_KEYRING = false;
const APP_NAME = 'Polkapad';
export const CONNECTED_ACCOUNTS_STORAGE = 'connected_accounts_polka';

// console.log(`Connected socket: ${connectedSocket}`);

///
// Initial state for `useReducer`

const INIT_STATE = {
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...RPC },
  types: CUSTOM_TYPES,
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  // isReady: false,
  isConnected: false,
  balance: null,
  account: null,
  connectToPolka: null,
  disconnect: null,
  canUseWallet: false,
};

///
// Reducer function for `useReducer`

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' };

    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' };

    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY', isConnected: true };

    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload };

    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' };

    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' };

    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' };
    case 'LOAD_CONNECT_CALLBACK':
      return {
        ...state,
        connectToPolka: action.payload.connectToPolka,
        disconnect: action.payload.disconnect,
      };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'DISCONNECT':
      return { ...state, account: null, balance: null, isConnected: false };
    case 'CAN_USE_WALLET':
      return { ...state, canUseWallet: true };

    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// Connecting to the Substrate node

const connect = (state, dispatch) => {
  try {
    const { apiState, socket, jsonrpc, types } = state;
    // We only want this function to be performed once
    if (apiState) return;

    dispatch({ type: 'CONNECT_INIT' });

    const provider = new WsProvider(socket);
    const _api = new ApiPromise({ provider, types, rpc: jsonrpc });
    provider.on('disconnected', () => console.log('provider', 'disconnected'));
    // Set listeners for disconnection and reconnection event.
    _api.on('connected', () => {
      dispatch({ type: 'CONNECT', payload: _api });
      // `ready` event is not emitted upon reconnection and is checked explicitly here.
      _api.isReady.then(() => dispatch({ type: 'CONNECT_SUCCESS' }));
    });
    _api.on('disconnected', () => console.log('api', 'disconnected'));
    _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
    _api.on('error', (err) =>
      dispatch({ type: 'CONNECT_ERROR', payload: err }),
    );
    return _api;
  } catch (error) {
    console.error(error);
  }
};

///
// Loading accounts from dev and polkadot-js extension

let loadAccts = false;
const loadAccounts = async (state, dispatch) => {
  const asyncLoadAccounts = async () => {
    const polkadotExtensionDapp = await import('@polkadot/extension-dapp');
    dispatch({ type: 'LOAD_KEYRING' });
    try {
      const extensions = await polkadotExtensionDapp.web3Enable(APP_NAME);
      // const savedAccounts = localStorage.getItem(CONNECTED_ACCOUNTS_STORAGE);
      // const accounts = JSON.parse(savedAccounts);
      // if (accounts && accounts.length > 0) {
      //   keyring.loadAll({ isDevelopment: DEVELOPMENT_KEYRING }, accounts);
      //   dispatch({ type: 'SET_KEYRING', payload: keyring });
      // } else {
      // }
      let allAccounts = await polkadotExtensionDapp.web3Accounts();

      if (!!extensions.length && !!allAccounts.length)
        dispatch({ type: 'CAN_USE_WALLET' });

      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` },
      }));
      // localStorage.setItem(
      //   CONNECTED_ACCOUNTS_STORAGE,
      //   JSON.stringify(allAccounts),
      // );
      keyring.loadAll({ isDevelopment: DEVELOPMENT_KEYRING }, allAccounts);
      dispatch({ type: 'SET_KEYRING', payload: keyring });
      const keyringOptions = keyring.getPairs().map((account) => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
        icon: 'user',
      }));
      if (keyringOptions.length > 0) {
        dispatch({ type: 'SET_ACCOUNT', payload: keyringOptions[0].value });
      }
    } catch (e) {
      dispatch({ type: 'KEYRING_ERROR' });
    }
  };

  const { keyringState } = state;
  // If `keyringState` is not null `asyncLoadAccounts` is running.
  if (keyringState) return;
  // If `loadAccts` is true, the `asyncLoadAccounts` has been run once.
  if (loadAccts) return dispatch({ type: 'SET_KEYRING', payload: keyring });

  // This is the heavy duty work
  loadAccts = true;
  await asyncLoadAccounts();
};

const SubstrateContext = React.createContext();

const SubstrateContextProvider = (props) => {
  // filtering props and merge with default param value
  const initState = { ...INIT_STATE };
  const neededPropNames = ['socket', 'types'];
  neededPropNames.forEach((key) => {
    initState[key] =
      typeof props[key] === 'undefined' ? initState[key] : props[key];
  });

  const [state, dispatch] = useReducer(reducer, initState);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      connect(state, dispatch);
      loadAccounts(state, dispatch);
    }
  }, []);

  const connectToPolka = useCallback(async () => {
    const {
      data: { free: ksmBalance },
    } = await state.api.query.system.account(state.account);
    dispatch({ type: 'SET_BALANCE', payload: ksmBalance.toString() });
    localStorage.setItem(POLKA_CONNECT_KEY, 'true');

    sendMetricsStartedConnectionPolkadot();
  }, [state]);

  const disconnect = useCallback(async () => {
    try {
      await state.api.disconnect();
      dispatch({ type: 'DISCONNECT' });
      userContext.setContext({
        ...userContext,
        polka: {},
      });
      localStorage.removeItem(POLKA_CONNECT_KEY);
      localStorage.removeItem(CONNECTED_ACCOUNTS_STORAGE);
    } catch (e) {
      console.error(e);
    }
  }, [state, userContext]);

  useEffect(() => {
    if (state.apiState === 'READY' && state.connectToPolka === null)
      dispatch({
        type: 'LOAD_CONNECT_CALLBACK',
        payload: { connectToPolka, disconnect },
      });
  }, [state.apiState, state.connectToPolka, connectToPolka, disconnect]);

  // Set userContext when ready
  useEffect(() => {
    if (state.account && state.balance && !userContext?.polka?.address) {
      userContext.setContext({
        ...userContext,
        polka: {
          address: state.account,
          balance: parseFloat(formatEther(state.balance)).toFixed(3),
        },
      });
    }
  }, [state.account, state.balance, userContext]);

  // Autoconnect to polka
  useEffect(() => {
    const shouldConnectPolka = localStorage.getItem(POLKA_CONNECT_KEY);
    if (
      shouldConnectPolka === 'true' &&
      state.keyring &&
      state.keyringState === 'READY' &&
      state.connectToPolka !== null &&
      state.account !== null
    ) {
      state.connectToPolka();
    }
  }, [
    state.account,
    state.keyring,
    state.keyringState,
    state.connectToPolka,
    state.connectToPolka,
    state,
  ]);

  return (
    <SubstrateContext.Provider value={state}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

const useSubstrate = () => ({ ...useContext(SubstrateContext) });

export { SubstrateContextProvider as default, useSubstrate };
