let avatarSeleccionado = "";

// Mantiene tu funcionalidad de selección
function seleccionarAvatar(img) {
    // Quitar selección previa
    let avatares = document.querySelectorAll(".avatars img");
    avatares.forEach(a => a.classList.remove("selected"));

    // Agregar selección actual
    img.classList.add("selected");

    // Guardar ruta del avatar
    avatarSeleccionado = img.getAttribute("src");
}

// Función para hablar
function hablar(texto) {
    let mensaje = new SpeechSynthesisUtterance(texto);
    mensaje.lang = "es-ES";
    speechSynthesis.speak(mensaje);
}

// 🎉 CONFETTI (FUERA de ingresar)
function lanzarConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function ingresar() {
    let nombre = document.getElementById("nombre").value.trim();

    // Validaciones
    if (nombre === "" && avatarSeleccionado === "") {
        hablar("Debe ingresar su nombre y seleccionar un avatar");
        return;
    }

    if (nombre === "") {
        hablar("Debe ingresar su nombre");
        return;
    }

    if (avatarSeleccionado === "") {
        hablar("Debe seleccionar un avatar");
        return;
    }




    // Guardar datos (para la siguiente página)
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("avatar", avatarSeleccionado);

    // Audio de éxito
    hablar("Excelente " + nombre);


    //confetti
    lanzarConfetti();



    // Redirigir después de un pequeño delay para que alcance a hablar 
setTimeout(() => { window.location.href = "inicio.html"; }, 2500); 

}







