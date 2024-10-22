function convertirInfijaAPolaca() {
    const expresion = document.getElementById('infija').value;


    if (!validarMinimoTerminos(expresion)) {
        document.getElementById('resultadoInfija').innerText = "La expresión debe contener al menos 3 términos.";
        return;
    }

    if (!validarExpresion(expresion)) {
        document.getElementById('resultadoInfija').innerText = "Expresión inválida. Solo se permiten números y operadores (+, -, *, /).";
        return;
    }


    const polacaInversa = infijaAPolaca(expresion);
    document.getElementById('resultadoInfija').innerText = `Polaca: ${polacaInversa}`;


    const infijaOrdenada = polacaAInfija(polacaInversa);
    document.getElementById('resultadoInfijaResuelto').innerText = ``;

    const solucion = resolverExpresionInfija(infijaOrdenada);
    document.getElementById('resultadoInfijaResuelto').innerText += `\nResultado: ${solucion}`;
}

function convertirPolacaAInfija() {
    const expresion = document.getElementById('polaca').value;


    if (!validarMinimoTerminos(expresion)) {
        document.getElementById('resultadoPolaca').innerText = "La expresión debe contener al menos 3 términos.";
        return;
    }


    if (!validarInicioConOperador(expresion)) {
        document.getElementById('resultadoPolaca').innerText = "La expresión en notación polaca debe comenzar con un operador.";
        return;
    }


    if (!validarExpresion(expresion)) {
        document.getElementById('resultadoPolaca').innerText = "Expresión inválida. Solo se permiten números y operadores (+, -, *, /).";
        return;
    }

    
    const infija = polacaAInfija(expresion);
    document.getElementById('resultadoPolaca').innerText = `Normal: ${infija}`;


    const solucion = resolverExpresionInfija(infija);
    document.getElementById('resultadoPolacaResuelto').innerText = `Resultado: ${solucion}`;
}

function validarMinimoTerminos(expresion) {
    const tokens = expresion.trim().split(/\s+/);
    return tokens.length >= 3;
}

function validarInicioConOperador(expresion) {
    const operadores = ['+', '-', '*', '/'];
    const primerToken = expresion.trim().split(/\s+/)[0];
    return operadores.includes(primerToken);
}

function infijaAPolaca(expresion) {
    const salida = [];
    const pila = [];
    const tokens = expresion.split(' ');

    const precedencia = (op) => {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0;
    };

    tokens.forEach(token => {
        if (!isNaN(token)) {
            salida.push(token);
        } else {
            while (pila.length && precedencia(pila[pila.length - 1]) >= precedencia(token)) {
                salida.push(pila.pop());
            }
            pila.push(token);
        }
    });

    while (pila.length) {
        salida.push(pila.pop());
    }

    return salida.reverse().join(' ');
}

function polacaAInfija(expresion) {
    const pila = [];
    const tokens = expresion.split(' ').reverse();

    tokens.forEach(token => {
        if (!isNaN(token)) {
            pila.push(token);
        } else {
            const operando1 = pila.pop();
            const operando2 = pila.pop();
            const nuevaExpresion = `(${operando1} ${token} ${operando2})`;
            pila.push(nuevaExpresion);
        }
    });

    return pila[0];
}

function resolverExpresionInfija(expresion) {
    return Function(`'use strict'; return (${expresion})`)();
}

function validarExpresion(expresion) {
    const regex = /^[0-9+\-*/\s()]+$/;
    return regex.test(expresion);
}

function limpiarFormulario() {
    document.getElementById('infija').value = '';
    document.getElementById('polaca').value = '';
    document.getElementById('resultadoInfija').innerText = '';
    document.getElementById('resultadoInfijaResuelto').innerText = '';
    document.getElementById('resultadoPolaca').innerText = '';
    document.getElementById('resultadoPolacaResuelto').innerText = '';
}
