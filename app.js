
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
        fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => {           
    return pokemons.reduce((accumulator, {name, id, types}) => {
        const elementTypes = types.map(typeInfo => typeInfo.type.name)

        accumulator += `
            <li class="card ${elementTypes[0]}" data-id=${id}> 
            <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png">
                <h2 class="card-title"> ${id}. ${name} </h2>
                <p class="card-subtitle">${elementTypes.join(' | ')}</p>
            </li>
        `
        return accumulator 
    }, '')
}

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}
                    
const pokemonPromises = generatePokemonPromises(); 

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
    .then(handleSelectedPokemon)

//mine stuff

function handleSelectedPokemon() {

    const pokemonCards = document.querySelectorAll(".card");

    pokemonCards.forEach(function(element) {
        element.addEventListener("click", function() {
            pokemonId = this.dataset.id
            window.location.href = "pokemon.html"
        })
    })
  
};


