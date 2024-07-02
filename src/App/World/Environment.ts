import * as THREE from 'three';

import App from '../App.ts';
import assetStore, { AssetStoreState } from '../Utils/AssetStore.ts';
import Portal from './Portal.ts';
import ModalContentProvider from '../UI/ModalContentProvider.ts';
import Physics from './Physics.ts';
import World from './World.ts';

export default class Environment {
	app: App;
	scene: THREE.Scene;
	physics: Physics;
	assetStore: AssetStoreState;
	environment: {
		scene: THREE.Object3D;
		animations: THREE.AnimationClip[];
	};
	world!: World;
	directionalLight!: THREE.DirectionalLight;
	portal1!: Portal;
	portal2!: Portal;
	portal3!: Portal;

	constructor() {
		this.app = new App();
		this.scene = this.app.scene;
		this.physics = this.app.world.physics;

		this.assetStore = assetStore.getState();
		this.environment = this.assetStore.loadedAssets.environment;

		this.loadEnvironment();
		this.addLights();
		this.addPortals();
	}

	// load environment here
	loadEnvironment(): void {
		const environmentScene = this.environment.scene;
		environmentScene.rotation.set(0, -0.4, 0);

		environmentScene.traverse((obj: any): void => {
			const scale = 2.229;
			if (obj.isMesh) {
				if (obj.name.includes('base')) {
					if (
						obj.name.includes('013') ||
						obj.name.includes('014') ||
						obj.name.includes('015') ||
						obj.name.includes('016') ||
						obj.name.includes('017') ||
						obj.name.includes('018') ||
						obj.name.includes('019')
					) {
						this.physics.add(obj, 'fixed', 'trimesh', scale, 6, scale);
					} else {
						this.physics.add(obj, 'fixed', 'cuboid', scale);
					}
				} else if (obj.name.includes('bushes')) {
					this.physics.add(obj, 'fixed', 'ball', scale);
				} else if (obj.name.includes('trees')) {
					this.physics.add(obj, 'fixed', 'trimesh', scale);
				} else {
					this.physics.add(obj, 'fixed', 'cuboid');
				}
			}
		});

		const shadowCasters: string[] = [
			'trees',
			'terrain',
			'rocks',
			'stairs',
			'gates',
			'bushes',
			'border',
		];

		const shadowReceivers: string[] = [
			'base',
			'terrain',
		];

		for (const child of environmentScene.children) {
			const isShadowCaster = shadowCasters.some(keyword => child.name.includes(keyword));
			if (isShadowCaster) {
				child.traverse((obj: any): void => {
					if (obj.isMesh) {
						obj.castShadow = true;
					}
				});
			}
			const isShadowReceiver = shadowReceivers.some(keyword => child.name.includes(keyword));
			if (isShadowReceiver) {
				child.traverse((obj: any): void => {
					if (obj.isMesh) {
						obj.receiveShadow = true;
					}
				});
			}
		}
		this.scene.add(environmentScene);
	}

	addLights(): void {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(ambientLight);

		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
		this.directionalLight.position.set(0.15, 0.44, 0.8);
		this.directionalLight.castShadow = true;
		this.directionalLight.shadow.camera.top = 30;
		this.directionalLight.shadow.camera.bottom = -30;
		this.directionalLight.shadow.camera.right = 30;
		this.directionalLight.shadow.camera.left = -30;
		this.directionalLight.shadow.bias = -0.002;
		this.directionalLight.shadow.normalBias = 0.072;
		this.scene.add(this.directionalLight);
	}

	addPortals(): void {
		const portalMesh1 = this.environment.scene.getObjectByName('portals');
		const portalMesh2 = this.environment.scene.getObjectByName('portals001');
		const portalMesh3 = this.environment.scene.getObjectByName('portals002');

		const modalContentProvider = new ModalContentProvider();

		if (portalMesh1 && portalMesh2 && portalMesh3) {
			this.portal1 = new Portal(portalMesh2, modalContentProvider.getModalInfo('aboutMe'));
			this.portal2 = new Portal(portalMesh1, modalContentProvider.getModalInfo('contactMe'));
			this.portal3 = new Portal(portalMesh3, modalContentProvider.getModalInfo('projects'));
		}

	}

	loop(): void {
		this.portal1.loop();
		this.portal2.loop();
		this.portal3.loop();
	}
}