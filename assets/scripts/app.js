const addMovieModal = document.getElementById('add-modal');
//const addMovieModal = document.querySelector('#add-modal');
//const addMovieModal = document.body.children[1];


//const startAddMoveButton = document.querySelector('header ').lastElementChild;

const startAddMoveButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop')
const cancelAddMovie = addMovieModal.querySelector('.btn--passive')
const AddMovieBtn = addMovieModal.querySelector('.btn--success')

const userInputs = document.querySelectorAll('input')
const entryTextSection = document.getElementById('entry-text')


const movies = [];

const updateUi = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}


const deleteMovieHandler = (moveId) => {
    let moveIndex = 0;
    for (const movie of movies) {
        if (movie.id === moveId) {
            break;
        }
        moveIndex++;
    }
    movies.splice(moveIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[moveIndex].remove();
}

const renderNewMovie = function newMovieRender(title, image, rating, id) {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = "movie-element_image">
    <img src = "${image}" alt = "${title}">
    </div>
    <div class = "movie-element_info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}


const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible')
    toggleBackDrop();
}


const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = ''
    }
}

const toggleBackDrop = () => {
    backdrop.classList.toggle('visible');
}

const backDropClickHandler = () => {
    toggleMovieModal();
}

const AddMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrl = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || imageUrl.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
        alert('Please Enter value btwn 1 and 5');
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrl,
        rating: ratingValue
    }
    movies.push(newMovie);
    console.log(movies)
    clearMovieInput();
    renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUi();
}


startAddMoveButton.addEventListener('click', toggleMovieModal)
backdrop.addEventListener('click', backDropClickHandler)
cancelAddMovie.addEventListener('click', () => {
    toggleMovieModal();
})
AddMovieBtn.addEventListener('click', AddMovieHandler);