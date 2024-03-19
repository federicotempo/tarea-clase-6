function probarValidarCantidadTrabajadores(){
    console.assert(validarCantidadTrabajadores(0) === 'Ingresar solo número entero positivo',
    'Validar cantidad de trabajadores no validó que el campo no sea 0');

    console.assert(validarCantidadTrabajadores(-1) === 'Ingresar solo número entero positivo',
    'Validar cantidad de trabajadores no validó que el campo no sea negativo');

    console.assert(validarCantidadTrabajadores(2.5) === 'Ingresar solo número entero positivo',
    'Validar cantidad de trabajadores no validó que el campo no sea con decimal');

    console.assert(validarCantidadTrabajadores(2) === '',
    'Validar cantidad de trabajadores no validó que el campo este correcto');

}

function probarValidarSalario(){
    console.assert(validarSalario(0) === 'Este campo no puede estar vacío',
    'Validar salario no validó que el salario este vacío');

    console.assert(validarSalario(-1) === 'Este campo no puede ser un número negativo',
    'Validar salario no validó que el salario sea un número negativo');

    console.assert(validarSalario(1) === '',
    'Validar salario no validó que el salario sea correcto');

}

probarValidarCantidadTrabajadores();
probarValidarSalario();