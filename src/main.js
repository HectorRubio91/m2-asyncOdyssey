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

const mensajeError =
    document.getElementById("mensaje-error");

const botonReintentar =
    document.getElementById("boton-reintentar");

const contadorResultados =
    document.getElementById("contador-resultados");


let heroes = [];

function crearElemento(etiqueta, clase, texto) {

    const elemento =
        document.createElement(etiqueta);

    if (clase) {
        elemento.className = clase;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

async function iniciar() {

    cargando.classList.remove("oculto");
    error.classList.add("oculto");
    vacio.classList.add("oculto");

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
            e.message ||
            "No se han podido cargar los héroes.";

    } finally {

        cargando.classList.add("oculto");
    }
}

function cargarTipos() {

    filtroTipo.replaceChildren();

    const opcionTodos =
        crearElemento("option", "", "Todos");

    opcionTodos.value = "todos";

    filtroTipo.appendChild(opcionTodos);

    const tipos = heroes
        .map(hero => hero.tipo)
        .filter(
            (tipo, indice, array) =>
                tipo !== "" &&
                array.indexOf(tipo) === indice
        );

    tipos.forEach(tipo => {

        const opcion =
            crearElemento("option", "", tipo);

        opcion.value = tipo;

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

    grid.replaceChildren();

    resultado.forEach(hero => {

        const tarjeta =
            crearElemento(
                "article",
                "tarjeta-heroe"
            );

        const contenedorImagen =
            crearElemento(
                "div",
                "tarjeta-imagen"
            );

        if (hero.imagen) {

            const imagen =
                document.createElement("img");

            imagen.src = hero.imagen;
            imagen.alt = hero.nombre;

            imagen.onerror = () => {

                const alternativa =
                    crearElemento(
                        "div",
                        "imagen-no-disponible",
                        "Imagen no disponible"
                    );

                contenedorImagen.replaceChildren(
                    alternativa
                );
            };

            contenedorImagen.appendChild(imagen);

        } else {

            contenedorImagen.appendChild(
                crearElemento(
                    "div",
                    "imagen-no-disponible",
                    "Imagen no disponible"
                )
            );
        }

        tarjeta.appendChild(contenedorImagen);

        const contenido =
            crearElemento(
                "div",
                "tarjeta-contenido"
            );

        contenido.appendChild(
            crearElemento(
                "h3",
                "tarjeta-nombre",
                hero.nombre
            )
        );

        contenido.appendChild(
            crearElemento(
                "div",
                "nivel-poder",
                `Poder: ${hero.poder}/10`
            )
        );

        contenido.appendChild(
            crearElemento(
                "span",
                "tarjeta-tipo",
                hero.tipo || "Tipo desconocido"
            )
        );

        const datos =
            crearElemento(
                "div",
                "tarjeta-datos"
            );

        const datoAltura =
            crearElemento("div", "dato");

        datoAltura.appendChild(
            crearElemento(
                "span",
                "dato-etiqueta",
                "Altura"
            )
        );

        datoAltura.appendChild(
            crearElemento(
                "span",
                "dato-valor",
                hero.altura
            )
        );

        const datoPeso =
            crearElemento("div", "dato");

        datoPeso.appendChild(
            crearElemento(
                "span",
                "dato-etiqueta",
                "Peso"
            )
        );

        datoPeso.appendChild(
            crearElemento(
                "span",
                "dato-valor",
                hero.peso
            )
        );

        datos.append(datoAltura, datoPeso);

        contenido.appendChild(datos);


        
        const seccionPoderes =
            crearElemento(
                "div",
                "tarjeta-poderes"
            );

        seccionPoderes.appendChild(
            crearElemento(
                "span",
                "tarjeta-poderes-titulo",
                "Estadísticas"
            )
        );

        const listaPoderes =
            crearElemento(
                "ul",
                "lista-poderes"
            );

        hero.poderes.forEach(poder => {

            listaPoderes.appendChild(
                crearElemento("li", "", poder)
            );
        });

        seccionPoderes.appendChild(listaPoderes);

        contenido.appendChild(seccionPoderes);


        
        const nombreReal =
            crearElemento(
                "p",
                "tarjeta-historia",
                `Nombre real: ${hero.nombreReal}`
            );

        contenido.appendChild(nombreReal);

        tarjeta.appendChild(contenido);

        grid.appendChild(tarjeta);
    });


    actualizarResumen(resultado);

    contadorResultados.textContent =
        `${resultado.length} resultados`;

    vacio.classList.toggle(
        "oculto",
        resultado.length !== 0
    );
}

function actualizarResumen(heroesFiltrados) {

    const resumen =
        calcularResumen(heroesFiltrados);

    document.getElementById(
        "total-heroes"
    ).textContent =
        heroesFiltrados.length;

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

botonReintentar.addEventListener(
    "click",
    iniciar
);



iniciar();