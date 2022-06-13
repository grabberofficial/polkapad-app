import React, { useReducer, useContext, useEffect, useCallback } from 'react';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { formatEther } from 'ethers/lib/utils';

import { UserContext } from '../providers/userContext';

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

    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// Connecting to the Substrate node

const connect = (state, dispatch) => {
  const { apiState, socket, jsonrpc, types } = state;
  // We only want this function to be performed once
  if (apiState) return;

  dispatch({ type: 'CONNECT_INIT' });

  const provider = new WsProvider(socket);
  const _api = new ApiPromise({ provider, types, rpc: jsonrpc });

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api });
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(() => dispatch({ type: 'CONNECT_SUCCESS' }));
  });
  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
  _api.on('error', (err) => dispatch({ type: 'CONNECT_ERROR', payload: err }));
  return _api;
};

///
// Loading accounts from dev and polkadot-js extension

let loadAccts = false;
const loadAccounts = (state, dispatch) => {
  const asyncLoadAccounts = async () => {
    const polkadotExtensionDapp = await import('@polkadot/extension-dapp');
    dispatch({ type: 'LOAD_KEYRING' });
    try {
      await polkadotExtensionDapp.web3Enable(APP_NAME);
      // const savedAccounts = localStorage.getItem(CONNECTED_ACCOUNTS_STORAGE);
      // const accounts = JSON.parse(savedAccounts);
      // if (accounts && accounts.length > 0) {
      //   keyring.loadAll({ isDevelopment: DEVELOPMENT_KEYRING }, accounts);
      //   dispatch({ type: 'SET_KEYRING', payload: keyring });
      // } else {
      // }
      let allAccounts = await polkadotExtensionDapp.web3Accounts();
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
  asyncLoadAccounts();
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
    if (!state.keyring || !state.api) return;
    const isApiConnected = await state.api.isConnected;
    if (!isApiConnected) {
      const api = connect(initState, dispatch);
      loadAccounts(initState, dispatch);
      api.isReady.then(async () => {
        const keyringOptions = keyring.getPairs().map((account) => ({
          key: account.address,
          value: account.address,
          text: account.meta.name.toUpperCase(),
          icon: 'user',
        }));
        if (keyringOptions.length > 0) {
          dispatch({ type: 'SET_ACCOUNT', payload: keyringOptions[0].value });
          const {
            data: { free: polkaBalance },
          } = await api.query.system.account(keyringOptions[0].value);
          dispatch({ type: 'SET_BALANCE', payload: polkaBalance.toString() });
          localStorage.setItem(POLKA_CONNECT_KEY, 'true');
        }
      });
    } else {
      const keyringOptions = state.keyring.getPairs().map((account) => ({
        key: account.address,
        value: account.address,
        text: account.meta.name.toUpperCase(),
        icon: 'user',
      }));
      if (keyringOptions.length > 0) {
        dispatch({ type: 'SET_ACCOUNT', payload: keyringOptions[0].value });
        const {
          data: { free: polkaBalance },
        } = await state.api.query.system.account(keyringOptions[0].value);
        dispatch({ type: 'SET_BALANCE', payload: polkaBalance.toString() });
        localStorage.setItem(POLKA_CONNECT_KEY, 'true');
      }
    }
  }, [state, initState]);

  const disconnect = useCallback(() => {
    state.api.disconnect();
    dispatch({ type: 'DISCONNECT' });
    userContext.setContext({
      ...userContext,
      polka: {},
    });
    localStorage.removeItem(POLKA_CONNECT_KEY);
    localStorage.removeItem(CONNECTED_ACCOUNTS_STORAGE);
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
  // useEffect(() => {
  //   const shouldConnectPolka = localStorage.getItem(POLKA_CONNECT_KEY);
  //   if (
  //     shouldConnectPolka === 'true' &&
  //     state.keyring &&
  //     state.keyringState === 'READY' &&
  //     state.connectToPolka !== null &&
  //     state.account === null
  //   ) {
  //     state.connectToPolka();
  //   }
  // }, [
  //   state.account,
  //   state.keyring,
  //   state.keyringState,
  //   state.connectToPolka,
  //   state.connectToPolka,
  //   state,
  // ]);

  return (
    <SubstrateContext.Provider value={state}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

const useSubstrate = () => ({ ...useContext(SubstrateContext) });

export { SubstrateContextProvider as default, useSubstrate };
