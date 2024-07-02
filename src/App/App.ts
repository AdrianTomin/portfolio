import * as THREE from 'three';
import Camera from './Camera.ts';
import Renderer from './Renderer.ts';
import Loop from './Utils/Loop.ts';
import World from './World/World.ts';
import Resize from './Utils/Resize.ts';
import AssetLoader from './Utils/AssetLoader.ts';
import Preloader from './UI/Preloader.ts';
import InputController from './UI/InputController.ts';
import ModalManager from './UI/ModalManager.ts';

let instance: App | null = null;

export default class App {
	canvas!: Element;
	scene!: THREE.Scene;
	assetLoader!: AssetLoader;
	preloader!: Preloader;
	inputController!: InputController;
	world!: World;
	camera!: Camera;
	renderer!: Renderer;
	loop!: Loop;
	resize!: Resize;
	audio!: HTMLAudioElement;

	constructor() {
		if (instance) return instance;
		instance = this;

		// threejs elements
		const canvas = document.querySelector('canvas.threejs');
		if (canvas) {
			this.canvas = canvas;
		}

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('lightblue');
		(window as any).modalManager = new ModalManager();

		// Asset Loader
		this.assetLoader = new AssetLoader();

		// UI
		this.preloader = new Preloader();
		this.inputController = new InputController();

		// World
		this.world = new World();

		// Camera and Renderer
		this.camera = new Camera();
		this.renderer = new Renderer();

		document.addEventListener('click', async (): Promise<void> => {
			this.audio = new Audio();
			this.audio.src = '/audio.mp3';
			this.audio.loop = true;
			await this.audio.play();
		}, {
			once: true,
		});

		// extra utils
		this.loop = new Loop();
		this.resize = new Resize();
	}
}
