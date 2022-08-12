const moviesContainer = document.querySelector('.movies');
const btnVoltar = document.querySelector('.btn-prev');
const btnProximo = document.querySelector('.btn-next');
const input = document.querySelector('.input');

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const modalImage = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalAverage = document.querySelector('.modal__average');
const modalGenre = document.querySelector('.modal__genres');


const video = document.querySelector('.highlight__video');
const titulo = document.querySelector('.highlight__title');
const rating = document.querySelector('.highlight__rating');
const genero = document.querySelector('.highlight__genres');
const launch = document.querySelector('.highlight__launch');
const descricao = document.querySelector('.highlight__description');
const linkVideo = document.querySelector('.highlight__video-link')


let paginaAtual = 0;
let filmesAtuais = [];

input.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') {
        return;
    }
    paginaAtual = 0;

    if (input.value) {
        mostrarFilmeBuscado(input.value)
    } else {
        mostrarFilmes()
    }

    input.value = '';
})

btnVoltar.addEventListener('click', function () {
    if (paginaAtual === 0) {
        paginaAtual = 3;
    } else {
        paginaAtual--;
    }
    displayFilmes()
});

btnProximo.addEventListener('click', function () {
    if (paginaAtual === 3) {
        paginaAtual = 0;
    } else {
        paginaAtual++;
    }
    displayFilmes()
});

function displayFilmes() {
    moviesContainer.textContent = "";

    for (let i = paginaAtual * 5; i < (paginaAtual + 1) * 5; i++) {

        const movie = filmesAtuais[i];

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie')
        movieContainer.style.backgroundImage = `url('${movie.poster_path}')`

        movieContainer.addEventListener('click', function () {
            modalFilme(movie.id);
        })

        const movieInfo = document.createElement('div')
        movieInfo.classList.add('movie__info')

        const movieTitle = document.createElement('span')
        movieTitle.classList.add('movie__title')
        movieTitle.textContent = movie.title;

        const movieRating = document.createElement('span')
        movieRating.classList.add('movie__rating')

        const star = document.createElement('img')
        star.src = "./assets/estrela.svg"

        movieRating.append(star, movie.vote_average)
        movieInfo.append(movieTitle, movieRating)
        movieContainer.append(movieInfo)

        moviesContainer.append(movieContainer)

    }
}

function mostrarFilmes() {

    const promessa = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR');

    promessa.then(function (resposta) {
        const promessaBody = resposta.json();

        promessaBody.then(function (body) {
            filmesAtuais = body.results;

            displayFilmes()
        })
    })
}

function mostrarFilmeBuscado(busca) {

    const promessa = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${busca}`);

    promessa.then(function (resposta) {
        const promessaBody = resposta.json();

        promessaBody.then(function (body) {
            filmesAtuais = body.results;

            displayFilmes()
        })
    })
}

function filmeDia() {

    const promessa = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR');

    promessa.then(function (resposta) {
        const promessaBody = resposta.json();

        promessaBody.then(function (body) {
            video.style.background = `linear-gradient(rgba(0, 0, 0, 0.6) 100%, rgba(0, 0, 0, 0.6) 100%), url('${body.backdrop_path}') no-repeat center / cover`;
            titulo.textContent = body.title;
            rating.textContent = body.vote_average;
            genero.textContent = body.genres.map(function (genre) {
                return genre.name;
            }).join(', ');
            launch.textContent = (new Date(body.release_date)).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
            descricao.textContent = body.overview
        })
    })

    const promessaVideo = fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR');

    promessaVideo.then(function (resposta) {
        const promessaBody = resposta.json();

        promessaBody.then(function (body) {
            linkVideo.href = `https://www.youtube.com/watch?v=${body.results[0].key}`
        })
    })
}

function modalFilme(id) {

    const promessa = fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`);

    promessa.then(function (resposta) {
        const promessaBody = resposta.json();

        promessaBody.then(function (body) {
            modalTitle.textContent = body.title;
            modalImage.src = body.backdrop_path;
            modalDescription.textContent = body.overview;
            modalAverage.textContent = body.vote_average;

            console.log(body.title)
        })
    })
}

mostrarFilmes();
filmeDia();