/* NÚMEROS */
let numeros = [1,2,3,4,5,6,7,8,9,10];

numeros = numeros.sort(() => Math.random() - 0.5);

let indiceActual = 0;

let numeroCorrecto = numeros[indiceActual];

const titulo = document.getElementById("titulo");
const zonaNumeros = document.getElementById("zonaNumeros");
const estrellasDiv = document.getElementById("estrellas");
const btnHablar = document.getElementById("btnHablar");
const btnReiniciar = document.getElementById("btnReiniciar");

const sonidoClick = new Audio("audio/click.mp3");
const sonidoOk = new Audio("audio/ok.mp3");
const sonidoError = new Audio("audio/error.mp3");

let estrellas = 1;

crearJuego();

actualizarEstrellas();

/* CREAR JUEGO */
function crearJuego(){

    titulo.textContent =
        "🎈 Haz clic en el número " + numeroCorrecto;

    zonaNumeros.innerHTML = "";

    let mezclados = [...numeros];

    mezclados.sort(() => Math.random() - 0.5);

    mezclados.forEach(numero => {

        let globo = document.createElement("div");

        globo.classList.add("globo");

        let color = Math.floor(Math.random() * 5) + 1;

        globo.classList.add("color" + color);

        globo.textContent = numero;

        /* CLICK */
        globo.addEventListener("click", ()=>{

            sonidoClick.play();

            /* CORRECTO */
            if(numero === numeroCorrecto){

                sonidoOk.play();

                hablar("Muy bien");

                lanzarConfetti();

                estrellas++;

                actualizarEstrellas();

                globo.style.visibility = "hidden";

                setTimeout(()=>{

                    indiceActual++;

                    if(indiceActual < numeros.length){

                        numeroCorrecto = numeros[indiceActual];

                        crearJuego();

                    }else{

                        finalizarJuego();

                    }

                },1000);

            }

            /* INCORRECTO */
            else{

                sonidoError.play();

                hablar("Intenta nuevamente");

                if(estrellas > 0){

                    estrellas--;

                    actualizarEstrellas();

                }

                globo.style.animation = "none";

                globo.style.transform = "scale(0.8)";

                setTimeout(()=>{

                    globo.style.transform = "scale(1)";

                    globo.style.animation = "flotar 2s infinite ease-in-out";

                },300);

            }

        });

        zonaNumeros.appendChild(globo);

    });

}

/* BOTÓN HABLAR */
btnHablar.addEventListener("click", ()=>{

    sonidoClick.play();

    hablar(titulo.textContent);

});

/* REINICIAR */
btnReiniciar.addEventListener("click", ()=>{

    sonidoClick.play();

    crearJuego();

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

    speechSynthesis.cancel();

    texto = texto.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, "");

    let mensaje = new SpeechSynthesisUtterance(texto);

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
        "🏆 ¡Excelente! Terminaste el juego";

    hablar(titulo.textContent);

    zonaNumeros.innerHTML = "";

    btnReiniciar.style.display = "none";

}