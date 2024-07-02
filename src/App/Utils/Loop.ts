import * as THREE from 'three';
import App from '../App.ts';
import Camera from '../Camera.ts';
import Renderer from '../Renderer.ts';
import World from '../World/World.ts';
import { Clock } from 'three';

export default class Loop {
	app: App;
	camera: Camera;
	renderer: Renderer;
	world: World;
	clock: Clock;
	previousElapsedTime: number;

	constructor() {
		this.app = new App();
		this.camera = this.app.camera;
		this.renderer = this.app.renderer;
		this.world = this.app.world;

		this.clock = new THREE.Clock();
		this.previousElapsedTime = 0;
		this.loop();
	}

	loop(): void {
		const elapsedTime = this.clock.getElapsedTime();
		const deltaTime = elapsedTime - this.previousElapsedTime;
		this.previousElapsedTime = elapsedTime;

		this.world.loop(deltaTime, elapsedTime);
		this.camera.loop();
		this.renderer.loop();
		window.requestAnimationFrame(() => this.loop());
	}
}