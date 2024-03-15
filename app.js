const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets=[];
eventListeners();
function eventListeners(){
    formulario.addEventListener('sumbit', agregarTweet);
    listaTweets.addEventListener('click', borrarTweet);
    document.addEventListener('DOMContentLoaded',() => {
        tweets =JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}
function agregarTweet(evento){
    evento.preventDefault();
    const tweet=document.querySelector('#tweet').value;
    if(tweet ==''){
        mostrarError('ingrese todos los campos');
        return;
    }
}


function mostrarError(error) {
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error');

    const contenido = document.querySelector('#contenido'); 
    contenido.appendChild (mensajeEerror);

    setTimeout(() => {
        mensajeEerror.remove();
    }, 3000);
}
function agregarTweet(evento){
    evento.preventDefault();
    const tweet=document.querySelector('#tweet').value;

    if (tweet ===''){
        mostrarError('Ingrese todos los campos');
        return;
    }
    const tweetObj ={
        id: Date.now(),
        texto: tweet
    }
    tweets = [...tweets,tweetObj];
    crearHTML();
    formulario.reset();
}
function crearHTML(){
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            const botonBorrar = document.createElement('a');
            botonBorrar.classList='borrar-tweet';
            botonBorrar.innerText = 'X';
            const li = document.createElement('li');
            li.innerText=tweet.texto;
            li.appendChild(botonBorrar);
            li.dataset.tweetId = tweet.id;
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function borrarTweet(e){
    e.preventDefault();
    const id=e.target.parentElement.dataset.tweetId;
    tweets=tweets.filter(tweet => tweet.id !=id);
    crearHTML();
}
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}