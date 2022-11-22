document.addEventListener('DOMContentLoaded', () => {
    const pokemonForm = document.getElementById('search-form');
    
    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('pokemon-display-section').innerHTML =""
        const pokemonQuery = e.target['search-name'].value;
        lookandDiplayPokemon(pokemonQuery.toLowerCase());
    })
    displayPokemon()

})
 
  
  const displayPokemon = async () => {
    // fetch call to API for 20 random pokemon

    
    const retrievedPokemon = await fetchPokemon();
    const pokemonGrid = document.getElementById('pokemon-display-section');
    retrievedPokemon.map( pokemon => {
        pokemonGrid.innerHTML += 
        `<div class="card">
            <div class="card-img">
                <img src = ${pokemon.image} alt= ${pokemon.name}>
            </div>
            <div class="card-info">
                <p class="text-title">${pokemon.name}</p>
            </div>
            <div class="card-button">
                <p class ="detail-btn-text"> Get Details! </p>
            </div>
        </div>     

    `
    })
    attachEvents()
}

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
    
    document.getElementById('pokemon-display-section').innerHTML +=
    `  <div class="card">
        <div class="card-img">
            <img src = ${searchObj.image} alt= ${searchObj.name}>
        </div>
        <div class="card-info">
          <p class="text-title">${searchObj.name}</p>
          <p class="text-detail"><span class ="text-title">Type:</span> ${searchObj.type}</p>
          <p class="text-detail"><span class ="text-title">Moves:</span> ${searchObj.moves[0]}</p>
          <p class="text-detail"><span class ="text-title">Weight:</span> ${searchObj.weight}</p>
        </div>
        
        </div>     
    `

})
.catch((error) => {
    alert('Not a Valid Pokemon :( Please Try Again!');
    console.log(error)
})

}

const attachEvents =  () => {
    console.log(document.querySelectorAll('.card-button'))
    
        document.querySelectorAll('.card-button').forEach(element => {

            element.addEventListener('click', (e) => {
            let search_term = e.target.offsetParent.childNodes[3].innerText;
            console.log('event attached to:' , search_term)
            document.getElementById('pokemon-display-section').innerHTML='';
                lookandDiplayPokemon(search_term)
        })
       

    })
   

}
