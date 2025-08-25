//Ejercicio  básico 1
const tareas = [];
const lista = document.getElementById('lista-tareas');
const input = document.getElementById('nueva-tarea');
const pills = document.querySelectorAll(".pill");

//agregar tarea
function agregarTarea() {
    const texto = input.value.trim();
    if (texto === "") {
        alert("Debe llenar el recuadro");
        return;
    }
    tareas.push({ texto: texto, completada: false });
    input.value = "";
    actualizarLista();
}

// actualizar lista de tareas
function actualizarLista() {
    lista.innerHTML = "";
    for (let i = 0; i < tareas.length; i++) {
        const li = document.createElement("li");

        //texto de tarea
        const span = document.createElement("span");
        span.textContent = tareas[i].texto;
        if (tareas[i].completada) {
            span.classList.add("completada");
        }

        // botón para completar con ternario
        const btnCompleta = document.createElement("button");
        btnCompleta.textContent = tareas[i].completada ? "Desmarcar" : "Completar";
        btnCompleta.onclick = function () {
            tareas[i].completada = !tareas[i].completada;
            actualizarLista();
        };

        //boton editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = function () {
            const nueva = prompt("Editar tarea:", tareas[i].texto);
            if (nueva) {
                tareas[i].texto = nueva.trim();
                actualizarLista();
            }
        };

        //eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = function () {
            tareas.splice(i, 1);
            actualizarLista();
        };

        li.appendChild(span);
        li.appendChild(btnCompleta);
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    }

    //actualizar contadores
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = total - completadas;
    pills[0].textContent = `Total: ${total}`;
    pills[1].textContent = `Pendientes: ${pendientes}`;
    pills[2].textContent = `Completadas: ${completadas}`;
}
//eventos de los botones agregar y limpiar
document.getElementById("btn-agregar").onclick = agregarTarea;
document.getElementById("btn-limpiar").onclick = function () {
    tareas.length = 0;
    actualizarLista();
};

//ejercicio basico 2
function distancia(str1, str2) {
    let diferencia = 0;
    //recorre la longitud mas laarga
    const maxLong = Math.max(str1.length, str2.length);

    for (let i = 0; i < maxLong; i++) {
        if (str1[i] !== str2[i]) {
            diferencia++;
        }
    }
    return diferencia;
}
// CÓDIGO DE PRUEBA
console.log("Ejercicio básico 2")
console.log(distancia("hola", "hola")) // 0
console.log(distancia("sol", "tol")) // 1
console.log(distancia("carro", "correr")) // 3

//ejercicio 3 intermedio
function myMethod (str){
    let resultado = "";
    let conteo = 1;

    //recorrer

    for(i = 0; i < str.length; i ++){
        if(str[i] === str[i + 1]){ //si es igual al siguiente que aumente el conteo
            conteo++;
        } else {
            resultado += str[i] + conteo; //letra más número
            conteo = 1;
        }
    }
    return resultado;
}
console.log("Ejercico intermedio 3")
console.log(myMethod('aabcccccaaa')); // a2b1c5a3

//Ejercicio intermedio 4
Array.prototype.myOwnReduce = function(callback, initialValue){
    let acumulator = 0;
    //ternario para comenzar desde el indice 2
    let comienzo = initialValue !== undefined ? 0 : 2;

    // se recorre el array desde el indice correspondiente
    for(let i = comienzo; i < this.length; i++){
        //se aplica la funcion callback con el orden que se espera
        acumulator = callback(this[i], acumulator);
    }
    return acumulator;
}
const array = [1,2,3,4,5];
const callback = (current, acumulator) => {
acumulator+=current; 
return acumulator;
}
console.log("Ejercicio intermedio 4")
console.log(array.myOwnReduce(callback)) // 12


//Ejercicio avanzado 1
// Escribir un programa que simule el request a un servicio mediante promesas(se puede usar el método RACE del prototipo de promesas), si el servicio responde antes de 12 segundos deberá de imprimir en pantalla el resultado de la respuesta del servicio, si el servicio no responde en 12 segundos, se deberá imprimir en pantalla un error diciendo que el servicio no funciona.

function myMethod(responder){
    //promesa que representa el servicio
    const servicePromise = new Promise((resolve, reject) => {
        if (responder) {
        reject ('Esta es la respuesta del servicio');
    } else {
        reject ('Error el servicio no está disponible');
    }
    });
    //promise Race con un timeout de 12 segundos
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject('error! el servicio no funciona');
        }, 12000);
    });
    return Promise.race([servicePromise, timeoutPromise])
    .then(result => result)
    .catch(error => error);
}
//uso await para esperar a que la promesa se resuelva o se rechace
(async () => {
    console.log("Ejercicio avanzado 1")
    console.log(await myMethod(true)) // 'Esta es la respuesta del servicio'
    console.log(await myMethod(false)) // 'Error el servicio no está disponible'
})();

