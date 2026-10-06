const HEROES_DC = [
    "Superman",
    "Batman",
    "Wonder Woman",
    "Green Lantern",
    "Flash",
    "Flash II",
    "Martian Manhunter",
    "Cyborg",
    "Black Canary",
    "Aquaman",
    "Shazam",
    "Red Tornado",
    "Hawkman",
    "Hawkgirl",
    "Firestorm",
    "Nightwing",
    "Batgirl",
    "Robin",
    "Red Hood",
    "Red Robin",
    "The Atom",
    "Booster Gold",
    "Blue Beetle",
    "Zatanna",
    "Doctor Fate",
    "Arsenal",
    "Starfire",
    "Raven",
    "Beast Boy",
    "Kid Flash",
    "Superboy",
    "Supergirl",
    "Steel",
    "Power Girl",
    "Krypto",
    "Mr. Terrific",
    "Jay Garrick",
    "Atom Smasher",
    "Wildcat",
    "Stargirl",
    "Guy Gardner",
    "John Stewart",
    "Kyle Rayner"
];

export function prepararHeroes(datos) {

    return datos

        .filter(hero =>
            HEROES_DC.includes(hero.name)
        )

        .map(hero => {

            const stats = Object.values(hero.powerstats)
                .map(Number);

            const total = stats.reduce(
                (suma, valor) => suma + valor,
                0
            );

            return {
                nombre: hero.name,

                imagen: hero.images.md,

                poderes: Object.keys(hero.powerstats),

                tipo: obtenerTipo(hero),

                altura: hero.appearance.height[1],

                peso: hero.appearance.weight[1],

                historia:
                    hero.biography.fullName ||
                    "Sin información",

                poder: Math.max(
                    1,
                    Math.ceil(total / 60)
                )
            };
        });
}

function obtenerTipo(hero) {

    const nombre =
        hero.name.toLowerCase();

    if (
        nombre.includes("lantern") ||
        nombre.includes("gardner") ||
        nombre.includes("stewart") ||
        nombre.includes("rayner")
    ) {
        return "Linterna";
    }

    if (
        nombre.includes("flash")
    ) {
        return "Velocista";
    }

    if (
        nombre.includes("superman") ||
        nombre.includes("supergirl") ||
        nombre.includes("superboy") ||
        nombre.includes("krypto") ||
        nombre.includes("power girl")
    ) {
        return "Kryptoniano";
    }

    if (
        nombre.includes("batman") ||
        nombre.includes("batgirl") ||
        nombre.includes("robin") ||
        nombre.includes("nightwing") ||
        nombre.includes("red hood") ||
        nombre.includes("red robin")
    ) {
        return "Humano";
    }

    if (
        nombre.includes("wonder woman")
    ) {
        return "Amazona";
    }

    if (
        nombre.includes("aquaman")
    ) {
        return "Atlante";
    }

    if (
        nombre.includes("zatanna") ||
        nombre.includes("fate") ||
        nombre.includes("raven") ||
        nombre.includes("shazam")
    ) {
        return "Mágico";
    }

    if (
        nombre.includes("cyborg") ||
        nombre.includes("steel") ||
        nombre.includes("beetle") ||
        nombre.includes("mr. terrific")
    ) {
        return "Tecnológico";
    }

    return "Metahumano";
}

export function filtrarHeroes(heroes, busqueda, tipo) {

    return heroes.filter(hero => {

        const coincideNombre =
            hero.nombre
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                );

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

            resultado[hero.tipo] =
                (resultado[hero.tipo] || 0) + 1;

            return resultado;
        },
        {}
    );

    const tipoDominante =
        Object.entries(tipos)
            .sort((a, b) => b[1] - a[1])[0][0];

    return {
        media: suma / heroes.length,
        masPoderoso: masPoderoso.nombre,
        tipoDominante
    };
}