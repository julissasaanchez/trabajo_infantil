/* NÚMEROS ALEATORIOS */
let numeros = [1,2,3,4,5,6,7,8,9,10];

numeros = numeros.sort(() => Math.random() - 0.5);

let indiceActual = 0;

let numeroActual = numeros[indiceActual];

const titulo = document.getElementById("titulo");
const zonaManzanas = document.getElementById("zonaManzanas");
const canasta = document.getElementById("canasta");
const estrellasDiv = document.getElementById("estrellas");
const btnRevisar = document.getElementById("btnRevisar");

const sonidoClick = new Audio("audio/click.mp3");
const sonidoOk = new Audio("audio/ok.mp3");
const sonidoError = new Audio("audio/error.mp3");

let estrellas = 1;

/* CUÁNTAS MANZANAS PUSO */
let contador = 0;

hablar("Ahora vamos a practicar lo aprendido");

crearJuego();

/* CREAR JUEGO */
function crearJuego(){

    titulo.textContent =
        "🍎 Coloca " + numeroActual + " manzana" +
        (numeroActual > 1 ? "s" : "") +
        " en la canasta";

    zonaManzanas.innerHTML = "";

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

    hablar(contador.toString());

});

/* BOTÓN REVISAR */
btnRevisar.addEventListener("click", ()=>{

    sonidoClick.play();

    /* CORRECTO */
    if(contador === numeroActual){

        sonidoOk.play();

        lanzarConfetti();

        estrellas++;

        actualizarEstrellas();

        hablar("Muy bien");

        setTimeout(()=>{

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

    }

});

/* ESTRELLAS */
function actualizarEstrellas(){

    estrellasDiv.innerHTML = "";

    for(let i=0; i<estrellas; i++){

        estrellasDiv.innerHTML += "⭐";

    }

}

/* VOZ */
function hablar(texto){

    let mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = "es-ES";

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

    hablar("Excelente, terminaste el juego");

    titulo.textContent =
        "🏆 ¡Felicitaciones! Terminaste el juego";

    zonaManzanas.innerHTML = "";

    btnRevisar.style.display = "none";

}