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

/* INICIAR */
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



function mostrarNumero(){

    numeroTexto.textContent = numeroActual;

    let color = (numeroActual % 5) + 1;

    numeroTexto.className = "color" + color;

    imagenesDiv.innerHTML = "";

    for(let i = 1; i <= numeroActual; i++){

        /* CONTENEDOR */
        let contenedor = document.createElement("div");

        contenedor.className = "manzana-container";

        /* NUMERO */
        let numeroVisible = document.createElement("div");

        numeroVisible.className = "numero-visible";

        numeroVisible.innerHTML = i;

        /* IMAGEN */
        let img = document.createElement("img");

        img.src = imagen;

        img.addEventListener("click", () => {

            reproducirClick();

            hablar(i.toString());

            /* MOSTRAR */
            numeroVisible.style.opacity = "1";

            numeroVisible.style.transform = "translateY(-10px) scale(1.3)";

            setTimeout(() => {

                numeroVisible.style.opacity = "0";

                numeroVisible.style.transform = "translateY(20px) scale(0.5)";

            }, 800);

        });

        contenedor.appendChild(numeroVisible);

        contenedor.appendChild(img);

        imagenesDiv.appendChild(contenedor);

    }

    hablar("Número " + numeroActual);

}



/* HABLAR */
function hablar(texto){

    speechSynthesis.cancel();

    let mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = "es-ES";

    mensaje.volume = 1;

    mensaje.rate = 0.9;

    mensaje.pitch = 1;

    speechSynthesis.speak(mensaje);

}

/* REPRODUCIR TÍTULO */
function reproducirTitulo(){

    reproducirClick();

    setTimeout(() => {

        hablar("Aprendamos a contar del uno al diez");

    }, 200);

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