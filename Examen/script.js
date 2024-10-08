// Objeto para almacenar los usuarios registrados
let usuarios = {};

// Array para almacenar los trabajos registrados
let trabajos = [];

// Validación de inicio de sesión
function validateLogin() {
    const username = document.getElementById("username").value.trim(); // Usar trim()
    const password = document.getElementById("password").value.trim(); // Usar trim()

    if (usuarios[username] && usuarios[username].contraseña === password) {
        if (usuarios[username].rol === 'alumno') {
            window.location.href = 'registro.html'; // Página de registro de trabajos
        } else if (usuarios[username].rol === 'profesor') {
            window.location.href = 'gestion.html'; // Página de gestión de trabajos
        }
    } else {
        alert("Usuario o contraseña incorrectos.");
        return false;
    }
    return true;
}

// Validación de registro de cuenta
function validateRegistroCuenta() {
    const nuevoUsuario = document.getElementById("nuevoUsuario").value.trim(); // Usar trim()
    const nuevaContraseña = document.getElementById("nuevaContraseña").value.trim(); // Usar trim()
    const rol = document.getElementById("rol").value;

    if (nuevoUsuario === "" || nuevaContraseña === "" || rol === "") {
        alert("Por favor, completa todos los campos.");
        return false;
    }

    // Verificar si el usuario ya existe
    if (usuarios[nuevoUsuario]) {
        alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
        return false;
    }

    // Registrar el nuevo usuario
    usuarios[nuevoUsuario] = { contraseña: nuevaContraseña, rol: rol };
    alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
    window.location.href = 'index.html'; // Redirigir al inicio de sesión
    return false; // Prevenir el envío del formulario
}

// Validación de registro de trabajo
function validateRegistroTrabajo() {
    const titulo = document.getElementById("titulo").value;
    const resumen = document.getElementById("resumen").value;
    const director = document.getElementById("director").value;

    if (titulo === "" || resumen === "" || director === "") {
        alert("Por favor, completa todos los campos.");
        return false;
    }

    // Registrar el trabajo
    trabajos.push({ titulo, resumen, director, estado: "Pendiente" });
    alert("Trabajo registrado exitosamente.");
    window.location.href = 'listado.html'; // Redirigir a listado de trabajos
    return false; // Prevenir el envío del formulario
}

// Mostrar listado de trabajos en la tabla
function mostrarTrabajos() {
    const tabla = document.getElementById("tablaTrabajos");
    trabajos.forEach((trabajo) => {
        const fila = `<tr>
            <td>${trabajo.titulo}</td>
            <td>${trabajo.resumen}</td>
            <td>${trabajo.director}</td>
            <td>${trabajo.estado}</td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}

// Mostrar trabajos en la página de gestión
function mostrarTrabajosGestion() {
    const tabla = document.getElementById("tablaGestionTrabajos");
    trabajos.forEach((trabajo) => {
        const fila = `<tr>
            <td>${trabajo.titulo}</td>
            <td>${trabajo.resumen}</td>
            <td>${trabajo.director}</td>
            <td>${trabajo.estado}</td>
            <td><button onclick="eliminarTrabajo('${trabajo.titulo}')">Eliminar</button></td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}

// Función para eliminar trabajo
function eliminarTrabajo(titulo) {
    trabajos = trabajos.filter(trabajo => trabajo.titulo !== titulo);
    alert("Trabajo eliminado exitosamente.");
    location.reload(); // Recargar la página para mostrar la lista actualizada
}

// Cargar los trabajos al cargar las páginas correspondientes
if (document.getElementById("tablaTrabajos")) {
    mostrarTrabajos();
}
if (document.getElementById("tablaGestionTrabajos")) {
    mostrarTrabajosGestion();
}
