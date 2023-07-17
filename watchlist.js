// VARIABLES
const watchlist = document.getElementById("watchlist")
const savedMovies = JSON.parse(localStorage.getItem("myMovies"))
let myMovies = []

// RENDER WATCHLIST
function renderWatchlist() {
    if(savedMovies.length) {
        for(let i = 0; i < savedMovies.length; i++){
            fetch(`https://www.omdbapi.com/?i=${savedMovies[i]}&apikey=b0a0eb8f`)
                .then(res => res.json())
                .then(data => {
                    watchlist.innerHTML += `
                        <div class="movie-container">
                            <div class="movie-poster">
                                ${
                                    data.Poster !== "N/A" ? `<img src="${data.Poster}"/>`
                                    : `<p class="poster-unavailable">Not Available</p>`
                                }
                            </div>
                            <div class="movie-text">
                                <div class="movie-text-row-one">
                                    <h2 class="movie-title">${data.Title}</h2>
                                    <img src="images/star-icon.png" class="star-icon"/>
                                    <p class="movie-rating">${data.imdbRating}</p>
                                </div>
                                <div class="movie-text-row-two">
                                    <p class="movie-runtime">${data.Runtime}</p>
                                    <p class="movie-genre">${data.Genre}</p>
                                    <button 
                                        class="remove-btn" 
                                        data-remove=${data.imdbID}>
                                        <span>-</span> Remove
                                    </button>
                                </div>
                                <div class="movie-text-row-three">
                                    <p class="movie-plot">${data.Plot}</p>
                                </div>
                            </div>
                        </div>
                    `
                })
        }
    } else {
        watchlist.innerHTML = `
            <div class="empty-watchlist">
                <p class="empty-watchlist-text">
                    Your watchlist is looking a little empty...
                </p>
                <a href="index.html" class="empty-watchlist-link">
                    <span>+</span> Let's add some movies!
                </a>
            </div>
        `
    }
}

renderWatchlist()

// REMOVE FROM WATCHLIST 
document.addEventListener('click', (e) => {
    if(savedMovies) {
        myMovies = savedMovies
    }
    if(e.target.dataset.remove) {
        myMovies.splice(myMovies.indexOf(e.target.dataset.remove), 1)
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
        watchlist.innerHTML = ""
        renderWatchlist()
    }
})