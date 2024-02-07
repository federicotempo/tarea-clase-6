/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

const $botonLimpiar = document.querySelector("#boton-limpiar-trabajadores");
$botonLimpiar.onclick = limpiarTrabajador;

const $botonAgregar = document.querySelector("#boton-agregar");
$botonAgregar.onclick = function () {
    const cantidadTrabajadores = Number(document.querySelector("#cantidad-trabajadores").value);

    limpiarTrabajador();
    crearFormularios(cantidadTrabajadores);
    mostrarBotonCalcular();
    mostrarBotonLimpiar();
    mostrarBotonQuitar();
    return false;
}

const $botonQuitar = document.querySelector("#boton-quitar");
$botonQuitar.onclick = quitarTrabajador;

function crearFormularios(cantidadTrabajadores) {

    for (i = 1; i <= cantidadTrabajadores; i++) {

        const $formularioTrabajadores = document.querySelector("#formulario-trabajadores");

        const $trabajador = document.createElement("div");
        const $label = document.createElement("label");
        const $input = document.createElement("input");

        $trabajador.className = "trabajador";
        $label.textContent = `Ingresar salario del trabajador número ${i}: $ `;
        $input.type = "number";

        $trabajador.appendChild($label);
        $trabajador.appendChild($input);
        $formularioTrabajadores.appendChild($trabajador);
    }
}

function limpiarTrabajador() {
    const $trabajador = document.querySelectorAll(".trabajador");

    for (i = 0; i < $trabajador.length; i++) {
        $trabajador[i].remove();
    }

    ocultarBotonCalcular();
    ocultarResultados();
    ocultarBotonlimpiar();
}

function quitarTrabajador() {
    const $trabajador = document.querySelectorAll(".trabajador");
    let cantidadTrabajadores = $trabajador.length
    $trabajador[cantidadTrabajadores - 1].remove();

}

function obtenerSalario() {
    const $salarioTrabajador = document.querySelectorAll(".trabajador input");
    salarios = [];
    for (i = 0; i < $salarioTrabajador.length; i++) {
        if ($salarioTrabajador[i].value > 0) {
            salarios.push(Number($salarioTrabajador[i].value));
        } else {
            continue;
        }
    }

    return salarios;
}

function obtenerPromedioSalarioAnual(salarios) {
    let sumaSalarios = 0;
    for (i = 0; i < salarios.length; i++) {
        sumaSalarios += salarios[i];
    }

    let salarioAnualPromedio = sumaSalarios / salarios.length;

    return salarioAnualPromedio;
}

function obtenerPromedioSalarioMensual(salarios) {
    let sumaSalarios = 0;
    for (i = 0; i < salarios.length; i++) {
        sumaSalarios += salarios[i];
    }

    let salarioAnualPromedio = sumaSalarios / salarios.length;
    const cantidadMeses = 12;
    let salarioMensualPromedio = salarioAnualPromedio / cantidadMeses

    return salarioMensualPromedio;
}

function obtenerMenorSalario(salarios) {
    let menorSalario = salarios[0];
    for (i = 1; i <= salarios.length; i++) {
        if (menorSalario > salarios[i]) {
            menorSalario = salarios[i];
        }
    }

    return menorSalario;
}

function obtenerMayorSalario(salarios) {
    let mayorSalario = salarios[0];
    for (i = 1; i <= salarios.length; i++) {
        if (mayorSalario < salarios[i]) {
            mayorSalario = salarios[i];
        }
    }

    return mayorSalario;
}

const $botonCalcular = document.querySelector("#boton-calcular");
$botonCalcular.onclick = function () {
    document.querySelector("#salario-anual-promedio").textContent = obtenerPromedioSalarioAnual(obtenerSalario());
    document.querySelector("#salario-mensual-promedio").textContent = obtenerPromedioSalarioMensual(obtenerSalario());
    document.querySelector("#salario-mayor").textContent = obtenerMayorSalario(obtenerSalario());
    document.querySelector("#salario-menor").textContent = obtenerMenorSalario(obtenerSalario());
    mostrarResultados();
    ocultarBotonQuitar();
}

function mostrarBotonCalcular() {
    document.querySelector("#boton-calcular").className = "";
}

function mostrarBotonLimpiar() {
    document.querySelector("#boton-limpiar-trabajadores").className = "";
}

function ocultarBotonCalcular() {
    document.querySelector("#boton-calcular").className = "oculto";
}

function ocultarBotonlimpiar() {
    document.querySelector("#boton-limpiar-trabajadores").className = "oculto";
}

function mostrarResultados() {
    document.querySelector("#resultados").className = "";
}

function ocultarResultados() {
    document.querySelector("#resultados").className = "oculto";
}

function mostrarBotonQuitar() {
    document.querySelector("#boton-quitar").className = "";
}

function ocultarBotonQuitar() {
    document.querySelector("#boton-quitar").className = "oculto";
}

