interface Language {
	name: string;
	logo: string;
}

interface Project {
	name: string;
	description: string;
	image: string[];
	link: string;
	techStack: {
		name: string;
		logo: string;
	}[]
}

interface Tech {
	name: string;
	logo: string;
}

interface Contact {
	name: string;
	logo: string;
	url: string;
}

const languages: Language[] = [
	{
		name: 'TypeScript',
		logo: 'https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white',
	},
	{
		name: 'React',
		logo: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
	},
	{
		name: 'NextJS',
		logo: 'https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white',
	},
	{
		name: 'Python',
		logo: 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
	},
	{
		name: 'Apollo Graphql',
		logo: 'https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql',
	},
	{
		name: 'ExpressJS',
		logo: 'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB',
	},
	{
		name: 'MongoDB',
		logo: 'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white',
	},
	{
		name: 'ThreeJS',
		logo: 'https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white',
	},
	{
		name: 'NodeJS',
		logo: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
	},
	{
		name: 'Java',
		logo: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white',
	},
];

const contactMe: Contact[] = [
	{
		name: 'LinkedIn',
		logo: 'https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white',
		url: 'https://linkedin.com/in/adriantomin',
	},
	{
		name: 'GitHub',
		logo: 'https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white',
		url: 'https://github.com/AdrianTomin/',
	},
];

const projects: Project[] = [
	{
		name: 'Smart Brain',
		description: `Smart Brain is a web application where the main functionality revolves around utilizing the Clarifai API for general image recognition.`,
		image: [
			'/smart-brain-pictures/home-page.png',
			'/smart-brain-pictures/login.png',
			'/smart-brain-pictures/results.png',
			'/smart-brain-pictures/settings.png',
			'/smart-brain-pictures/signup.png',
		],
		link: 'https://github.com/AdrianTomin/smart-brain-public',
		techStack: [
			{ name: 'React', logo: '/icons/react-icon.svg' },
			{ name: 'Node.js', logo: '/icons/node-icon.svg' },
			{ name: 'NextJS', logo: '/icons/next-icon.svg' },
			{ name: 'Apollo GraphQL', logo: '/icons/apollo-icon.svg' },
			{ name: 'MongoDB', logo: '/icons/mongodb-icon.svg' },
			{ name: 'TypeScript', logo: '/icons/ts-icon.svg' },
			{ name: 'ExpressJS', logo: '/icons/express-icon.svg' },
			{ name: 'SASS', logo: '/icons/sass-icon.svg' },
			{ name: 'MUI', logo: '/icons/mui-icon.svg' },
			{ name: 'Cypress', logo: '/icons/cypress-icon.svg' },
		],
	},
	{
		name: 'Verbano',
		description: `Verbano is a cutting-edge AI-powered application designed to revolutionize the way audio recordings
		 and transcriptions are integrated and utilized. Verbano uniquely combines audio recording capabilities, transcription services, 
		 and document linking to produce contextually rich summaries.`,
		image: [
			'/verbano-pictures/verbano.png',
			'/verbano-pictures/login.png',
			'/verbano-pictures/darkmode.png',

		],
		link: 'https://github.com/CouloirStudio/verbano',
		techStack: [
			{ name: 'React', logo: '/icons/react-icon.svg' },
			{ name: 'Node.js', logo: '/icons/node-icon.svg' },
			{ name: 'NextJS', logo: '/icons/next-icon.svg' },
			{ name: 'Apollo GraphQL', logo: '/icons/apollo-icon.svg' },
			{ name: 'MongoDB', logo: '/icons/mongodb-icon.svg' },
			{ name: 'TypeScript', logo: '/icons/ts-icon.svg' },
			{ name: 'ExpressJS', logo: '/icons/express-icon.svg' },
			{ name: 'SASS', logo: '/icons/sass-icon.svg' },
			{ name: 'MUI', logo: '/icons/mui-icon.svg' },
			{ name: 'Cypress', logo: '/icons/cypress-icon.svg' },
		],
	},
	{
		name: 'ThreeJS Solar System',
		description: 'A simple and interactive model of our Solar System built with ThreeJS.',
		image: [
			'/threejs-solar-system-pictures/solar-system-1.png',
			'/threejs-solar-system-pictures/solar-system-2.png',
		],
		link: 'https://github.com/AdrianTomin/threejs-solar-system',
		techStack: [
			{ name: 'TypeScript', logo: '/icons/ts-icon.svg' },
			{ name: 'Vite', logo: '/icons/vite-icon.svg' },
			{ name: 'ThreeJS', logo: '/icons/threejs-icon.svg' },
		],
	},
	{
		name: 'Portfolio Site',
		description: 'Welcome to my interactive portfolio site! ' +
			'Dive into a unique experience where you control a character navigating through a vibrant scene, ' +
			'exploring various projects and contact information. Built with ThreeJS, this site blends creativity and technology, ' +
			'offering an engaging way to discover my work and connect with me.',
		image: [
			'portfolio-pictures/portfolio.png',
			'portfolio-pictures/contact-me.png',
			'portfolio-pictures/about-me.png',
			'portfolio-pictures/projects.png',
		],
		link: '',
		techStack: [
			{ name: 'TypeScript', logo: '/icons/ts-icon.svg' },
			{ name: 'Vite', logo: '/icons/vite-icon.svg' },
			{ name: 'ThreeJS', logo: '/icons/threejs-icon.svg' },
		],
	},
];

