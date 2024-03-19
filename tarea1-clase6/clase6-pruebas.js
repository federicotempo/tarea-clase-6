
function probarValidarCantidadIntegrantes(){
    console.assert(validarCantidadIngrantes(0) === 'Este campo no puede estar vacío',
    'Validar cantidad de integrantes no validó que la cantidad sea 0');

    console.assert(validarCantidadIngrantes(-1) === 'Este campo no puede ser un número negativo',
    'Validar cantidad de integrantes no validó que la cantidad sea negativo');

    console.assert(validarCantidadIngrantes(1.5) === 'Este campo no puede ser un número con decimal',
    'Validar cantidad de integrantes no validó que la cantidad sea número con decimal');

    console.assert(validarCantidadIngrantes(1) === '',
    'Validar cantidad de integrantes no validó que la cantidad sea correcta');
}

function probarValidarEdadIntegrantes(){
    console.assert(validarEdadIntegrantes(-1) === 'Ingresar solo números enteros positivos',
    'Validar edad integrantes no validó la regular expresion');

    console.assert(validarEdadIntegrantes(0) === 'Ingresar solo números enteros positivos',
    'Validar edad integrantes no validó la regular expresion');

    console.assert(validarEdadIntegrantes(1.5) === 'Ingresar solo números enteros positivos',
    'Validar edad integrantes no validó la regular expresion');

    console.assert(validarEdadIntegrantes(1) === '',
    'Validar edad integrantes no validó que la edad sea correcta');
}

probarValidarCantidadIntegrantes();
probarValidarEdadIntegrantes();