  const displayPokemon = async () => {
    // fetch call to API for 20 random pokemon

    
    const retrievedPokemon = await fetchPokemon();
    console.log(retrievedPokemon)
    const pokemonGrid = document.getElementById('pokemon-display-section');
    retrievedPokemon.map( pokemon => {
        pokemonGrid.innerHTML += `  <div class="card">
        <div class="card-img">
            <img src = ${pokemon.image} alt= ${pokemon.name}>
        </div>
        <div class="card-info">
          <p class="text-title">${pokemon.name}</p>
        </div>
               

    `
}
        
)}

const fetchPokemon = async () => {
/// Writing code to start the API request at a random pokemon
    const max = 649;
    const min = 1;
    const firstPokemon = Math.floor(Math.random() * (max - min + 1)) + min;
    const pageLimit = 20;  

    /// Fetching Pokemon name, url and img to display to DOM
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${firstPokemon}&limit=${pageLimit}`;

    let res = await fetch(url);
    let pokemonData = await res.json();
    console.log(pokemonData)
    const  pokemonList = createPokeObj(firstPokemon,pokemonData);
    return pokemonList;

}

const createPokeObj = (firstPokemon, pokemonData) => {
    const pokeObj = pokemonData.results.map((pokemon, index) => (
        {        
            id: firstPokemon + index + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${firstPokemon +index + 1}.svg`
        
        }
    ))
    return pokeObj
}


       


document.addEventListener('DOMContentLoaded', () => {
    displayPokemon()

    const pokemonForm = document.getElementById('search-form');
    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('pokemon-display-section').innerHTML =""
        const pokemonQuery = e.target['search-name'].value;
        lookandDiplayPokemon(pokemonQuery.toLowerCase());
    }
    
    )
    
    
})

const lookandDiplayPokemon = (query) => {

fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
.then(res => res.json())
.then(data => {

    let  searchObj = {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        type: data.types.map((type) => type.type.name).join(', '),
        moves: data.moves.map((move) => move.move.name),
        weight: `${data.weight} kg`
    }

    console.log(searchObj)
    
    document.getElementById('pokemon-display-section').innerHTML =
    `   <img src=${searchObj.image} class = 'pokemon-image'>
        <p>${searchObj.name}</p>
        <p>${searchObj.type}</p>
        <p>${searchObj.moves[0]},
            ${searchObj.moves[1]},
            ${searchObj.moves[3]}
        </p>
        <p>${searchObj.weight}</p>  
        </br> 
    `





})}
// <img src=${pokemon.image} class = 'pokemon-image'>
        // <h2 class = 'pokmeon-image'>${pokemon.name}</h2>  
        // </br> 