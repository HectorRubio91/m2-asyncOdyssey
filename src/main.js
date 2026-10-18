import { obtenerHeroes } from "./api.js";

import {
    prepararHeroes,
    filtrarHeroes,
    ordenarHeroes
} from "./logic.js";

import {
    renderizarHeroes,
    actualizarResumen,
    actualizarEstadoVacio,
    actualizarContador
} from "./render.js";

const buscador = document.getElementById("buscador");
const filtroTipo = document.getElementById("filtro-tipo");
const orden = document.getElementById("orden-poder");
const grid = document.getElementById("grid-heroes");

const cargando = document.getElementById("estado-cargando");
const error = document.getElementById("estado-error");
const mensajeError = document.getElementById("mensaje-error");
const botonReintentar = document.getElementById("boton-reintentar");

let heroes = [];

async function iniciar() {
    cargando.classList.remove("oculto");
    error.classList.add("oculto");

    try {
        const datos = await obtenerHeroes();

        if (!Array.isArray(datos)) {
            throw new Error(
                "Los datos recibidos no tienen un formato válido."
            );
        }

        heroes = prepararHeroes(datos);

        cargarTipos();
        mostrarHeroes();

    } catch (e) {
        error.classList.remove("oculto");

        mensajeError.textContent =
            e.message || "No se han podido cargar los héroes.";

    } finally {
        cargando.classList.add("oculto");
    }
}

function cargarTipos() {
    filtroTipo.replaceChildren();

    const opcionTodos = document.createElement("option");
    opcionTodos.value = "todos";
    opcionTodos.textContent = "Todos";
    filtroTipo.appendChild(opcionTodos);

    const tipos = [...new Set(
        heroes
            .map(hero => hero.tipo)
            .filter(tipo => tipo !== "")
    )];

    tipos.forEach(tipo => {
        const opcion = document.createElement("option");
        opcion.value = tipo;
        opcion.textContent = tipo;
        filtroTipo.appendChild(opcion);
    });
}

function mostrarHeroes() {
    let resultado = filtrarHeroes(
        heroes,
        buscador.value,
        filtroTipo.value
    );

    resultado = ordenarHeroes(resultado, orden.value);

    renderizarHeroes(resultado, grid);
    actualizarResumen(resultado);
    actualizarContador(resultado.length);
    actualizarEstadoVacio(resultado.length === 0);
}

buscador.addEventListener("input", mostrarHeroes);
filtroTipo.addEventListener("change", mostrarHeroes);
orden.addEventListener("change", mostrarHeroes);
botonReintentar.addEventListener("click", iniciar);

iniciar();