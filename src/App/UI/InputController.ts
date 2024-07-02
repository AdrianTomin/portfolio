import { inputStore } from '../Utils/Store';

interface KeyPressed {
	[key: string]: boolean;
}

export default class InputController {
	private readonly keyPressed: KeyPressed;

	constructor() {
		this.startListening();
		this.keyPressed = {};
	}

	startListening(): void {
		window.addEventListener('keydown', (event: KeyboardEvent): void => this.onKeyDown(event));
		window.addEventListener('keyup', (event: KeyboardEvent): void => this.onKeyUp(event));
	}

	onKeyDown(event: KeyboardEvent): void {
		if (!this.keyPressed[event.code]) {
			switch (event.code) {
				case 'KeyW':
				case 'ArrowUp':
					inputStore.setState({
						forward: true,
					});
					break;
				case 'KeyA':
				case 'ArrowLeft':
					inputStore.setState({
						left: true,
					});
					break;
				case 'KeyS':
				case 'ArrowDown':
					inputStore.setState({
						backward: true,
					});
					break;
				case 'KeyD':
				case 'ArrowRight':
					inputStore.setState({
						right: true,
					});
					break;
			}
			this.keyPressed[event.code] = true;
		}
	}

	onKeyUp(event: KeyboardEvent): void {
		switch (event.code) {
			case 'KeyW':
			case 'ArrowUp':
				inputStore.setState({
					forward: false,
				});
				break;
			case 'KeyA':
			case 'ArrowLeft':
				inputStore.setState({
					left: false,
				});
				break;
			case 'KeyS':
			case 'ArrowDown':
				inputStore.setState({
					backward: false,
				});
				break;
			case 'KeyD':
			case 'ArrowRight':
				inputStore.setState({
					right: false,
				});
				break;
		}
		this.keyPressed[event.code] = false;
	}
}