const API_URL =
    "https://akabab.github.io/superhero-api/api/all.json";

const CACHE_KEY = "dc-heroes";
const CACHE_TIME = 24 * 60 * 60 * 1000;

export async function obtenerHeroes() {

    const cache = localStorage.getItem(CACHE_KEY);

    if (cache) {

        const datos = JSON.parse(cache);

        if (Date.now() - datos.fecha < CACHE_TIME) {
            return datos.heroes;
        }
    }

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("Error al conectar con la API");
        }

        const heroes = await respuesta.json();

        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
                fecha: Date.now(),
                heroes
            })
        );

        return heroes;

    } catch (error) {

        throw new Error(
            "No se han podido cargar los héroes"
        );
    }
}