/* NÚMEROS ALEATORIOS */
let numeros = [1,2,3,4,5,6,7,8,9,10];

numeros = numeros.sort(() => Math.random() - 0.5);

let indiceActual = 0;

let numeroActual = numeros[indiceActual];

const titulo = document.getElementById("titulo");
const zonaManzanas = document.getElementById("zonaManzanas");
const canasta = document.getElementById("canasta");
const manzanasCanasta = document.getElementById("manzanasCanasta");
const estrellasDiv = document.getElementById("estrellas");
const btnRevisar = document.getElementById("btnRevisar");
const btnHablar = document.getElementById("btnHablar");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnSiguienteJuego = document.getElementById("btnSiguienteJuego");

const sonidoClick = new Audio("audio/click.mp3");
const sonidoOk = new Audio("audio/ok.mp3");
const sonidoError = new Audio("audio/error.mp3");

let estrellas = 1;

/* CUÁNTAS MANZANAS PUSO */
let contador = 0;

hablar("Ahora vamos a practicar lo aprendido");

crearJuego();

actualizarEstrellas();

/* CREAR JUEGO */
function crearJuego(){

    titulo.textContent =
        "🍎 Coloca " + numeroActual + " manzana" +
        (numeroActual > 1 ? "s" : "") +
        " en la canasta";

    hablar(titulo.textContent);

    zonaManzanas.innerHTML = "";

    manzanasCanasta.innerHTML = "";

    contador = 0;

    for(let i=0; i<10; i++){

        let img = document.createElement("img");

        img.src = "img/manzana.webp";

        img.classList.add("manzana");

        img.draggable = true;

        img.addEventListener("dragstart", drag);

        zonaManzanas.appendChild(img);

    }

}


btnHablar.addEventListener("click", () => {

    sonidoClick.currentTime = 0;

    sonidoClick.play();

    hablar(titulo.textContent);

});


btnReiniciar.addEventListener("click", ()=>{

    sonidoClick.play();

    reiniciarIntento();

});


/* DRAG */
function drag(e){

    e.dataTransfer.setData("text", "manzana");

}

/* ALLOW DROP */
canasta.addEventListener("dragover", (e)=>{

    e.preventDefault();

});

/* DROP */
canasta.addEventListener("drop", (e)=>{

    e.preventDefault();

    contador++;

    sonidoClick.currentTime = 0;

    sonidoClick.play();

    /* MANZANA DEBAJO */
    let img = document.createElement("img");

    img.src = "img/manzana.webp";

    img.classList.add("manzana-canasta");

    manzanasCanasta.appendChild(img);

});


/* BOTÓN REVISAR */
btnRevisar.addEventListener("click", ()=>{

    btnRevisar.disabled = true;

    sonidoClick.play();

    /* CORRECTO */
    if(contador === numeroActual){

        sonidoOk.play();

        lanzarConfetti();

        estrellas++;

        actualizarEstrellas();

        hablar("Muy bien");

        setTimeout(()=>{

            btnRevisar.disabled = false;

            indiceActual++;

            if(indiceActual < numeros.length){

                numeroActual = numeros[indiceActual];

                crearJuego();

            }else{

                finalizarJuego();

            }

        },1500);

    }

    /* INCORRECTO */
    else{

    sonidoError.play();

    hablar("Respuesta incorrecta");

    /* QUITAR ESTRELLA */
    if(estrellas > 0){

        estrellas--;

        actualizarEstrellas();

    }

    reiniciarIntento();

    btnRevisar.disabled = false;
}

});

btnSiguienteJuego.addEventListener("click", ()=>{

    sonidoClick.play();

    window.location.href = "juego2.html";

});

/* ESTRELLAS */
function actualizarEstrellas(){

    estrellasDiv.innerHTML = "";

    for(let i=0; i<estrellas; i++){

        estrellasDiv.innerHTML += "⭐";

    }

}

/* REINICIAR */
function reiniciarIntento(){

    contador = 0;

    manzanasCanasta.innerHTML = "";

}

/* VOZ */
/* VOZ */
function hablar(texto){

    speechSynthesis.cancel();

    /* QUITAR EMOJIS */
    texto = texto.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "");

    const mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = "es-ES";

    mensaje.volume = 1;

    mensaje.rate = 0.9;

    mensaje.pitch = 1;

    speechSynthesis.speak(mensaje);

}

/* CONFETTI */
function lanzarConfetti(){

    confetti({
        particleCount:150,
        spread:90
    });

}

/* FINAL */
function finalizarJuego(){

    lanzarConfetti();

    sonidoOk.play();

    titulo.textContent =
        "🏆 ¡Felicitaciones! Terminaste el juego";

    hablar(titulo.textContent);

    zonaManzanas.innerHTML = "";

    manzanasCanasta.innerHTML = "";

    /* ELIMINAR CANASTA */
    canasta.remove();

    /* OCULTAR BOTONES */
    btnRevisar.style.display = "none";

    btnReiniciar.style.display = "none";

    /* MOSTRAR BOTÓN SIGUIENTE */
    btnSiguienteJuego.style.display = "inline-block";

}