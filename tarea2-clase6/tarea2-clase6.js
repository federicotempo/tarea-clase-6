const $formularioTrabajadores = document.querySelector("#formulario-trabajadores");

const $botonLimpiar = document.querySelector("#boton-limpiar-trabajadores");
$botonLimpiar.onclick = limpiarTrabajador;

const $botonAgregar = document.querySelector("#boton-agregar");
$botonAgregar.onclick = function () {
    const cantidadTrabajadores = Number(document.querySelector("#cantidad-trabajadores").value);

    limpiarTrabajador();
    crearFormularios(cantidadTrabajadores);
    return false;
}

const $botonQuitar = document.querySelector("#boton-quitar");
$botonQuitar.onclick = quitarTrabajador;

function crearFormularios(cantidadTrabajadores) {

    $cantidadTrabajadores = document.querySelector("#cantidad-trabajadores");

    const errorCantidadTrabajadores = validarCantidadTrabajadores(cantidadTrabajadores);

    const errores = {
        'cantidad-trabajadores': errorCantidadTrabajadores
    };

    const esExito = manejarErroresCantidadTrabajadores(errores) === 0;

    if (esExito) {

        $cantidadTrabajadores.className = '';

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

        mostrarBotonCalcular();
        mostrarBotonLimpiar();
        mostrarBotonQuitar();
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
    ocultarBotonQuitar();
    ocultarErrorSalario();
}

function quitarTrabajador() {
    const $trabajador = document.querySelectorAll(".trabajador");
    let cantidadTrabajadores = $trabajador.length
    $trabajador[cantidadTrabajadores - 1].remove();
    if (cantidadTrabajadores === 1) {
        ocultarBotonQuitar();
        ocultarBotonCalcular();
        ocultarResultados();
    };
}

function obtenerSalario() {
    const $salarioTrabajador = document.querySelectorAll(".trabajador input");
    salarios = [];

    for (i = 0; i < $salarioTrabajador.length; i++) {
        
        const salario = Number($salarioTrabajador[i].value);
        error = validarSalario(salario);
        
        if (error === '') {
            salarios.push(salario);
        } else {
            mostrarErrorSalario(error);
        }
    }

    if (salarios.length === $salarioTrabajador.length){
        ocultarErrorSalario();
        return salarios;
    } else {
        return '';
    }
    
}

function obtenerPromedioSalarioAnual(salarios) {
    let sumaSalarios = 0;
    for (i = 0; i < salarios.length; i++) {
        sumaSalarios += salarios[i];
    }

    let salarioAnualPromedio = (sumaSalarios / salarios.length).toFixed(2);

    return salarioAnualPromedio;
}

function obtenerPromedioSalarioMensual(salarios) {
    let sumaSalarios = 0;
    for (i = 0; i < salarios.length; i++) {
        sumaSalarios += salarios[i];
    }

    let salarioAnualPromedio = sumaSalarios / salarios.length;
    const cantidadMeses = 12;
    let salarioMensualPromedio = (salarioAnualPromedio / cantidadMeses).toFixed(2);

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

    if(obtenerSalario() !== ''){
        document.querySelector("#salario-anual-promedio").textContent = obtenerPromedioSalarioAnual(obtenerSalario());
        document.querySelector("#salario-mensual-promedio").textContent = obtenerPromedioSalarioMensual(obtenerSalario());
        document.querySelector("#salario-mayor").textContent = obtenerMayorSalario(obtenerSalario());
        document.querySelector("#salario-menor").textContent = obtenerMenorSalario(obtenerSalario());
        mostrarResultados();
    } else {
        ocultarResultados();
    }
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

function validarCantidadTrabajadores(cantidadTrabajadores) {
    if (!/^[1-9]\d*$/.test(cantidadTrabajadores)) {
        return 'Ingresar solo número entero positivo'
    } else {
        return '';
    }
}

function validarSalario(salario) {
    if (salario === 0) {
        return 'Este campo no puede estar vacío';
    } else if (salario < 0) {
        return 'Este campo no puede ser un número negativo';
    } else {
        return '';
    }
}

function manejarErroresCantidadTrabajadores(errores) {
    const $form = document.querySelector('#trabajadores');
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

function mostrarErrorSalario (error) {
    const $errores = document.querySelector('#errores');
    $errores.innerHTML = '';
    const $error = document.createElement('li');
    $error.innerText = error;
    $errores.className = 'rojo';
    $errores.appendChild($error);
    $formularioTrabajadores.className = 'error';
}

function ocultarErrorSalario() {
    const $errores = document.querySelector('#errores');
    $formularioTrabajadores.className = '';
    $errores.innerHTML = '';
}