import * as THREE from 'three';
import App from '../App.ts';
import { appStateStore } from '../Utils/Store.ts';

import { RigidBody, World, ColliderDesc, RigidBodyDesc, Vector } from '@dimforge/rapier3d';

type RigidBodyType =
	ReturnType<typeof RigidBodyDesc.dynamic>
	| ReturnType<typeof RigidBodyDesc.fixed>
	| ReturnType<typeof RigidBodyDesc.kinematicPositionBased>;
type ColliderType =
	ReturnType<typeof ColliderDesc.cuboid>
	| ReturnType<typeof ColliderDesc.ball>
	| ReturnType<typeof ColliderDesc.trimesh>;

/**
 * Class representing a physics simulation
 */
export default class Physics {
	app: App;
	scene: THREE.Scene;
	meshMap: Map<THREE.Mesh, RigidBody>;
	world!: World;
	rapier!: typeof import('@dimforge/rapier3d');
	rapierLoaded!: boolean;
	rigidBody!: RigidBody;

	/**
	 * Creates an instance of Physics.
	 */
	constructor() {
		// getting the App instance
		this.app = new App();
		this.scene = this.app.scene;

		// setting the physics map
		this.meshMap = new Map();

		// setting the physics world
		import('@dimforge/rapier3d').then((RAPIER): void => {
			const gravity = {
				x: 0,
				y: -9.81,
				z: 0,
			};
			this.world = new RAPIER.World(gravity);
			this.rapier = RAPIER;
			this.rapierLoaded = true;
			appStateStore.setState({
				physicsReady: true,
			});
		});
	}

	add(mesh: THREE.Mesh, type: 'dynamic' | 'fixed' | 'kinematic', collider: 'cuboid' | 'ball' | 'trimesh', scaleY = 2, scaleZ = 2, scaleX = 2): RigidBody {
		// defining the rigid body type
		let rigidBodyType: RigidBodyType;
		switch (type) {
			case 'dynamic':
				rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
				break;
			case 'fixed':
				rigidBodyType = this.rapier.RigidBodyDesc.fixed();
				break;
			case 'kinematic':
				rigidBodyType = this.rapier.RigidBodyDesc.kinematicPositionBased();
				break;
		}
		if (rigidBodyType) {
			this.rigidBody = this.world.createRigidBody(rigidBodyType);
		}

		// defining the collider type
		let colliderType: ColliderType;

		switch (collider) {
			case 'cuboid':
				const dimensions = this.computeCuboidDimensions(mesh);
				colliderType = this.rapier.ColliderDesc.cuboid(
					dimensions.x / scaleX,
					dimensions.y / scaleY,
					dimensions.z / scaleZ,
				);
				this.world.createCollider(colliderType, this.rigidBody);
				break;
			case 'ball':
				const radius = this.computeBallDimensions(mesh);
				colliderType = this.rapier.ColliderDesc.ball(radius);
				this.world.createCollider(colliderType, this.rigidBody);
				break;
			case 'trimesh':
				const { scaledVertices, indices } = this.computeTrimeshDimensions(mesh);
				colliderType = this.rapier.ColliderDesc.trimesh(
					scaledVertices,
					indices,
				);
				this.world.createCollider(colliderType, this.rigidBody);
				break;
		}

		// setting the rigid body position and rotation
		const worldPosition = mesh.getWorldPosition(new THREE.Vector3());
		const worldRotation = mesh.getWorldQuaternion(new THREE.Quaternion());
		this.rigidBody.setTranslation(worldPosition, false);
		this.rigidBody.setRotation(worldRotation, false);

		this.meshMap.set(mesh, this.rigidBody);
		return this.rigidBody;
	}

	computeCuboidDimensions(mesh: THREE.Mesh): THREE.Vector3 {
		mesh.geometry.computeBoundingBox();
		const size = mesh.geometry.boundingBox!.getSize(new THREE.Vector3());
		const worldScale = mesh.getWorldScale(new THREE.Vector3());
		size.multiply(worldScale);
		return size;
	}

	computeBallDimensions(mesh: THREE.Mesh): number {
		mesh.geometry.computeBoundingSphere();
		const radius = mesh.geometry.boundingSphere!.radius;
		const worldScale = mesh.getWorldScale(new THREE.Vector3());
		const maxScale = Math.max(worldScale.x, worldScale.y, worldScale.z);
		return radius * maxScale;
	}

	computeTrimeshDimensions(mesh: THREE.Mesh): { scaledVertices: Float32Array, indices: Uint32Array } {
		const vertices = mesh.geometry.attributes.position.array;
		const indices = mesh.geometry.index!.array as Uint32Array;
		const worldScale = mesh.getWorldScale(new THREE.Vector3());
		const scaledVertices = vertices.map((vertex: any, index: any) => {
			return vertex * worldScale.getComponent(index % 3);
		}) as Float32Array;
		return {
			scaledVertices,
			indices,
		};
	}

	/**

     The loop function that updates the physics simulation and the mesh positions and rotations
	 */
	loop() {
		if (!this.rapierLoaded) return;
		this.world.step();
		this.meshMap.forEach((rigidBody: any, mesh: any) => {

			// extracting the position and rotation from the rigid body
			const position = new THREE.Vector3().copy(rigidBody.translation());
			const rotation = new THREE.Quaternion().copy(rigidBody.rotation());

			// transforming the position to the parent mesh's local space
			position.applyMatrix4(
				new THREE.Matrix4().copy(mesh.parent.matrixWorld).invert(),
			);

			// transforming the rotation to the parent mesh's local space
			const inverseParentMatrix = new THREE.Matrix4()
				.extractRotation(mesh.parent.matrixWorld)
				.invert();
			const inverseParentRotation = new THREE.Quaternion()
				.setFromRotationMatrix(inverseParentMatrix);
			rotation.premultiply(inverseParentRotation);


			mesh.position.copy(position);
			mesh.quaternion.copy(rotation);
		});
	}
}