export default class ModalManager {
	private readonly modal: HTMLElement | null;
	private close: HTMLElement | null;
	private cardModal: HTMLElement | null = null;
	private currentImageIndex: number = 0;

	constructor() {
		this.modal = document.getElementById('myModal');
		this.close = document.getElementsByClassName('close')[0] as HTMLElement;
		this.close.onclick = (): void => {
			this.closeModal();
		};
	}

	openModal(title: string, description: string): void {
		const modalTitleElement: HTMLElement | null = document.getElementById('modalTitle');
		const modalDescriptionElement: HTMLElement | null = document.getElementById('modalDescription');
		const modalContent: Element | null | undefined = this.modal?.querySelector('.modal-content');

		if (modalTitleElement) {
			modalTitleElement.textContent = title;
		}

		if (modalDescriptionElement) {
			modalDescriptionElement.textContent = description;
		}

		// Clear any previously added content, except title and description
		if (modalContent) {
			while (modalContent.firstChild
				&& !modalContent.firstChild.isSameNode(modalTitleElement as HTMLElement)
				&& !modalContent.firstChild.isSameNode(modalDescriptionElement as HTMLElement)) {
				modalContent.removeChild(modalContent.firstChild);
			}
		}

		if (title === '💫 About Me' && modalContent) {
			if (modalDescriptionElement) {
				modalDescriptionElement.hidden = false;
			}
			this.removeId(modalContent);
			const imagesContainer: HTMLDivElement = document.createElement('div');
			imagesContainer.className = 'languages-container';

			languages.forEach(lang => {
				const imgElement: HTMLImageElement = document.createElement('img');
				imgElement.src = lang.logo;
				imgElement.alt = `${lang.name} Logo`;
				imgElement.style.margin = '5px';
				imagesContainer.appendChild(imgElement);
			});

			modalContent.appendChild(imagesContainer);

			// Create a wrapper for centering
			const centerWrapper: HTMLDivElement = document.createElement('div');
			centerWrapper.style.display = 'flex';
			centerWrapper.style.justifyContent = 'center';
			centerWrapper.style.alignItems = 'center';
			centerWrapper.style.height = '100%';

			// Create a loader
			const loader: HTMLDivElement = document.createElement('div');
			loader.className = 'loader';
			modalContent.appendChild(loader);

			const statsImg: HTMLImageElement = document.createElement('img');
			statsImg.className = 'stats-image';
			statsImg.src = 'https://camo.githubusercontent.com/16ffb49c08a63128cf75b481dcff67089534ea943e96578406c604cacbe4de33/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d41647269616e546f6d696e267468656d653d7261646963616c26686964655f626f726465723d66616c736526696e636c7564655f616c6c5f636f6d6d6974733d7472756526636f756e745f707269766174653d74727565266c61796f75743d636f6d70616374';
			statsImg.alt = 'GitHub Language Stats';
			statsImg.style.marginTop = '10px';
			statsImg.style.display = 'none';

			// Append the image to center wrapper
			centerWrapper.appendChild(statsImg);

			// Append the center wrapper to modal content
			modalContent.appendChild(centerWrapper);

			// Add an event listener to hide the loader and show the image once it's loaded
			statsImg.onload = function (): void {
				loader.style.display = 'none';
				statsImg.style.display = 'block';
			};

			// If there's an error loading the image, hide the loader and show an error message
			statsImg.onerror = (): void => {
				loader.style.display = 'none';
				const errorMessage: HTMLParagraphElement = document.createElement('p');
				errorMessage.textContent = 'Error loading image';
				modalContent.appendChild(errorMessage);
			};
		}

		if (title === '🌐 Contact Me' && modalContent) {
			if (modalDescriptionElement) {
				modalDescriptionElement.hidden = true;
			}
			this.removeId(modalContent)
			const contactContainer: HTMLDivElement = document.createElement('div');
			contactContainer.className = 'contact-container';

			// Avatar Selfie
			const avatarSelfie: HTMLImageElement = document.createElement('img');
			avatarSelfie.src = '/avatar-selfie.jpeg';
			avatarSelfie.className = 'avatar-selfie';
			contactContainer.appendChild(avatarSelfie);

			// Description
			const descriptionElement: HTMLParagraphElement = document.createElement('p');
			descriptionElement.textContent = description;
			contactContainer.appendChild(descriptionElement);

			// Contact icons
			const iconContainer: HTMLDivElement = document.createElement('div');
			iconContainer.className = 'icon-container';

			contactMe.forEach(platform => {
				const linkElement: HTMLAnchorElement = document.createElement('a');
				linkElement.href = platform.url;
				linkElement.target = '_blank';

				const imgElement: HTMLImageElement = document.createElement('img');
				imgElement.src = platform.logo;
				imgElement.alt = `${platform.name} Logo`;
				imgElement.className = 'contact-icon';

				linkElement.appendChild(imgElement);
				iconContainer.appendChild(linkElement);
			});

			contactContainer.appendChild(iconContainer);
			modalContent.appendChild(contactContainer);
		}

		if (title === '💻 Projects' && modalContent) {
			if (modalDescriptionElement) {
				modalDescriptionElement.hidden = false;
			}
			modalContent.id = 'projects-id';
			const projectContainer: HTMLDivElement = document.createElement('div');
			projectContainer.className = 'project-container';

			projects.forEach(project => {
				const card: HTMLDivElement = document.createElement('div');
				card.className = 'project-card';

				const image: HTMLImageElement = document.createElement('img');
				image.className = 'card-image';
				image.src = project.image[0];
				image.alt = project.name;
				card.appendChild(image);

				const details: HTMLDivElement = document.createElement('div');
				details.className = 'project-details';

				const name: HTMLHeadingElement = document.createElement('h3');
				name.textContent = project.name;

				details.appendChild(name);
				card.appendChild(details);
				projectContainer.appendChild(card);

				card.addEventListener('click', (): void => {
					this.openCardModal(project.name, project.description, project.image, project.link, project.techStack);
				});
			});

			modalContent.appendChild(projectContainer);
		}

		if (this.modal) {
			this.modal.style.display = 'block';
			this.modal.classList.remove('fadeOut');
			this.modal.classList.add('fadeIn');
		}
	}

