// VARIABLES 
const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const movieList = document.getElementById("movie-list")
const savedMovies = JSON.parse(localStorage.getItem("myMovies"))
let myMovies = []

// GET SEARCH DATA
if(searchBtn) {
    searchBtn.addEventListener('click', function() {
        let searchValue = searchInput.value
        fetch(`https://www.omdbapi.com/?apikey=b0a0eb8f&s=${searchValue}&type=movie`)
            .then(res => res.json())
            .then(data => {
                let movies = data.Search
                if(movies) {
                    movieList.innerHTML = ""
                    for(let movie of movies) {
                        movieID = movie.imdbID
                        lookupMovie(movieID)
                    }
                } else {
                    movieList.innerHTML = `
                        <div class="not-found">
                            <p>Unable to find what you’re looking for. 
                            Please try another search.</p>
                        </div> 
                    ` 
                }
            })
            searchInput.value = ""
    })
}

// GET MOVIE DATA
function lookupMovie(movieID) {
    fetch(`https://www.omdbapi.com/?apikey=b0a0eb8f&i=${movieID}`)
        .then(res => res.json())
        .then(movieData => {
            renderMovies(movieID, movieData)
        })
}

// RENDER MOVIES
function renderMovies(movieID, movieData) {
    movieList.innerHTML += `
        <div class="movie-container">
            <div class="movie-poster">
                ${
                    movieData.Poster !== "N/A" ? `<img src="${movieData.Poster}"/>`
                    : `<p class="poster-unavailable">Not Available</p>`
                }
            </div>
            <div class="movie-text">
                <div class="movie-text-row-one">
                    <h2 class="movie-title">${movieData.Title}</h2>
                    <img src="images/star-icon.png" class="star-icon"/>
                    <p class="movie-rating">${movieData.imdbRating}</p>
                </div>
                <div class="movie-text-row-two">
                    <p class="movie-runtime">${movieData.Runtime}</p>
                    <p class="movie-genre">${movieData.Genre}</p>
                    <button 
                        class="add-btn" 
                        data-add=${movieData.imdbID}>
                        <span>+</span> Watchlist
                    </button>
                </div>
                <div class="movie-text-row-three">
                    <p class="movie-plot">${movieData.Plot}</p>
                </div>
            </div>
        </div>
    `
}

// ADD TO LOCAL STORAGE 
document.addEventListener('click', (e) => {
    if(savedMovies) {
        myMovies = savedMovies
    }
    if(e.target.dataset.add) {
        if(myMovies.includes(e.target.dataset.add)) {
            return
        } else {
            myMovies.push(e.target.dataset.add)
        }
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
    }
})
