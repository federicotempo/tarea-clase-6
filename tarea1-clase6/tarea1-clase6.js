/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/


const $botonLimpiar = document.querySelector("#boton-limpiar-integrantes");
$botonLimpiar.onclick = limpiarIntegrantes;

const $botonCantidad = document.querySelector("#boton-cantidad");
$botonCantidad.onclick = function () {
    const cantidadIntegrantes = Number(document.querySelector("#cantidad-integrantes").value);

    limpiarIntegrantes();
    crearFormularios(cantidadIntegrantes);
    mostrarBotonCalcular();
    mostrarBotonLimpiar();
    return false;
}

function crearFormularios(cantidadIntegrantes) {

    for (i = 1; i <= cantidadIntegrantes; i++) {

        const $formularioEdad = document.querySelector("#formulario-edad");

        const $integrante = document.createElement("div");
        const $label = document.createElement("label");
        const $input = document.createElement("input");

        $integrante.className = "integrante";
        $label.textContent = `Ingresar edad del integrante número ${i}: `;
        $input.type = "number";

        $integrante.appendChild($label);
        $integrante.appendChild($input);
        $formularioEdad.appendChild($integrante);
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
}

function obtenerEdades() {
    const $edadIntegrantes = document.querySelectorAll(".integrante input");
    edades = [];
    for (i = 0; i < $edadIntegrantes.length; i++) {
        edades.push(Number($edadIntegrantes[i].value));
    }

    return edades;
}

function obtenerPromedio(edades) {
    let sumaEdades = 0;
    for (i = 0; i < edades.length; i++) {
        sumaEdades += edades[i];
    }

    let promedio = sumaEdades / edades.length;

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
    document.querySelector("#promedio").textContent = obtenerPromedio(obtenerEdades());
    document.querySelector("#mayor").textContent = obtenerMayorEdad(obtenerEdades());
    document.querySelector("#menor").textContent = obtenerMenorEdad(obtenerEdades());
    mostrarResultados();
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