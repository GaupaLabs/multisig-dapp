import { readable, writable } from 'svelte/store';

export const contractAddress = writable('erd1q');
export const popupVisible = writable(true);
export const baseHookURL = writable('https://devnet-wallet.elrond.com/hook/');
export const baseAPIURL = writable('https://devnet-api.elrond.com/');
export const baseExplorerURL = writable('https://devnet-explorer.elrond.com/');
export const baseHookArray = readable(['https://testnet-wallet.elrond.com/hook/','https://devnet-wallet.elrond.com/hook/','https://wallet.elrond.com/hook/']);
export const baseAPIArray = readable(['https://testnet-api.elrond.com/','https://devnet-api.elrond.com/','https://api.elrond.com/']);
export const baseExplorerArray = readable(['https://testnet-explorer.elrond.com/','https://devnet-explorer.elrond.com/','https://explorer.elrond.com/']);
export const callbackURL = readable('http://localhost:3000/dashboard')
export const deployAddress = readable('erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu');