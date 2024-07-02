import { createStore, StoreApi } from 'zustand/vanilla';


export interface SizeStore {
    width: number;
    height: number;
    pixelRatio: number;
}

interface AppStateStore {
    physicsReady: boolean;
    assetsReady: boolean;
}

export interface InputStore {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
}


export const sizesStore: StoreApi<SizeStore> = createStore(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
}));

export const appStateStore: StoreApi<AppStateStore> = createStore(() => ({
    physicsReady: false,
    assetsReady: false,
}));

export const inputStore: StoreApi<InputStore> = createStore(() => ({
    forward: false,
    backward: false,
    left: false,
    right: false,
}));