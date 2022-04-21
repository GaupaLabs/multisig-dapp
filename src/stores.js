import { readable, writable } from 'svelte/store';

export const contractAddress = writable('erd1q');
export const baseHookURL = readable('https://devnet-wallet.elrond.com/hook/');
export const popupVisible = writable(true);