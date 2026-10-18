const HEROES_DC = [

    { idApi: 644, nombre: "Superman", tipo: "Kryptoniano" },
    { idApi: 70, nombre: "Batman", tipo: "Humano" },
    { idApi: 720, nombre: "Wonder Woman", tipo: "Amazona" },
    { idApi: 306, nombre: "Green Lantern", tipo: "Linterna" },
    { idApi: 265, nombre: "The Flash", tipo: "Velocista" },
    { idApi: 432, nombre: "Martian Manhunter", tipo: "Marciano" },
    { idApi: 194, nombre: "Cyborg", tipo: "Tecnologico" },
    { idApi: 97, nombre: "Black Canary", tipo: "Metahumano" },
    { idApi: 38, nombre: "Aquaman", tipo: "Atlante" },
    { idApi: 156, nombre: "Shazam", tipo: "Magico" },

    { idApi: 551, nombre: "Red Tornado", tipo: "Tecnologico" },
    { idApi: 298, nombre: "Green Arrow", tipo: "Humano" },
    { idApi: 315, nombre: "Hawkgirl", tipo: "Thanagariana" },
    { idApi: 261, nombre: "Firestorm", tipo: "Tecnologico" },

    { idApi: 491, nombre: "Nightwing", tipo: "Humano" },
    { idApi: 63, nombre: "Batgirl", tipo: "Humano" },
    { idApi: 561, nombre: "Robin", tipo: "Humano" },
    { idApi: 546, nombre: "Red Hood", tipo: "Humano" },
    { idApi: 549, nombre: "Red Robin", tipo: "Humano" },
    { idApi: 334, nombre: "Huntress", tipo: "Humano" },

    { idApi: 126, nombre: "Blue Beetle", tipo: "Tecnologico" },
    { idApi: 233, nombre: "Dr Manhattan", tipo: "" },
    { idApi: 730, nombre: "Zatanna", tipo: "Magico" },
    { idApi: 224, nombre: "Doctor Fate", tipo: "Magico" },
    { idApi: 367, nombre: "John Constantine", tipo: "Magico" },

    { idApi: 632, nombre: "Starfire", tipo: "Tamarana" },
    { idApi: 542, nombre: "Raven", tipo: "Magico" },
    { idApi: 76, nombre: "Beast Boy", tipo: "Metahumano" },
    { idApi: 37, nombre: "Aqualad", tipo: "Atlante" },
    { idApi: 455, nombre: "Miss Martian", tipo: "Marciano" },
    { idApi: 384, nombre: "Kid Flash", tipo: "Velocista" },

    { idApi: 641, nombre: "Superboy", tipo: "Kryptoniano" },
    { idApi: 643, nombre: "Supergirl", tipo: "Kryptoniano" },
    { idApi: 635, nombre: "Steel", tipo: "Tecnologico" },
    { idApi: 524, nombre: "Power Girl", tipo: "Kryptoniano" },
    { idApi: 396, nombre: "Krypto", tipo: "Kryptoniano" },

    { idApi: 263, nombre: "Jay Garrick", tipo: "Velocista" },
    { idApi: 633, nombre: "Stargirl", tipo: "Tecnologico" },
    { idApi: 520, nombre: "Plastic Man", tipo: "Metahumano" },

    { idApi: 305, nombre: "Guy Gardner", tipo: "Linterna" },
    { idApi: 397, nombre: "Kyle Rayner", tipo: "Linterna" },
    { idApi: 388, nombre: "Kilowog", tipo: "Linterna" }

];

export function prepararHeroes(datos) {

    const heroesPorId = new Map(
        datos
            .filter(hero => hero && Number.isFinite(hero.id))
            .map(hero=> [hero.id, hero])
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

                nombreReal: biografia.fullName || "Sin informacion", 

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
        Math.max(
            1,
            Math.ceil(total / 60)
        )
    );
}


export function filtrarHeroes(
    heroes,
    busqueda,
    tipo
) {

    const texto = busqueda.toLowerCase();

    return heroes.filter(hero => {

        const coincideNombre =
            hero.nombre
                .toLowerCase()
                .includes(texto);

        const coincideTipo =
            tipo === "todos" ||
            hero.tipo === tipo;

        return coincideNombre && coincideTipo;
    });
}


export function ordenarHeroes(
    heroes,
    orden
) {

    const resultado = [...heroes];

    if (orden === "poder-desc") {

        return resultado.sort(
            (a, b) => b.poder - a.poder
        );
    }

    if (orden === "poder-asc") {

        return resultado.sort(
            (a, b) => a.poder - b.poder
        );
    }

    if (orden === "nombre-asc") {

        return resultado.sort(
            (a, b) =>
                a.nombre.localeCompare(b.nombre)
        );
    }

    return resultado.sort(
        (a, b) =>
            b.nombre.localeCompare(a.nombre)
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
        (total, hero) =>
            total + hero.poder,
        0
    );

    const masPoderoso = heroes.reduce(
        (mejor, hero) =>
            hero.poder > mejor.poder
                ? hero
                : mejor
    );

    const tipos = heroes.reduce(
        (resultado, hero) => {
            
            if(hero.tipo){

                resultado[hero.tipo] =
                    (resultado[hero.tipo] || 0) + 1;
            }

            return resultado;
        },
        {}
    );

    const tiposOrdenados =
        Object.entries(tipos)
            .sort((a, b) => b[1] - a[1]);

    const tipoDominante =
        tiposOrdenados.length > 0
            ? tiposOrdenados[0][0]
            : "-";

    return {
        media: suma / heroes.length,
        masPoderoso: masPoderoso.nombre,
        tipoDominante
    };
}