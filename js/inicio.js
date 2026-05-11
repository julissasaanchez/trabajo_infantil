

let nombre = localStorage.getItem("nombre");
        let avatar = localStorage.getItem("avatar");

        // Validar si no hay datos (por seguridad)
        if (!nombre || !avatar) {
            window.location.href = "index.html";
        }

        document.getElementById("nombreUsuario").textContent = nombre;
        document.getElementById("avatarUsuario").src = avatar;

        function cerrarSesion() {
            localStorage.clear();
            window.location.href = "index.html";
        }

        function irAprendizaje() {
    window.location.href = "aprendizaje.html";
        }

