import * as THREE from 'three';
import App from './App.ts';
import { sizesStore, SizeStore } from './Utils/Store.ts';
import Camera from './Camera.ts';
import { StoreApi } from 'zustand/vanilla';

export default class Renderer {
	app: App;
	audio: HTMLAudioElement;
	canvas: Element;
	camera: Camera;
	scene: THREE.Scene;
	sizesStore: StoreApi<SizeStore>;
	sizes: any;
	instance!: THREE.WebGLRenderer;

	constructor() {
		this.app = new App();
		this.audio = new Audio();
		this.canvas = this.app.canvas;
		this.camera = this.app.camera;
		this.scene = this.app.scene;
		this.sizesStore = sizesStore;
		this.sizes = this.sizesStore.getState();

		this.setInstance();
		this.setResizeLister();
	}

	setInstance(): void {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);

		// @ts-ignore
		this.instance.outputEncoding = THREE.sRGBEncoding;
		this.instance.shadowMap.enabled = true;
		this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.toneMapping = THREE.CineonToneMapping;
		this.instance.toneMappingExposure = 0.8;
	}

	setResizeLister(): void {
		this.sizesStore.subscribe((sizes: any): void => {
			this.instance.setSize(sizes.width, sizes.height);
			this.instance.setPixelRatio(sizes.pixelRatio);
		});
	}

	loop(): void {
		this.instance.render(this.scene, this.camera.instance);
	}
}