	openCardModal(projectName: string, projectDescription: string, projectImages: string[], projectLink: string, projectTechStack: Tech[]): void {
		this.currentImageIndex = 0;

		// Hide the main modal
		if (this.modal) {
			this.modal.style.display = 'none';
		}

		// Create a new modal for the card
		this.cardModal = document.createElement('div');
		this.cardModal.className = 'modal card-modal';
		document.body.appendChild(this.cardModal);

		const cardModalContent: HTMLDivElement = document.createElement('div');
		cardModalContent.className = 'modal-content';

		const cardModalHeader: HTMLDivElement = document.createElement('div');
		cardModalHeader.className = 'modal-header';

		const closeButton: HTMLSpanElement = document.createElement('span');
		closeButton.className = 'close';
		closeButton.textContent = 'x';
		closeButton.onclick = () => {
			this.cardModal?.remove();
			this.cardModal = null;

			// Show the main modal again
			if (this.modal) {
				this.modal.style.display = 'block';
			}
		};
		cardModalHeader.appendChild(closeButton);

		const cardModalTitle: HTMLHeadingElement = document.createElement('h2');
		cardModalTitle.textContent = projectName;
		cardModalTitle.className = 'centered-title';
		cardModalHeader.appendChild(cardModalTitle);

		cardModalContent.appendChild(cardModalHeader);

		const cardModalBody: HTMLDivElement = document.createElement('div');
		cardModalBody.className = 'modal-body';

		const projectDetails: HTMLDivElement = document.createElement('div');
		projectDetails.className = 'project-details';

		const description: HTMLParagraphElement = document.createElement('p');
		description.textContent = projectDescription;
		projectDetails.appendChild(description);

		cardModalBody.appendChild(projectDetails);
		cardModalContent.appendChild(cardModalBody);

		// Create a carousel for project images
		const carouselContainer: HTMLDivElement = document.createElement('div');
		carouselContainer.className = 'carousel-container';

		const prevButton: HTMLButtonElement = document.createElement('button');
		prevButton.className = 'carousel-nav prev';
		prevButton.textContent = '‹';
		prevButton.onclick = (): void => {
			this.showPreviousImage(projectImages);
		};
		carouselContainer.appendChild(prevButton);

		const imageContainer: HTMLDivElement = document.createElement('div');
		imageContainer.className = 'carousel-image-container';

		const image: HTMLImageElement = document.createElement('img');
		image.className = 'project-image';
		image.src = projectImages[this.currentImageIndex];
		image.onload = (): void => {
			image.style.width = '100%';
			image.style.height = '100%';
			image.style.objectFit = 'contain';
		};
		imageContainer.appendChild(image);
		carouselContainer.appendChild(imageContainer);

		const nextButton: HTMLButtonElement = document.createElement('button');
		nextButton.className = 'carousel-nav next';
		nextButton.textContent = '›';
		nextButton.onclick = (): void => {
			this.showNextImage(projectImages);
		};
		carouselContainer.appendChild(nextButton);

		projectDetails.appendChild(carouselContainer);

		// Tech stack section
		const techStackTitle: HTMLHeadingElement = document.createElement('h3');
		techStackTitle.textContent = 'Tech Stack';
		techStackTitle.className = 'centered-title';
		projectDetails.appendChild(techStackTitle);

		const techStackContainer: HTMLDivElement = document.createElement('div');
		techStackContainer.className = 'tech-stack-container';

		projectTechStack.forEach(tech => {
			const techItem: HTMLDivElement = document.createElement('div');
			techItem.className = 'tech-item';

			const techLogo: HTMLImageElement = document.createElement('img');
			techLogo.src = tech.logo;
			techLogo.alt = `${tech.name} Logo`;
			techLogo.className = '∫o';

			techItem.appendChild(techLogo);
			techStackContainer.appendChild(techItem);
		});

		projectDetails.appendChild(techStackContainer);

		// View here section
		const viewHereTitle: HTMLHeadingElement = document.createElement('h3');
		viewHereTitle.textContent = 'View Here';
		viewHereTitle.className = 'centered-title';
		projectDetails.appendChild(viewHereTitle);

		const viewHereLink: HTMLAnchorElement = document.createElement('a');
		viewHereLink.href = projectLink;
		viewHereLink.target = '_blank';

		const viewHereIcon: HTMLImageElement = document.createElement('img');
		viewHereIcon.src = '/github.svg';
		viewHereIcon.alt = 'View Icon';
		viewHereIcon.className = 'view-here-icon';
		viewHereLink.appendChild(viewHereIcon);
		projectDetails.appendChild(viewHereLink);

		this.cardModal.appendChild(cardModalContent);
		this.cardModal.style.display = 'block';
		this.cardModal.classList.add('fadeIn');
	}

