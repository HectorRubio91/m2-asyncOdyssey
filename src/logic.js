import { HEROES_DC } from "./heroes.js";

export function prepararHeroes(datos) {
    const heroesPorId = new Map(
        datos
            .filter(hero => hero && Number.isFinite(hero.id))
            .map(hero => [hero.id, hero])
    );

    return HEROES_DC
        .map((personaje, indice) => {
            const hero = heroesPorId.get(personaje.idApi);

            if (!hero) {
                return null;
            }

            const apariencia = hero.appearance || {};
            const biografia = hero.biography || {};

            return {
                id: indice + 1,
                idApi: personaje.idApi,
                nombre: personaje.nombre,
                imagen: hero.images?.md || "",
                poderes: Object.keys(hero.powerstats || {}),
                tipo: personaje.tipo,
                altura: apariencia.height?.[1] || "Desconocida",
                peso: apariencia.weight?.[1] || "Desconocido",
                nombreReal: biografia.fullName || "Sin información",
                poder: calcularPoder(hero)
            };
        })
        .filter(hero => hero !== null);
}

function calcularPoder(hero) {
    const estadisticas =
        hero?.powerstats &&
        typeof hero.powerstats === "object"
            ? hero.powerstats
            : {};

    const valores = Object.values(estadisticas)
        .map(valor => Number(valor) || 0);

    if (valores.length === 0) {
        return 1;
    }

    const total = valores.reduce(
        (suma, valor) => suma + valor,
        0
    );

    return Math.min(
        10,
        Math.max(1, Math.ceil(total / 60))
    );
}

export function filtrarHeroes(heroes, busqueda, tipo) {
    const texto = busqueda.toLowerCase();

    return heroes.filter(hero => {
        const coincideNombre =
            hero.nombre.toLowerCase().includes(texto);

        const coincideTipo =
            tipo === "todos" || hero.tipo === tipo;

        return coincideNombre && coincideTipo;
    });
}

export function ordenarHeroes(heroes, orden) {
    const resultado = [...heroes];

    if (orden === "poder-desc") {
        return resultado.sort((a, b) => b.poder - a.poder);
    }

    if (orden === "poder-asc") {
        return resultado.sort((a, b) => a.poder - b.poder);
    }

    if (orden === "nombre-asc") {
        return resultado.sort(
            (a, b) => a.nombre.localeCompare(b.nombre)
        );
    }

    return resultado.sort(
        (a, b) => b.nombre.localeCompare(a.nombre)
    );
}

export function calcularResumen(heroes) {
    if (heroes.length === 0) {
        return {
            media: 0,
            masPoderoso: "-",
            tipoDominante: "-"
        };
    }

    const suma = heroes.reduce(
        (total, hero) => total + hero.poder,
        0
    );

    const masPoderoso = heroes.reduce(
        (mejor, hero) =>
            hero.poder > mejor.poder ? hero : mejor
    );

    const tipos = heroes.reduce((resultado, hero) => {
        if (hero.tipo) {
            resultado[hero.tipo] =
                (resultado[hero.tipo] || 0) + 1;
        }

        return resultado;
    }, {});

    const tiposOrdenados = Object.entries(tipos)
        .sort((a, b) => b[1] - a[1]);

    return {
        media: suma / heroes.length,
        masPoderoso: masPoderoso.nombre,
        tipoDominante: tiposOrdenados[0]?.[0] || "-"
    };
}