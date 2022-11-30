//// POKEDEX APP ////
/* This app makes GET requests to the PokeAPI (https://pokeapi.co) */



document.addEventListener('DOMContentLoaded', () => {
    
    renderPokemonCards();

    
    const pokemonForm = document.getElementById('search-form');

    
    pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('pokemon-display-section').innerHTML ="";
        const pokemonQuery = e.target['search-name'].value;
        searchAndDisplayPokemon(pokemonQuery.toLowerCase());
    })
})
 
 

 const renderPokemonCards = async () => {
    
    const retrievedPokemon = await fetchPokemon();
    const pokemonGrid = document.getElementById('pokemon-display-section');
    retrievedPokemon.map(pokemon => {

        pokemonGrid.innerHTML += 
        `
        <div class="card">
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
    attachDetailBtnEvent()
}


const fetchPokemon = async () => {
    
    const max = 649;
    const min = 1;
    const firstPokemon = Math.floor(Math.random() * (max - min + 1)) + min;
    const pageLimit = 20;  

    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${firstPokemon}&limit=${pageLimit}`;
    const res = await fetch(url);
    const pokemonData = await res.json();
    const  pokemonArray = createPokeObj(firstPokemon,pokemonData);
    return pokemonArray;

}


const createPokeObj = (firstPokemon, pokemonData) => {

    const pokeObj = pokemonData.results.map((pokemon, index) => (
        {        
            id: firstPokemon + index + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${firstPokemon +index + 1}.svg`
        
        }
    ))
    return pokeObj;
}

       
const searchAndDisplayPokemon = (query) => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(res => res.json())
        .then(data => {

            let  searchObj = {
                name: data.name,
                id: data.id,
                type: data.types.map((type) => type.type.name).join(', '),
                image: data.sprites.other.dream_world.front_default,
                weight: `${data.weight} kg`,
                moves: data.moves.map((move) => move.move.name),
                }
            document.getElementById('pokemon-display-section').innerHTML +=
            `<div class="card">
                <div class="card-img">
                    <img src = ${searchObj.image} alt= ${searchObj.name}>
                </div>
                <div class="card-info">
                    <p class="text-title">${searchObj.name}</p>
                    <p class="text-detail"><span class ="text-title">Type:</span> ${searchObj.type}</p>
                    <p class="text-detail"><span class ="text-title">Moves:</span> ${searchObj.moves[0]}</p>
                    <p class="text-detail"><span class ="text-title">Weight:</span> ${searchObj.weight}</p>
                </div>
            </div>`   
        })
        .catch(() => {
            alert('Not a Valid Pokemon :( Please Try Again!');
        })
}


const attachDetailBtnEvent =  () => {

    document.querySelectorAll('.card-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const clickedCard = e.target.offsetParent.childNodes[3].innerText;
            document.getElementById('pokemon-display-section').innerHTML='';
            searchAndDisplayPokemon(clickedCard)
        })
    })

}