	showPreviousImage(projectImages: string[]): void {
		this.currentImageIndex = (this.currentImageIndex - 1 + projectImages.length) % projectImages.length;
		this.updateCarouselImage(projectImages);
	}

	showNextImage(projectImages: string[]): void {
		this.currentImageIndex = (this.currentImageIndex + 1) % projectImages.length;
		this.updateCarouselImage(projectImages);
	}

	updateCarouselImage(projectImages: string[]): void {
		const imageElement = this.cardModal?.querySelector('.carousel-image-container img') as HTMLImageElement;
		if (imageElement) {
			imageElement.src = projectImages[this.currentImageIndex];
		}
		this.updateCarouselIndicators();
	}

	updateCarouselIndicators(): void {
		const indicators = this.cardModal?.querySelectorAll('.indicator') as NodeListOf<HTMLElement>;
		indicators.forEach((indicator: HTMLElement, index: number): void => {
			if (index === this.currentImageIndex) {
				indicator.classList.add('active');
			} else {
				indicator.classList.remove('active');
			}
		});
	}

	closeModal(): void {
		if (this.modal) {
			this.modal.classList.remove('fadeIn');
			this.modal.classList.add('fadeOut');
			setTimeout((): void => {
				if (this.modal) {
					this.modal.style.display = 'none';
					const imagesContainer: Element | null = this.modal.querySelector('.languages-container');
					if (imagesContainer) {
						imagesContainer.remove();
					}
					const statsImage: Element | null = this.modal.querySelector('.stats-image');
					if (statsImage) {
						statsImage.remove();
					}
					const contactContainer: Element | null = this.modal.querySelector('.contact-container');
					if (contactContainer) {
						contactContainer.remove();
					}

					const projectContainer: Element | null = this.modal.querySelector('.project-container');
					if (projectContainer) {
						projectContainer.remove();
					}
				}
			}, 600);
		}

		// Close the card modal if it's open
		if (this.cardModal) {
			this.cardModal.remove();
			this.cardModal = null;
		}
	}

	removeId(modalContent: Element): void {
		modalContent.removeAttribute('id');
	}
}