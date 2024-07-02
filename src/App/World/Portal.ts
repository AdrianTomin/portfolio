import App from '../App.ts';
import * as THREE from 'three';
import ModalManager from '../UI/ModalManager.ts';
import World from './World.ts';

interface ModalInfo {
	title: string;
	description: string;
}

export default class Portal {
	app: App;
	portalMesh: THREE.Object3D;
	modalInfo: ModalInfo;
	modalManager: ModalManager;
	prevIsNear: boolean;
	character!: THREE.Object3D;
	world!: World;

	constructor(portalMesh: THREE.Object3D, modalInfo: ModalInfo) {
		this.app = new App();
		this.portalMesh = portalMesh;
		this.modalInfo = modalInfo;
		this.modalManager = new ModalManager();
		this.prevIsNear = false;
	}

	loop(): void {
		this.character = this.app.world.character.instance;
		if (this.character) {
			const portalPosition = new THREE.Vector3();
			this.portalMesh.getWorldPosition(portalPosition);

			const distance = this.character.position.distanceTo(portalPosition);
			const isNear = distance < 3;
			if (isNear) {
				if (!this.prevIsNear) {
					this.modalManager.openModal(this.modalInfo.title, this.modalInfo.description);
				}
				this.prevIsNear = true;
			} else {
				if (this.prevIsNear) {
					this.modalManager.closeModal();
				}
				this.prevIsNear = false;
			}
		}
	}
}