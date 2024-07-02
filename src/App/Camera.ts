import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { sizesStore, SizeStore } from './Utils/Store.ts';


import App from './App.ts'
import CharacterController from './World/CharacterController.ts';
import { StoreApi } from 'zustand/vanilla';

export default class Camera {
    app: App;
    canvas: Element;
    sizesStore: StoreApi<SizeStore>;
    sizes: {
        width: number;
        height: number
    };
    instance!: THREE.PerspectiveCamera;
    controls!: OrbitControls;
    characterController!: any;
    constructor() {
        this.app = new App()
        this.canvas = this.app.canvas

        this.sizesStore = sizesStore

        this.sizes = this.sizesStore.getState()

        this.setInstance()
        this.setControls()
        this.setResizeLister()
    }

    setInstance(): void {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            1,
            600
        );
        this.instance.position.z = 100
        this.instance.position.y = 20
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas as HTMLElement);
        this.controls.enableDamping = true;
    }

    setResizeLister(): void {
        this.sizesStore.subscribe((sizes: any): void => {
            this.instance.aspect = sizes.width / sizes.height
            this.instance.updateProjectionMatrix()
        })
    }

    loop(): void {
        this.controls.update()
        this.characterController = this.app.world.characterController?.rigidBody
        if (this.characterController) {


            const characterPosition = this.characterController.translation()
            const characterRotation = this.characterController.rotation()

            // change the position of the camera relative to the character
            const cameraOffset = new THREE.Vector3(0, 25, 45)
            cameraOffset.applyQuaternion(characterRotation)
            cameraOffset.add(characterPosition)

            const targetOffset = new THREE.Vector3(0, 0, -1)
            targetOffset.applyQuaternion(characterRotation)
            targetOffset.add(characterPosition)

            this.instance.position.lerp(cameraOffset, 0.1)
            this.controls.target.lerp(targetOffset, 0.1)
        }
    }
}