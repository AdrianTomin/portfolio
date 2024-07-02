// Import necessary modules
import * as THREE from 'three';
import App from '../App.ts';
import { inputStore } from '../Utils/Store.ts';
import Physics from './Physics.ts';
import Character from './Character.ts';

/**
 * Class representing a character controller.
 */
export default class CharacterController {
	app: App;
	scene: THREE.Scene;
	physics: Physics;
	character: THREE.Mesh;
	forward!: boolean;
	backward!: boolean;
	right!: boolean;
	left!: boolean;
	rigidBodyType: any;
	rigidBody: any;
	colliderType: any;
	collider: any;
	characterController: any;


	/**
	 * Create a character controller.
	 */
	constructor() {
		// Initialize App, scene, physics, and character properties
		this.app = new App();
		this.scene = this.app.scene;
		this.physics = this.app.world.physics;
		this.character = this.app.world.character.instance;

		// Subscribe to input store and update movement values
		inputStore.subscribe((state): void => {
			this.forward = state.forward;
			this.backward = state.backward;
			this.left = state.left;
			this.right = state.right;
		});

		// Instantiate controller and create rigid body and collider
		this.instantiateController();
		this.addEventListeners();
	}

	/**
	 * Instantiate the character controller, rigid body, and collider.
	 */
	instantiateController(): void {
		// Create a kinematic rigid body
		this.rigidBodyType = this.physics.rapier.RigidBodyDesc.kinematicPositionBased();
		this.rigidBody = this.physics.world.createRigidBody(this.rigidBodyType);

		// Create a cuboid collider
		this.colliderType = this.physics.rapier.ColliderDesc.cuboid(
			0.3,
			1,
			0.3,
		);
		this.collider = this.physics.world.createCollider(
			this.colliderType,
			this.rigidBody,
		);

		// Set rigid body position to character position
		const worldPosition = this.character.getWorldPosition(new THREE.Vector3());
		const worldRotation = this.character.getWorldQuaternion(
			new THREE.Quaternion(),
		);
		this.rigidBody.setTranslation(worldPosition);
		this.rigidBody.setRotation(worldRotation);

		// Create character controller, set properties, and enable autostepping
		this.characterController = this.physics.world.createCharacterController(0.01);
		this.characterController.setApplyImpulsesToDynamicBodies(true);
		this.characterController.enableAutostep(2, 0.1, false);
		this.characterController.enableSnapToGround(0.1);
	}

	/**
	 * Loop function that updates the character's position and movement.
	 */
	loop(): void {
		// Initialize movement vector based on input values
		const movement = new THREE.Vector3();
		if (this.forward) {
			movement.z -= 1;
		}
		if (this.backward) {
			movement.z += 1;
		}
		if (this.left) {
			movement.x -= 1;
		}
		if (this.right) {
			movement.x += 1;
		}

		// Rotate character based on movement vector
		if (movement.length() !== 0) {
			const angle = Math.atan2(movement.x, movement.z) + Math.PI;
			const characterRotation = new THREE.Quaternion().setFromAxisAngle(
				new THREE.Vector3(0, 1, 0),
				angle,
			);
			this.character.quaternion.slerp(characterRotation, 0.1);
		}

		// Normalize and scale movement vector and set y component to -1
		movement.normalize().multiplyScalar(0.1);
		movement.y = -1;

		// Update collider movement and get new position of rigid body
		this.characterController.computeColliderMovement(this.collider, movement);
		const newPosition = new THREE.Vector3()
			.copy(this.rigidBody.translation())
			.add(this.characterController.computedMovement());

		// Set next kinematic translation of rigid body and update character position
		this.rigidBody.setNextKinematicTranslation(newPosition);
		this.character.position.lerp(this.rigidBody.translation(), 0.1);
	}

	addEventListeners(): void {
		document.addEventListener('DOMContentLoaded', (): void => {
			const controlsContainer = document.querySelector('.controls') as HTMLElement;

			// Function to detect if a keyboard is present
			const hasKeyboard = (): boolean => {
				return window.matchMedia('(pointer: fine)').matches;
			};

			// Show/hide controls based on keyboard presence
			if (!hasKeyboard()) {
				controlsContainer.style.display = 'flex';
			}
		});

		const handleControlPress = (control: string): void => {
			inputStore.setState({
				[control]: true,
			});
		};

		const handleControlRelease = (control: string): void => {
			inputStore.setState({
				[control]: false,
			});
		};

		document.querySelectorAll('.control-button').forEach(button => {
			button.addEventListener('touchstart', (e): void => {
				e.preventDefault();
				const target = e.target as HTMLElement;
				if (target && target.id) {
					handleControlPress(target.id);
				}
			});
			button.addEventListener('touchend', (e): void => {
				e.preventDefault();
				const target = e.target as HTMLElement;
				if (target && target.id) {
					handleControlRelease(target.id);
				}
			});
			button.addEventListener('mousedown', (e): void => {
				e.preventDefault();
				const target = e.target as HTMLElement;
				if (target && target.id) {
					handleControlPress(target.id);
				}
			});
			button.addEventListener('mouseup', (e): void => {
				e.preventDefault();
				const target = e.target as HTMLElement;
				if (target && target.id) {
					handleControlRelease(target.id);
				}
			});
		});
	}
}