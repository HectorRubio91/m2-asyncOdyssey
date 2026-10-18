const API_URL =
    "https://akabab.github.io/superhero-api/api/all.json";

const CACHE_KEY = "dc-heroes";
const CACHE_TIME = 24 * 60 * 60 * 1000;

export async function obtenerHeroes() {

    let cacheValida = null;

    try {

        const contenido  = localStorage.getItem(CACHE_KEY);

        if(contenido){

            const cache = JSON.parse(contenido);

            if(Array.isArray(cache.heroes) && 
                typeof cache.fecha === "number" &&
                Number.isFinite(cache.fecha) &&
                cache.fecha > 0){

                cacheValida = cache;

                const cacheActual = Date.now() - cache.fecha < CACHE_TIME;

                if(cacheActual){

                    return cache.heroes;
                }
            } else {

                console.warn("La cache no tiene un formato valido.");
            }
        }
    } catch(error){

        console.warn("No se ha podido leer la cache:", error);
    }

    try{

        const respuesta = await fetch(API_URL);

        if(!respuesta.ok){

            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const heroes = await respuesta.json();

        if(!Array.isArray(heroes)){

            throw new Error("La API no ha devuelto una lista valida de heroes.");
        }

        try{

            localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                    fecha: Date.now(),
                    heroes
                })
            );
        } catch(error) {

            console.warn("No se ha podido guardar la cache:", error);

        }

        return heroes;
    } catch(error){

        if(cacheValida){

            console.warn("La API ha fallado. Se utilizara la cache anterior.", error);

            return cacheValida.heroes;
        }

        throw error;
    }
}