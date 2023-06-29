const getElement = (element, parentElement = document) => parentElement.querySelector(element);
const createElement = (element) => document.createElement(element);

const convertTime = (time	) =>{
	const date = new Date(time)
	let releaseDate = ''
	releaseDate += date.getDay();
	releaseDate +=`/${ date.getMonth()+ 1} `;
	releaseDate +=`/${date.getFullYear()}`;
	return releaseDate
}

// const array = ['fruits : olma','fruits : banan', 'auto: docha', 'auto: somsa']

// const newArr = array.filter(item => item.includes('fruit'))

// console.log(newArr);