var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function n(){let e=localStorage.getItem(i);if(e)try{let t=JSON.parse(e);if(t.fecha&&Date.now()-t.fecha<a)return t.heroes}catch{localStorage.removeItem(i)}let t=await fetch(r);if(!t.ok)throw Error(`No se han podido cargar los datos de la API.`);let n=await t.json();return localStorage.setItem(i,JSON.stringify({fecha:Date.now(),heroes:n})),n}var r,i,a,o=e((()=>{r=`https://akabab.github.io/superhero-api/api/all.json`,i=`dc-heroes`,a=864e5}));function s(e){return f.map((t,n)=>{let r=e.find(e=>e.id===t.idApi);return console.log(t.nombre,t.idApi,r),r?{id:n+1,idApi:t.idApi,nombre:t.nombre,imagen:r.images.md,poderes:Object.keys(r.powerstats),tipo:t.tipo,altura:r.appearance.height[1],peso:r.appearance.weight[1],historia:r.biography.fullName||`Sin información`,poder:c(r)}:null}).filter(e=>e!==null)}function c(e){let t=Object.values(e.powerstats).map(e=>Number(e)||0).reduce((e,t)=>e+t,0);return Math.min(10,Math.max(1,Math.ceil(t/60)))}function l(e,t,n){return e.filter(e=>{let r=e.nombre.toLowerCase().includes(t.toLowerCase()),i=n===`todos`||e.tipo===n;return r&&i})}function u(e,t){let n=[...e];return t===`poder-desc`?n.sort((e,t)=>t.poder-e.poder):t===`poder-asc`?n.sort((e,t)=>e.poder-t.poder):t===`nombre-asc`?n.sort((e,t)=>e.nombre.localeCompare(t.nombre)):n.sort((e,t)=>t.nombre.localeCompare(e.nombre))}function d(e){if(e.length===0)return{media:0,masPoderoso:`-`,tipoDominante:`-`};let t=e.reduce((e,t)=>e+t.poder,0),n=e.reduce((e,t)=>t.poder>e.poder?t:e),r=e.reduce((e,t)=>(e[t.tipo]=(e[t.tipo]||0)+1,e),{}),i=Object.entries(r).sort((e,t)=>t[1]-e[1])[0][0];return{media:t/e.length,masPoderoso:n.nombre,tipoDominante:i}}var f,p=e((()=>{f=[{idApi:644,nombre:`Superman`,tipo:`Kryptoniano`},{idApi:70,nombre:`Batman`,tipo:`Humano`},{idApi:720,nombre:`Wonder Woman`,tipo:`Amazona`},{idApi:306,nombre:`Green Lantern`,tipo:`Linterna`},{idApi:265,nombre:`The Flash`,tipo:`Velocista`},{idApi:432,nombre:`Martian Manhunter`,tipo:`Marciano`},{idApi:194,nombre:`Cyborg`,tipo:`Tecnologico`},{idApi:97,nombre:`Black Canary`,tipo:`Metahumano`},{idApi:38,nombre:`Aquaman`,tipo:`Atlante`},{idApi:156,nombre:`Shazam`,tipo:`Magico`},{idApi:551,nombre:`Red Tornado`,tipo:`Tecnologico`},{idApi:298,nombre:`Green Arrow`,tipo:`Humano`},{idApi:315,nombre:`Hawkgirl`,tipo:`Thanagariana`},{idApi:261,nombre:`Firestorm`,tipo:`Tecnologico`},{idApi:491,nombre:`Nightwing`,tipo:`Humano`},{idApi:63,nombre:`Batgirl`,tipo:`Humano`},{idApi:561,nombre:`Robin`,tipo:`Humano`},{idApi:546,nombre:`Red Hood`,tipo:`Humano`},{idApi:549,nombre:`Red Robin`,tipo:`Humano`},{idApi:334,nombre:`Huntress`,tipo:`Humano`},{idApi:126,nombre:`Blue Beetle`,tipo:`Tecnologico`},{idApi:233,nombre:`Dr Manhattan`,tipo:``},{idApi:730,nombre:`Zatanna`,tipo:`Magico`},{idApi:224,nombre:`Doctor Fate`,tipo:`Magico`},{idApi:367,nombre:`John Constantine`,tipo:`Magico`},{idApi:632,nombre:`Starfire`,tipo:`Tamarana`},{idApi:542,nombre:`Raven`,tipo:`Magico`},{idApi:76,nombre:`Beast Boy`,tipo:`Metahumano`},{idApi:37,nombre:`Aqualad`,tipo:`Atlante`},{idApi:455,nombre:`Miss Martian`,tipo:`Marciano`},{idApi:384,nombre:`Kid Flash`,tipo:`Velocista`},{idApi:641,nombre:`Superboy`,tipo:`Kryptoniano`},{idApi:643,nombre:`Supergirl`,tipo:`Kryptoniano`},{idApi:635,nombre:`Steel`,tipo:`Tecnologico`},{idApi:524,nombre:`Power Girl`,tipo:`Kryptoniano`},{idApi:396,nombre:`Krypto`,tipo:`Kryptoniano`},{idApi:263,nombre:`Jay Garrick`,tipo:`Velocista`},{idApi:633,nombre:`Stargirl`,tipo:`Tecnologico`},{idApi:520,nombre:`Plastic Man`,tipo:`Metahumano`},{idApi:305,nombre:`Guy Gardner`,tipo:`Linterna`},{idApi:397,nombre:`Kyle Rayner`,tipo:`Linterna`},{idApi:388,nombre:`Kilowog`,tipo:`Linterna`}]}));t((()=>{o(),p();var e=document.getElementById(`buscador`),t=document.getElementById(`filtro-tipo`),r=document.getElementById(`orden-poder`),i=document.getElementById(`grid-heroes`),a=document.getElementById(`estado-cargando`),c=document.getElementById(`estado-error`),f=document.getElementById(`estado-vacio`),m=[];async function h(){a.classList.remove(`oculto`),c.classList.add(`oculto`);try{m=s(await n()),g(),_(),a.classList.add(`oculto`)}catch(e){a.classList.add(`oculto`),c.classList.remove(`oculto`),document.getElementById(`mensaje-error`).textContent=e.message}}function g(){t.innerHTML=`
        <option value="todos">
            Todos
        </option>
    `,m.map(e=>e.tipo).filter((e,t,n)=>n.indexOf(e)===t).forEach(e=>{let n=document.createElement(`option`);n.value=e,n.textContent=e,t.appendChild(n)})}function _(){let n=l(m,e.value,t.value);n=u(n,r.value),i.innerHTML=``,n.forEach(e=>{let t=document.createElement(`article`);t.className=`tarjeta-heroe`,t.innerHTML=`
            <div class="tarjeta-imagen">

                <img
                    src="${e.imagen}"
                    alt="${e.nombre}"
                >

            </div>

            <div class="tarjeta-contenido">

                <h3 class="tarjeta-nombre">
                    ${e.nombre}
                </h3>

                <div class="nivel-poder">
                    Poder: ${e.poder}/10
                </div>

                <span class="tarjeta-tipo">
                    ${e.tipo}
                </span>

                <div class="tarjeta-datos">

                    <div class="dato">

                        <span class="dato-etiqueta">
                            Altura
                        </span>

                        <span class="dato-valor">
                            ${e.altura}
                        </span>

                    </div>

                    <div class="dato">

                        <span class="dato-etiqueta">
                            Peso
                        </span>

                        <span class="dato-valor">
                            ${e.peso}
                        </span>

                    </div>

                </div>

                <div class="tarjeta-poderes">

                    <span class="tarjeta-poderes-titulo">
                        Estadísticas
                    </span>

                    <ul class="lista-poderes">

                        ${e.poderes.map(e=>`<li>${e}</li>`).join(``)}

                    </ul>

                </div>

                <p class="tarjeta-historia">
                    ${e.historia}
                </p>

            </div>
        `,i.appendChild(t)}),v(n),document.getElementById(`contador-resultados`).textContent=`${n.length} resultados`,n.length===0?f.classList.remove(`oculto`):f.classList.add(`oculto`)}function v(e){let t=d(e);document.getElementById(`total-heroes`).textContent=e.length,document.getElementById(`poder-medio`).textContent=t.media.toFixed(1),document.getElementById(`heroe-mas-poderoso`).textContent=t.masPoderoso,document.getElementById(`tipo-dominante`).textContent=t.tipoDominante}e.addEventListener(`input`,_),t.addEventListener(`change`,_),r.addEventListener(`change`,_),document.getElementById(`boton-reintentar`).addEventListener(`click`,h),h()}))();