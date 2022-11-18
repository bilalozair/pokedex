  const displayPokemon = async () => {
    // fetch call to API for 20 random pokemon

    
    const retrievedPokemon = await fetchPokemon();
    console.log(retrievedPokemon)
    const pokemonGrid = document.getElementById('pokemon-display-section');
    retrievedPokemon.map( pokemon => {
        pokemonGrid.innerHTML += `
        <img src=${pokemon.image} class = 'pokemon-image'>
        <h2>${pokemon.name}</h2>  
        </br> 
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
    pokemonForm.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(pokemonForm);
        console.log('clicked')
    }
    )
    
})


