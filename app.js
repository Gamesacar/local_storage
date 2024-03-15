const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets = [];
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
    listaTweets.addEventListener('click', borrarTweet);
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}

function agregarTweet(evento) {
    evento.preventDefault();
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('Ingrese todos los campos');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet
    };

    tweets = [...tweets, tweetObj];
    crearHTML();
    formulario.reset();
}

function mostrarError(error) {
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeEerror);

    setTimeout(() => {
        mensajeEerror.remove();
    }, 3000);
}

function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const tweetDiv = document.createElement('div');
            tweetDiv.classList.add('tweet-container');

            const tweetText = document.createElement('div');
            tweetText.textContent = tweet.texto;
            tweetText.classList.add('tweet-text');

            const borrarTweet = document.createElement('a');
            borrarTweet.textContent = 'X';
            borrarTweet.href = '#';
            borrarTweet.classList.add('borrar-tweet');
            borrarTweet.dataset.tweetId = tweet.id;

            tweetDiv.appendChild(tweetText);
            tweetDiv.appendChild(borrarTweet);

            listaTweets.appendChild(tweetDiv);
        });
    }
}

function borrarTweet(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-tweet')) {
        const id = Number(e.target.dataset.tweetId);
        tweets = tweets.filter(tweet => tweet.id !== id);
        crearHTML();
    }
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
