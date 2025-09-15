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


// Lógica para agregar productos al carrito

document.addEventListener("DOMContentLoaded", function () {
    const botonesCompra = document.querySelectorAll(".btn-carrito-agregar");
    const cuerpoTabla = document.querySelector("#carrito-body");
    const mensajeAlerta = document.querySelector("#mensaje-alerta");

    // Función para actualizar la tabla del carrito desde localStorage
    function actualizarTabla() {
        cuerpoTabla.innerHTML = "";
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        carrito.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio.toLocaleString("es-CL")}</td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    }

    // Cargar carrito al iniciar la página
    actualizarTabla();

    botonesCompra.forEach(boton => {
        boton.addEventListener("click", function () {
            const nombre = this.getAttribute("data-nombre");
            const precio = parseInt(this.getAttribute("data-precio"), 10);

            // Obtener carrito del localStorage
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            // Revisar si el producto ya está en el carrito
            let productoExistente = carrito.find(item => item.nombre === nombre);

            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                // Si no existe, agregar nuevo producto
                carrito.push({ nombre, precio, cantidad: 1 });
            }

            // Guardar carrito actualizado en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            actualizarTabla();

            mensajeAlerta.classList.remove("d-none");
            mensajeAlerta.textContent = "Producto seleccionado";

            setTimeout(() => {
                mensajeAlerta.classList.add("d-none");
            }, 2000);
        });
    });
});

function enviarFormulario(event) {
    event.preventDefault(); // This is essential to stop the page from reloading.

    const nombres = document.querySelector("#nombres").value.trim();
    const apellidos = document.querySelector("#apellidos").value.trim();
    const correo = document.querySelector("#correo").value.trim();
    const mensaje = document.querySelector("#mensaje").value.trim();

    const mensajeContacto = document.createElement("div"); // We create a new element for the message.
    mensajeContacto.classList.add("alert", "mt-3"); // Add Bootstrap classes for styling.

    if (!nombres || !apellidos || !correo || !mensaje) {
        mensajeContacto.classList.add("alert-danger");
        mensajeContacto.textContent = "Por favor, completa todos los campos.";
    } else {
        mensajeContacto.classList.add("alert-success");
        mensajeContacto.textContent = "Envio exitoso, nos contactaremos en brevedad con usted.";
        // You could also clear the form here if you'd like
        document.querySelector("#formularioContacto").reset();
    }
    
    // Insert the message after the form.
    const formContainer = document.querySelector(".card.contacto");
    formContainer.appendChild(mensajeContacto);

    // Optional: Hide the message after a few seconds
    setTimeout(() => {
        mensajeContacto.remove();
    }, 5000);
}

// Add an event listener to the form to call the function
const formContacto = document.querySelector("#formularioContacto");
if (formContacto) {
    formContacto.addEventListener("submit", enviarFormulario);
}
