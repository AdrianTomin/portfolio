import assetStore, { AssetStoreState } from '../Utils/AssetStore.ts';
import { appStateStore } from '../Utils/Store.ts';
import { StoreApi } from 'zustand/vanilla';

export default class Preloader {
	assetStore: StoreApi<AssetStoreState>
	overlay: HTMLElement | null;
	loading: HTMLElement | null;
	startButton: HTMLElement | null;
	numberOfLoadedAssets!: number;
	numberOfAssetsToLoad!: number;
	private progress!: number;

	constructor() {
		this.assetStore = assetStore;

		// access to DOM elements
		this.overlay = document.querySelector('.overlay');
		this.loading = document.querySelector('.loading');
		this.startButton = document.querySelector('.start');

		this.assetStore.subscribe((state: any): void => {

			this.numberOfLoadedAssets = Object.keys(state.loadedAssets).length;
			this.numberOfAssetsToLoad = state.assetsToLoad.length;
			this.progress = this.numberOfLoadedAssets / this.numberOfAssetsToLoad;
			this.progress = Math.trunc(this.progress * 100);
			const progressPercentage: HTMLElement | null = document.getElementById('progressPercentage');
			if (progressPercentage) {
				progressPercentage.textContent = String(this.progress);
			}
			if (this.progress === 100) {
				appStateStore.setState({ assetsReady: true });
				this.loading?.classList.add('fade');
				window.setTimeout(() => this.ready(), 1200);

			}
		});

	}

	ready(): void {

		this.loading?.remove();
		if (this.startButton) {
			this.startButton.style.display = 'inline';
		}
		this.startButton?.classList.add('fadeIn');

		this.startButton?.addEventListener('click', (): void => {
			this.overlay?.classList.add('fade');
			this.startButton?.classList.add('fadeOut');

			window.setTimeout((): void => {
				this.overlay?.remove();
				this.startButton?.remove();
			}, 2000);


		}, {
			once: true,
		});
	}
}