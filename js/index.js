// ? caller from dom node
const getElement = (element, parentElement = document) => {
  return parentElement.querySelector(element);
};

const elList = getElement(".movies__list");
const elTemplate = getElement(".template").content;
const elForm = getElement(".site-header__form");
const elSelect = getElement(".filter-form__select");

// ? fixing  unix time into real time
const fixDate = (date) => {
  const newDate = new Date(date * 1000);
  let releaseDate = "";
  releaseDate += String(newDate.getDate()).padStart(2, "0");
  releaseDate += ` -${String(newDate.getMonth() + 1).padStart(2, "0")}- `;
  releaseDate += String(newDate.getFullYear()).padStart(2, "0");
  return releaseDate;
};

// ? render movie card genre
const renderGenres = (genre, goingElement) => {
  const newLi = document.createElement("li");
  newLi.className = "movie-card__genre badge";
  newLi.textContent = genre;
  goingElement.append(newLi);
};

// ! render movie form filter
const renderFilter = (genres, goingElement) => {
  goingElement.innerHTML = null;
  goingElement.innerHTML =' <option value="" disabled selected>filter by gender</option>';

  const filterFragment = document.createDocumentFragment();
  genres.forEach((genre) => {
    const newOption = document.createElement("option");
    newOption.textContent = genre.name.toUpperCase();
    newOption.id = genre.id;
    newOption.value = genre.name;
    filterFragment.append(newOption);
  });
  goingElement.append(filterFragment);
};


// ! render movie cards
const renderList = (films, goingElement) => {
  goingElement.innerHTML = null;
  const fragment = document.createDocumentFragment();

  for (let film of films) {
    const template = elTemplate.cloneNode(true);
    getElement(".movies__item", template).id = film.id;
    getElement(".movie-card__poster", template).src = film.poster;
    getElement(".movie-card__link", template).textContent = film.title;
    getElement(".movie-card__overview", template).textContent = film.overview;
    getElement(".movie-card__release-date", template).textContent = fixDate(
      film.release_date
    );
    film.genres.forEach((genre) => {
      renderGenres(genre, getElement(".movie-card__genres", template));
    });
    fragment.append(template);
  }
  goingElement.append(fragment);
  renderFilter(genres, elSelect);
};
renderList(films, elList);

// ! logic about submitting
const handleSubmit = (e) => {
  e.preventDefault();

  console.log(elSelect.value);
  if(elSelect.value.trim() === 'All' || elSelect.value === '' ){
	return  renderList(films,elList)

  }
  renderList(films.filter((film) => film.genres.includes(elSelect.value)),elList);
  e.target.reset()
};

elForm.addEventListener("submit", handleSubmit);
