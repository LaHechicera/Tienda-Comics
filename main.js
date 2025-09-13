function enviarInicioSesion() {
    const correo = document.querySelector("#correo").value.trim();
    const contra = document.querySelector("#contrasena").value.trim();

    const mensajeFormulario = document.querySelector("#mensaje"); 
    const mensajeFlotante = document.querySelector("#mensaje-flotante");

    // Lógica para limpiar mensajes (buena práctica)
    if (mensajeFormulario) {
        mensajeFormulario.classList.remove("d-block", "alert-danger", "alert-warning");
        mensajeFormulario.innerHTML = '';
    }
    if (mensajeFlotante) {
        mensajeFlotante.classList.remove("d-block");
        mensajeFlotante.classList.add("d-none");
    }

    // 1. Validar campos vacíos
    if (!correo || !contra) {
        if (mensajeFormulario) {
            mensajeFormulario.className = "alert mt-3 alert-danger d-block";
            mensajeFormulario.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Por favor completa todos los campos.';
        }
        return;
    }

    // 2. Validar que el correo sea de un dominio específico
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    let esDominioValido = false;

    for (let i = 0; i < dominiosPermitidos.length; i++) {
        if (correo.endsWith(dominiosPermitidos[i])) {
            esDominioValido = true;
            break; // Si encuentra una coincidencia, sale del bucle
        }
    }

    // Si el dominio no es válido, muestra el error y detiene la función
    if (!esDominioValido) {
        if (mensajeFormulario) {
            mensajeFormulario.className = "alert mt-3 alert-warning d-block";
            mensajeFormulario.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Correo no válido. Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        }
        return;
    }
    
    // 3. Si todo es correcto, muestra mensaje y redirige
    if (mensajeFlotante) {
        mensajeFlotante.classList.remove("d-none");
        mensajeFlotante.classList.add("d-block");

        setTimeout(() => {
            window.location.href = "/index.html"; // Redirección exitosa
        }, 1000); 
    }
}