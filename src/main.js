import { obtenerHeroes } from "./api.js";

import {
    prepararHeroes,
    filtrarHeroes,
    ordenarHeroes,
    calcularResumen
} from "./logic.js";


const buscador =
    document.getElementById("buscador");

const filtroTipo =
    document.getElementById("filtro-tipo");

const orden =
    document.getElementById("orden-poder");

const grid =
    document.getElementById("grid-heroes");

const cargando =
    document.getElementById("estado-cargando");

const error =
    document.getElementById("estado-error");

const vacio =
    document.getElementById("estado-vacio");


let heroes = [];


async function iniciar() {

    cargando.classList.remove("oculto");

    error.classList.add("oculto");

    try {

        const datos = await obtenerHeroes();

        heroes = prepararHeroes(datos);

        cargarTipos();

        mostrarHeroes();

        cargando.classList.add("oculto");

    } catch (e) {

        cargando.classList.add("oculto");

        error.classList.remove("oculto");

        document.getElementById(
            "mensaje-error"
        ).textContent = e.message;
    }
}


function cargarTipos() {

    filtroTipo.innerHTML = `
        <option value="todos">
            Todos
        </option>
    `;

    const tipos = heroes
        .map(hero => hero.tipo)
        .filter(
            (tipo, index, array) =>
                array.indexOf(tipo) === index
        );

    tipos.forEach(tipo => {

        const opcion =
            document.createElement("option");

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

    resultado = ordenarHeroes(
        resultado,
        orden.value
    );

    grid.innerHTML = "";

    resultado.forEach(hero => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className =
            "tarjeta-heroe";

        tarjeta.innerHTML = `
            <div class="tarjeta-imagen">

                <img
                    src="${hero.imagen}"
                    alt="${hero.nombre}"
                >

            </div>

            <div class="tarjeta-contenido">

                <h3 class="tarjeta-nombre">
                    ${hero.nombre}
                </h3>

                <div class="nivel-poder">
                    Poder: ${hero.poder}/10
                </div>

                <span class="tarjeta-tipo">
                    ${hero.tipo}
                </span>

                <div class="tarjeta-datos">

                    <div class="dato">

                        <span class="dato-etiqueta">
                            Altura
                        </span>

                        <span class="dato-valor">
                            ${hero.altura}
                        </span>

                    </div>

                    <div class="dato">

                        <span class="dato-etiqueta">
                            Peso
                        </span>

                        <span class="dato-valor">
                            ${hero.peso}
                        </span>

                    </div>

                </div>

                <div class="tarjeta-poderes">

                    <span class="tarjeta-poderes-titulo">
                        Estadísticas
                    </span>

                    <ul class="lista-poderes">

                        ${hero.poderes
                            .map(poder =>
                                `<li>${poder}</li>`
                            )
                            .join("")}

                    </ul>

                </div>

                <p class="tarjeta-historia">
                    ${hero.historia}
                </p>

            </div>
        `;

        grid.appendChild(tarjeta);
    });


    actualizarResumen(resultado);


    document.getElementById(
        "contador-resultados"
    ).textContent =
        `${resultado.length} resultados`;


    if (resultado.length === 0) {

        vacio.classList.remove("oculto");

    } else {

        vacio.classList.add("oculto");
    }
}


function actualizarResumen(heroes) {

    const resumen =
        calcularResumen(heroes);

    document.getElementById(
        "total-heroes"
    ).textContent =
        heroes.length;

    document.getElementById(
        "poder-medio"
    ).textContent =
        resumen.media.toFixed(1);

    document.getElementById(
        "heroe-mas-poderoso"
    ).textContent =
        resumen.masPoderoso;

    document.getElementById(
        "tipo-dominante"
    ).textContent =
        resumen.tipoDominante;
}


buscador.addEventListener(
    "input",
    mostrarHeroes
);


filtroTipo.addEventListener(
    "change",
    mostrarHeroes
);


orden.addEventListener(
    "change",
    mostrarHeroes
);


document.getElementById(
    "boton-reintentar"
).addEventListener(
    "click",
    iniciar
);


iniciar();