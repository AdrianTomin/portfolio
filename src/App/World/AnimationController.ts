import * as THREE from 'three';

import App from '../App.ts';
import { InputStore, inputStore } from '../Utils/Store.js';

export default class AnimationController {
	app: App;
	scene: THREE.Scene;
	avatar: {
		scene: THREE.Object3D;
		animations: THREE.AnimationClip[];
	};
	mixer!: THREE.AnimationMixer;
	animations!: Map<string, THREE.AnimationAction>;
	currentAction!: THREE.AnimationAction;

	constructor() {
		this.app = new App();
		this.scene = this.app.scene;
		this.avatar = this.app.world.character.avatar;

		inputStore.subscribe((input) => this.onInput(input));

		this.instantiatedAnimations();
	}

	instantiatedAnimations(): void {
		//const idle = this.avatar.animations[0];
		this.mixer = new THREE.AnimationMixer(this.avatar.scene);


		this.animations = new Map();
		this.avatar.animations.forEach((clip: any): void => {
			this.animations.set(clip.name, this.mixer.clipAction(clip));
		});

		this.currentAction = this.animations.get('idle') as THREE.AnimationAction;
		this.currentAction.play();
	}

	playAnimation(name: any): void {
		if (this.currentAction === this.animations.get(name)) return;
		const action = this.animations.get(name) as THREE.AnimationAction;
		action?.reset();
		action?.play();
		action?.crossFadeFrom(this.currentAction, 0.2, true);

		this.currentAction = action;
	}

	onInput(input: InputStore): void {
		if (
			input.forward ||
			input.backward ||
			input.left ||
			input.right
		) {
			this.playAnimation('run');
		} else {
			this.playAnimation('idle');
		}
	}

	loop(deltaTime: number): void {
		this.mixer.update(deltaTime);
	}
}