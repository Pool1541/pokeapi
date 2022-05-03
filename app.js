const NAME_ENTRY = document.querySelector('#name');
const SEARCH_BTN = document.querySelector('#btn__search');
const NAME_POKEMON = document.querySelector('.name__pokemon');
const IMAGE_POKEMON = document.querySelector('.image__pokemon');
const STATS = document.querySelector('.stats');
const NEXT = document.querySelector('#next');
const PREVIEW = document.querySelector('#preview');
let id = 0;

async function getPokemon(pokemon) {
    try {
        NAME_ENTRY.value = "";
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const data = await respuesta.json();
        id = data.id;
        pintarCard(data);
    } catch (error) {
        console.log(error);
    }
}

const pintarCard = (data) => {
    let stats = {
        hp : `<p class="stat__pokemon"> <span>Hp: </span> ${data.stats[0].base_stat}</p>`,
        attack : `<p class="stat__pokemon"> <span>Attack: </span> ${data.stats[1].base_stat}</p>`,
        defense : `<p class="stat__pokemon"> <span>Defense: </span> ${data.stats[2].base_stat}</p>`,
        special_attack : `<p class="stat__pokemon"> <span>Special-Attack: </span> ${data.stats[3].base_stat}</p>`,
        special_defense : `<p class="stat__pokemon"> <span>Special-Defense: </span> ${data.stats[4].base_stat}</p>`,
        speed : `<p class="stat__pokemon"> <span>Speed: </span> ${data.stats[5].base_stat}</p>`
    }
    NAME_POKEMON.textContent = data.forms[0].name;
    IMAGE_POKEMON.setAttribute('src', data.sprites.front_default);
    STATS.innerHTML = stats.hp + stats.attack + stats.defense + stats.special_attack + stats.special_defense + stats.speed;
}

NAME_ENTRY.addEventListener('keypress', e => {
    let pokemon = NAME_ENTRY.value.toLowerCase();
    if (e.key == 'Enter'){
        getPokemon(pokemon);
    }
});
SEARCH_BTN.addEventListener('click', e => {
    let pokemon = NAME_ENTRY.value.toLowerCase();
    if (NAME_ENTRY.value !== ""){
        getPokemon(pokemon);
    }
});

NEXT.addEventListener('click', e => {
    if(id !== undefined ){
        getPokemon(id+1);
    }
});

PREVIEW.addEventListener('click', e => {
    if(id !== 0 && id !== 1){
        getPokemon(id-1);
    }
});