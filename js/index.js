document.addEventListener('DOMContentLoaded', dispAllPokemon)

const dispAllPokemon = () => {

// Start the API request at a random pokemon
const max = 1154 - 20;
const min = 0;
const firstPokemon = Math.floor(Math.random() * (max - min + 1)) + min;
const pageLimit = 20;

//Build fetch request
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${firstPokemon}&limit=${pageLimit}`
fetch(url)
.then(res => res.json())
.then(data => console.log(data))

}