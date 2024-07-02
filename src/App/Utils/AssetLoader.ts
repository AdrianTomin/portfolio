import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

import assetStore, { AssetStoreState, AssetToLoad } from './AssetStore.ts';

export default class AssetLoader {
	assetStore: AssetStoreState;
	assetsToLoad: AssetToLoad[];
	addLoadedAsset: (asset: any, id: string) => void;
	private gltfLoader!: GLTFLoader;
	private textureLoader!: THREE.TextureLoader;

	constructor() {
		this.assetStore = assetStore.getState();
		this.assetsToLoad = this.assetStore.assetsToLoad;
		this.addLoadedAsset = this.assetStore.addLoadedAsset;
		this.instantiateLoaders();
		this.startLoading();
	}

	instantiateLoaders(): void {
		const dracoLoader: DRACOLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');
		this.gltfLoader = new GLTFLoader();
		this.gltfLoader.setDRACOLoader(dracoLoader);
		this.textureLoader = new THREE.TextureLoader();
	}

	startLoading(): void {
		this.assetsToLoad.forEach((asset: AssetToLoad): void => {
			if (asset.type === 'texture') {
				this.textureLoader.load(asset.path, (loadedAsset: any): void => {
					this.addLoadedAsset(loadedAsset, asset.id);
				});
			}
			if (asset.type === 'model') {
				this.gltfLoader.load(asset.path, (loadedAsset: any): void => {
					this.addLoadedAsset(loadedAsset, asset.id);
				});
			}
		});
	}
}