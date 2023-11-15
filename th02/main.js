const ball = document.getElementsByClassName("boll")[0];


const isInViewport = (element) => {
	const rect = element.getBoundingClientRect();
	const html = document.documentElement;
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || html.clientHeight) &&
		rect.right <= (window.innerWidth || html.clientWidth)
	);
}

const repeat = () => {
	if (isInViewport(ball)) {
		ball.classList.add('animex');
	} else {
		ball.classList.remove('animex');
	}

	requestAnimationFrame(repeat);
}

repeat()

/*
window.addEventListener('scroll', function (event) {
	if (isInViewport(ball)) {
		ball.classList.add('animex');
	} else {
		ball.classList.remove('animex');
	}
})*/
