let numeroActual = 1;

const numeroTexto = document.getElementById("numero");
const imagenesDiv = document.getElementById("imagenes");
const btnSiguiente = document.getElementById("btnSiguiente");
const estrellasDiv = document.getElementById("estrellas");

const nombre = localStorage.getItem("nombre");

const imagen = "img/manzana.webp";

/* SONIDOS */
const sonidoClick = new Audio("audio/click.mp3");
const sonidoOk = new Audio("audio/ok.mp3");
const sonidoError = new Audio("audio/error.mp3");

let estrellas = 1;

mostrarNumero();

/* BOTÓN SIGUIENTE */
btnSiguiente.addEventListener("click", () => {

    reproducirClick();

    if(numeroActual < 10){

        numeroActual++;

        estrellas++;

        mostrarNumero();

        sonidoOk.play();

    }else{

        finalizarAprendizaje();

    }

});

/* MOSTRAR NÚMERO */
function mostrarNumero(){

    numeroTexto.textContent = numeroActual;

    /* CAMBIAR COLOR */
    let color = (numeroActual % 5) + 1;

    numeroTexto.className = "color" + color;

    imagenesDiv.innerHTML = "";

    for(let i = 1; i <= numeroActual; i++){

        let img = document.createElement("img");

        img.src = imagen;

        /* CONTAR MANZANAS */
        img.addEventListener("click", () => {

            reproducirClick();

            hablar(i.toString());

        });

        imagenesDiv.appendChild(img);

    }

    actualizarEstrellas();

    hablar("Número " + numeroActual);

}

/* ACTUALIZAR ESTRELLAS */
function actualizarEstrellas(){

    estrellasDiv.innerHTML = "";

    for(let i=0; i<estrellas; i++){

        estrellasDiv.innerHTML += "⭐";

    }

}

/* HABLAR */
function hablar(texto){

    let mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = "es-ES";

    speechSynthesis.speak(mensaje);

}

/* SONIDO CLICK */
function reproducirClick(){

    sonidoClick.currentTime = 0;

    sonidoClick.play();

}

/* FINALIZAR */
function finalizarAprendizaje(){

    lanzarConfetti();

    sonidoOk.play();

    setTimeout(() => {

        hablar("Excelente " + nombre + ", terminaste los números del 1 al 10");

        btnSiguiente.textContent = "🎮 Poner en práctica";

        btnSiguiente.onclick = () => {

            reproducirClick();

            window.location.href = "juego.html";
        }

    }, 2000     );

}

/* CONFETTI */
function lanzarConfetti(){

    const duration = 3000;

    const end = Date.now() + duration;

    (function frame(){

        confetti({
            particleCount:5,
            angle:60,
            spread:55,
            origin:{ x:0 }
        });

        confetti({
            particleCount:5,
            angle:120,
            spread:55,
            origin:{ x:1 }
        });

        if(Date.now() < end){

            requestAnimationFrame(frame);

        }

    })();

}

/* VOLVER */
function volverInicio(){

    reproducirClick();

    window.location.href = "inicio.html";

}