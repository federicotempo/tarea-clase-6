const $form = document.querySelector('#integrantes');
const $formularioEdad = document.querySelector("#formulario-edad");

const $botonLimpiar = document.querySelector("#boton-limpiar-integrantes");
$botonLimpiar.onclick = limpiarIntegrantes;

const $botonCantidad = document.querySelector("#boton-cantidad");
$botonCantidad.onclick = function () {
    const cantidadIntegrantes = Number(document.querySelector("#cantidad-integrantes").value);

    limpiarIntegrantes();
    crearFormularios(cantidadIntegrantes);

    return false;
}

function crearFormularios(cantidadIntegrantes) {

    $cantidadIntegrantes = document.querySelector('#cantidad-integrantes');

    const errorCantidadIntegrantes = validarCantidadIngrantes(cantidadIntegrantes);

    const errores = {
        'cantidad-integrantes': errorCantidadIntegrantes
    };

    const esExito = manejarErroresCantidadIntegrantes(errores) === 0;


    if (esExito) {

        $cantidadIntegrantes.className = '';

        for (i = 1; i <= cantidadIntegrantes; i++) {

            const $integrante = document.createElement("div");
            const $label = document.createElement("label");
            const $input = document.createElement("input");

            $integrante.className = "integrante";
            $label.textContent = `Ingresar edad del integrante número ${i}: `;
            $input.type = "number";
            $input.id = "edad";

            $integrante.appendChild($label);
            $integrante.appendChild($input);
            $formularioEdad.appendChild($integrante);
        }

        mostrarBotonCalcular();
        mostrarBotonLimpiar();
    }
}

function limpiarIntegrantes() {
    const $integrante = document.querySelectorAll(".integrante");


    for (i = 0; i < $integrante.length; i++) {
        $integrante[i].remove();
    }

    ocultarBotonCalcular();
    ocultarResultados();
    ocultarBotonlimpiar();
    ocultarErrorEdad();
}

function obtenerEdades() {
    const $edadIntegrantes = document.querySelectorAll(".integrante input");
    edades = [];

    for (i = 0; i < $edadIntegrantes.length; i++) {

        const edad = Number($edadIntegrantes[i].value);
        error = validarEdadIntegrantes(edad);
        
        if (error === '') {
            edades.push(edad);
        } else {
            mostrarErrorEdad(error);
        }
    }

    if (edades.length === $edadIntegrantes.length) {
        ocultarErrorEdad();
        return edades;
    } else {
        return '';
    }
}

function obtenerPromedio(edades) {
    let sumaEdades = 0;
    for (i = 0; i < edades.length; i++) {
        sumaEdades += edades[i];
    }

    let promedio = (sumaEdades / edades.length).toFixed(2);

    return promedio;
}

function obtenerMenorEdad(edades) {
    let menorEdad = edades[0];
    for (i = 1; i <= edades.length; i++) {
        if (menorEdad > edades[i]) {
            menorEdad = edades[i];
        }
    }

    return menorEdad;
}

function obtenerMayorEdad(edades) {
    let mayorEdad = edades[0];
    for (i = 1; i <= edades.length; i++) {
        if (mayorEdad < edades[i]) {
            mayorEdad = edades[i];
        }
    }

    return mayorEdad;
}

const $botonCalcular = document.querySelector("#boton-calcular");
$botonCalcular.onclick = function () {
    if (obtenerEdades() !== '') {
        document.querySelector("#promedio").textContent = obtenerPromedio(obtenerEdades());
        document.querySelector("#mayor").textContent = obtenerMayorEdad(obtenerEdades());
        document.querySelector("#menor").textContent = obtenerMenorEdad(obtenerEdades());
        mostrarResultados();
    } else {
        ocultarResultados();
    }
}

function validarCantidadIngrantes(cantidadIntegrantes) {
    if (cantidadIntegrantes === 0) {
        return 'Este campo no puede estar vacío';
    } else if (cantidadIntegrantes < 0) {
        return 'Este campo no puede ser un número negativo';
    } else if (cantidadIntegrantes % 1 !== 0) {
        return 'Este campo no puede ser un número con decimal';
    } else {
        return '';
    }
}

function validarEdadIntegrantes(edad) {
    if (!/^[1-9]\d*$/.test(edad)) {
        return 'Ingresar solo números enteros positivos';
    } else {
        return '';
    }
}

function manejarErroresCantidadIntegrantes(errores) {

    const keys = Object.keys(errores);
    const $errores = document.querySelector('#errores');

    $errores.innerHTML = '';
    let cantidadErrores = 0;

    keys.forEach(function (key) {
        const error = errores[key];

        if (error) {
            cantidadErrores++;
            $form[key].className = 'error';
            const $error = document.createElement('li');
            $error.innerText = error;
            $errores.className = 'rojo';
            $errores.appendChild($error);

        } else {
            $form[key].className = '';
        }

    });

    return cantidadErrores;
}

function mostrarBotonCalcular() {
    document.querySelector("#boton-calcular").className = "";
}

function mostrarBotonLimpiar() {
    document.querySelector("#boton-limpiar-integrantes").className = "";
}

function ocultarBotonCalcular() {
    document.querySelector("#boton-calcular").className = "oculto";
}

function ocultarBotonlimpiar() {
    document.querySelector("#boton-limpiar-integrantes").className = "oculto";
}

function mostrarResultados() {
    document.querySelector("#resultados").className = "";
}

function ocultarResultados() {
    document.querySelector("#resultados").className = "oculto";
}

function mostrarErrorEdad(error) {
    const $errores = document.querySelector('#errores');
    $errores.innerHTML = '';
    const $error = document.createElement('li');
    $error.innerText = error;
    $errores.className = 'rojo';
    $errores.appendChild($error);
    $formularioEdad.className = 'error';
}

function ocultarErrorEdad() {
    const $errores = document.querySelector('#errores');
    $formularioEdad.className = '';
    $errores.innerHTML = '';
}