/* const movies = document.querySelector('.movies');

function getApi() {
    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR').then(async resposta => {
        if (!resposta.ok) {
            throw new Error(resposta.status)
        }

        const dados = await resposta.json();

        dados.results.map(item => {
            const filme = document.createElement('div');

            filme.innerHTML = `
            <img src=${item.poster_path} /> 
            <span> ${item.title}</span>
            <span> ${item.vote_average}</span> `

            movies.appendChild(filme)

        })

    }).catch(e => console.log(e))
}

getApi();
 */


