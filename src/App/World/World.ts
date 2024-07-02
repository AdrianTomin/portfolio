import * as THREE from 'three';

import App from '../App.ts';
import Physics from './Physics.ts';
import Environment from './Environment.ts';
import Character from './Character.ts';
import CharacterController from './CharacterController.ts';
import AnimationController from './AnimationController.ts';

import { appStateStore } from '../Utils/Store.ts';

export default class World {
    app: App;
    scene: THREE.Scene;
    physics: Physics;
    environment!: Environment;
    character!: Character;
    characterController!: CharacterController;
    animationController!: AnimationController;
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        this.physics = new Physics();

        // create world classes
        const unsub = appStateStore.subscribe((state) => {
            if (state.physicsReady && state.assetsReady) {
                this.environment = new Environment();
                this.character = new Character();
                this.characterController = new CharacterController();
                this.animationController = new AnimationController();
                unsub();
            }
        });

        this.loop();
    }

    loop(deltaTime?: number): void {
        this.physics.loop();
        if (this.environment) this.environment.loop();
        if (this.characterController) this.characterController.loop();
        if (this.animationController && deltaTime) this.animationController.loop(deltaTime);
    }
}
