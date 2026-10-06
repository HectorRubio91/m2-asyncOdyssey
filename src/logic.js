const HEROES_DC = [

    { idApi: 644, nombre: "Superman" },
    { idApi: 70, nombre: "Batman" },
    { idApi: 720, nombre: "Wonder Woman" },
    { idApi: 306, nombre: "Green Lantern" },
    { idApi: 265, nombre: "The Flash" },
    { idApi: 432, nombre: "Martian Manhunter" },
    { idApi: 194, nombre: "Cyborg" },
    { idApi: 97, nombre: "Black Canary" },
    { idApi: 38, nombre: "Aquaman" },
    { idApi: 156, nombre: "Shazam" },

    { idApi: 551, nombre: "Red Tornado" },
    { idApi: 298, nombre: "Green Arrow" },
    { idApi: 315, nombre: "Hawkgirl" },
    { idApi: 261, nombre: "Firestorm" },

    { idApi: 491, nombre: "Nightwing" },
    { idApi: 63, nombre: "Batgirl" },
    { idApi: 561, nombre: "Robin" },
    { idApi: 546, nombre: "Red Hood" },
    { idApi: 549, nombre: "Red Robin" },
    { idApi: 334, nombre: "Huntress" },

    { idApi: 126, nombre: "Blue Beetle" },
    { idApi: 233, nombre: "Dr Manhattan" },
    { idApi: 730, nombre: "Zatanna" },
    { idApi: 224, nombre: "Doctor Fate" },
    { idApi: 367, nombre: "John Constantine" },

    { idApi: 632, nombre: "Starfire" },
    { idApi: 542, nombre: "Raven" },
    { idApi: 76, nombre: "Beast Boy" },
    { idApi: 37, nombre: "Aqualad" },
    { idApi: 455, nombre: "Miss Martian" },
    { idApi: 384, nombre: "Kid Flash" },

    { idApi: 641, nombre: "Superboy" },
    { idApi: 643, nombre: "Supergirl" },
    { idApi: 635, nombre: "Steel" },
    { idApi: 524, nombre: "Power Girl" },
    { idApi: 396, nombre: "Krypto" },

    { idApi: 263, nombre: "Jay Garrick" },
    { idApi: 633, nombre: "Stargirl" },
    { idApi: 520, nombre: "Plastic Man" },
    
    { idApi: 305, nombre: "Guy Gardner" },
    { idApi: 397, nombre: "Kyle Rayner" },
    { idApi: 388, nombre: "Kilowog" }

];


export function prepararHeroes(datos) {

    return HEROES_DC
        .map((personaje, indice) => {

            const hero = datos.find(
                hero => hero.id === personaje.idApi
            );

            console.log(
                personaje.nombre,
                personaje.idApi,
                hero
            );

            if (!hero) {
                return null;
            }

            return {

                id: indice + 1,

                idApi: personaje.idApi,

                nombre: personaje.nombre,

                imagen: hero.images.md,

                poderes: Object.keys(hero.powerstats),

                tipo: obtenerTipo(personaje.nombre),

                altura: hero.appearance.height[1],

                peso: hero.appearance.weight[1],

                historia:
                    hero.biography.fullName ||
                    "Sin información",

                poder: calcularPoder(hero)

            };
        })
        .filter(hero => hero !== null);
}


function calcularPoder(hero) {

    const stats = Object.values(hero.powerstats)
        .map(valor => Number(valor) || 0);

    const total = stats.reduce(
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


function obtenerTipo(nombre) {

    const nombreMinusculas =
        nombre.toLowerCase();

    if (
        nombreMinusculas.includes("lantern") ||
        nombreMinusculas.includes("gardner") ||
        nombreMinusculas.includes("stewart") ||
        nombreMinusculas.includes("rayner")
    ) {
        return "Linterna";
    }

    if (
        nombreMinusculas.includes("flash")
    ) {
        return "Velocista";
    }

    if (
        nombreMinusculas.includes("superman") ||
        nombreMinusculas.includes("supergirl") ||
        nombreMinusculas.includes("superboy") ||
        nombreMinusculas.includes("krypto") ||
        nombreMinusculas.includes("power girl")
    ) {
        return "Kryptoniano";
    }

    if (
        nombreMinusculas.includes("batman") ||
        nombreMinusculas.includes("batgirl") ||
        nombreMinusculas.includes("robin") ||
        nombreMinusculas.includes("nightwing") ||
        nombreMinusculas.includes("red hood")
    ) {
        return "Humano";
    }

    if (
        nombreMinusculas.includes("wonder woman")
    ) {
        return "Amazona";
    }

    if (
        nombreMinusculas.includes("aquaman")
    ) {
        return "Atlante";
    }

    if (
        nombreMinusculas.includes("zatanna") ||
        nombreMinusculas.includes("fate") ||
        nombreMinusculas.includes("raven") ||
        nombreMinusculas.includes("shazam")
    ) {
        return "Mágico";
    }

    if (
        nombreMinusculas.includes("cyborg") ||
        nombreMinusculas.includes("steel") ||
        nombreMinusculas.includes("beetle") ||
        nombreMinusculas.includes("mr. terrific")
    ) {
        return "Tecnológico";
    }

    return "Metahumano";
}


export function filtrarHeroes(
    heroes,
    busqueda,
    tipo
) {

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
            .sort(
                (a, b) => b[1] - a[1]
            )[0][0];

    return {
        media: suma / heroes.length,
        masPoderoso: masPoderoso.nombre,
        tipoDominante
    };
}