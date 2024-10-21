function convertirInfijaAPolaca() {
    const expresion = document.getElementById('infija').value;
    const resultado = infijaAPolaca(expresion);
    document.getElementById('resultadoInfija').innerText = resultado;
}

function convertirPolacaAInfija() {
    const expresion = document.getElementById('polaca').value;
    const resultado = polacaAInfija(expresion);
    document.getElementById('resultadoPolaca').innerText = resultado;
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