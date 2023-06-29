const genreSelect = getElement("#gender-filter");
const genreCardList = getElement(".movies__list");
const eltemplate = getElement(".template").content;


const renderMuvieList = (films, element) => {
	const cardFragment = document.createDocumentFragment()
	films.forEach((item) => {
		const elMuvieTemplate = eltemplate.cloneNode(true)
		getElement('.movie-card__poster',elMuvieTemplate).src = item.poster
		getElement('.movie-card__link',elMuvieTemplate).textContent = item.title
		getElement('.movie-card__overview',elMuvieTemplate).textContent = item.overview
		getElement('.movie-card__release-date',elMuvieTemplate).textContent = convertTime(item.release_date,)
		item.genres.forEach((itm) =>{
			renderGenresList(itm, getElement('.movie-card__genres',elMuvieTemplate))
		})
		cardFragment.append(elMuvieTemplate)
	});
		genreCardList.append(cardFragment)

	const rendergenreSelect = (arr,element) => {
		const genresFragment = document.createDocumentFragment()
		element.innerHTML = null 
		element.innerHTML = '<option id="option__disabled" value="" disabled selected>filter by gender</option>'
		arr.forEach((i) => {
			const FilterOption = createElement('option')
			FilterOption.textContent = i.name.toUpperCase()
			FilterOption.value = i.name
			genresFragment.append(FilterOption)
		})
		element.append(genresFragment)
	}
	rendergenreSelect(genres,genreSelect)
}
function renderGenresList(genre, element) {   
	const GanreLi = createElement("li");
	GanreLi.className = "movie-card__genre badge";
	GanreLi.textContent = genre;
	element.append(GanreLi);
  }
renderMuvieList(films,genreCardList)

function handleSubmit(e){ 
	e.preventDefault()
	genreCardList.innerHTML = ''
	renderMuvieList(films.filter(film => film.genres.includes(genreSelect.value)), genreCardList)
}


getElement('.filter-form').addEventListener('submit', handleSubmit)

