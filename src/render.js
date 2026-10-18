import { calcularResumen } from "./logic.js";

function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);

    if (clase) {
        elemento.className = clase;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

function crearDato(etiqueta, valor) {
    const dato = crearElemento("div", "dato");

    dato.append(
        crearElemento("span", "dato-etiqueta", etiqueta),
        crearElemento("span", "dato-valor", valor)
    );

    return dato;
}

function crearImagen(hero) {
    const contenedor = crearElemento("div", "tarjeta-imagen");

    function mostrarAlternativa() {
        contenedor.replaceChildren(
            crearElemento(
                "div",
                "imagen-no-disponible",
                "Imagen no disponible"
            )
        );
    }

    if (!hero.imagen) {
        mostrarAlternativa();
        return contenedor;
    }

    const imagen = document.createElement("img");
    imagen.src = hero.imagen;
    imagen.alt = hero.nombre;
    imagen.onerror = mostrarAlternativa;

    contenedor.appendChild(imagen);

    return contenedor;
}

export function crearTarjeta(hero) {
    const tarjeta = crearElemento("article", "tarjeta-heroe");

    const contenido = crearElemento("div", "tarjeta-contenido");

    const nombre = crearElemento(
        "h3",
        "tarjeta-nombre",
        hero.nombre
    );

    const poder = crearElemento(
        "div",
        "nivel-poder",
        `Poder: ${hero.poder}/10`
    );

    const tipo = crearElemento(
        "span",
        "tarjeta-tipo",
        hero.tipo || "Tipo desconocido"
    );

    const datos = crearElemento("div", "tarjeta-datos");
    datos.append(
        crearDato("Altura", hero.altura),
        crearDato("Peso", hero.peso)
    );

    const seccionEstadisticas = crearElemento(
        "div",
        "tarjeta-poderes"
    );

    seccionEstadisticas.appendChild(
        crearElemento(
            "span",
            "tarjeta-poderes-titulo",
            "Estadísticas"
        )
    );

    const listaEstadisticas = crearElemento(
        "ul",
        "lista-poderes"
    );

    hero.poderes.forEach(estadistica => {
        listaEstadisticas.appendChild(
            crearElemento("li", "", estadistica)
        );
    });

    seccionEstadisticas.appendChild(listaEstadisticas);

    const nombreReal = crearElemento(
        "p",
        "tarjeta-historia",
        `Nombre real: ${hero.nombreReal}`
    );

    contenido.append(
        nombre,
        poder,
        tipo,
        datos,
        seccionEstadisticas,
        nombreReal
    );

    tarjeta.append(
        crearImagen(hero),
        contenido
    );

    return tarjeta;
}

export function renderizarHeroes(heroes, grid) {
    const tarjetas = heroes.map(crearTarjeta);
    grid.replaceChildren(...tarjetas);
}

export function actualizarResumen(heroes) {
    const resumen = calcularResumen(heroes);

    document.getElementById("total-heroes").textContent =
        heroes.length;

    document.getElementById("poder-medio").textContent =
        resumen.media.toFixed(1);

    document.getElementById("heroe-mas-poderoso").textContent =
        resumen.masPoderoso;

    document.getElementById("tipo-dominante").textContent =
        resumen.tipoDominante;
}

export function actualizarEstadoVacio(estaVacio) {
    document.getElementById("estado-vacio")
        .classList.toggle("oculto", !estaVacio);
}

export function actualizarContador(cantidad) {
    document.getElementById("contador-resultados")
        .textContent = `${cantidad} resultados`;
}