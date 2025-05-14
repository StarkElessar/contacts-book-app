export const headerFixed = () => {
	const header = document.querySelector('.header');
	const firstScreen = document.querySelector('[data-observ]');

	const headerStickyObserver = new IntersectionObserver(([entry]) => {
		header.classList.toggle('_sticky', !entry.isIntersecting);
	});

	if (firstScreen) {
		headerStickyObserver.observe(firstScreen);
	}
};
