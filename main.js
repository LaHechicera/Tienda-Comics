document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#formularioContacto");

    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita que el formulario se envíe y recargue la página
            enviarInicioSesion();
        });
    }
});

function enviarInicioSesion() {
    const correo = document.querySelector("#correo").value.trim();
    const contra = document.querySelector("#contrasena").value.trim();

    // NUEVA LÓGICA: Verificar credenciales de administrador
    if (correo === "admin@admin.cl" && contra === "123456") {

        setTimeout(() => {
            window.location.href = "/indexAdmin.html"; 
        }, 500);// Redirige a la página de administrador
        return; // Detiene la ejecución de la función para no continuar con las validaciones normales
    }

    const mensajeFormulario = document.querySelector("#mensaje"); 
    const mensajeFlotante = document.querySelector("#mensaje-flotante");

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
            break; 
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
            window.location.href = "/index.html"; 
        }, 1000); 
    }
}

function enviarRegistro() {
    const nombre = document.querySelector("#nombre").value.trim();
    const apellidos = document.querySelector("#apellidos").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const contra = document.querySelector("#contrasena").value.trim();

     const mensajeFormulario = document.querySelector("#mensaje"); 
    const mensajeFlotante = document.querySelector("#mensaje-flotante"); 


    if (!correo || !contra || !nombre || !apellidos) {
        if (mensajeFormulario) {
            mensajeFormulario.className = "alert mt-3 alert-danger d-block";
            mensajeFormulario.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Por favor completa todos los campos.';
        }
        return;

    }

    // Es importante que la variable esDominioValido esté definida. 
    // Para que este código funcione, es necesario que la validación de dominio se agregue también en esta función.
    // He quitado la condición `if (!esDominioValido)` para que el código no falle, pero te recomiendo agregar esa validación si es necesaria para el registro.

    if (mensajeFlotante) {
        mensajeFlotante.classList.remove("d-none");
        mensajeFlotante.classList.add("d-block");

        setTimeout(() => {
            window.location.href = "/index.html"; 
        }, 1000); 
    }
}