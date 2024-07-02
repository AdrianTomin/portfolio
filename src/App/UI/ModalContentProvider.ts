interface ModalContent {
	title: string;
	description: string;
}

interface ModalContents {
	aboutMe: ModalContent;
	contactMe: ModalContent;
	projects: ModalContent;
}

export default class ModalContentProvider {
	private readonly modalContents: ModalContents;

	constructor() {
		this.modalContents = {
			aboutMe: {
				title: '💫 About Me',
				description: `Hello! I'm Adrian Tomin, 
				a passionate developer currently focused on building my portfolio site, 
				exploring the world of three.js, and focusing on machine learning + AI.
				
				My Tech Stack Includes:
				`,
			},
			contactMe: {
				title: '🌐 Contact Me',
				description: `Thank you for visiting my portfolio! 
				If you have any questions, comments, or just want to connect, 
				feel free to reach out to me through any of the following channels:`
			},
			projects: {
				title: '💻 Projects',
				description: 'Here are the various projects that I\'ve worked on:',
			},
		};
	}

	getModalInfo(portalName: keyof ModalContents): ModalContent {
		return this.modalContents[portalName];
	}
}
  