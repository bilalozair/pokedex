document.addEventListener("DOMContentLoaded", () => {
    fetchPokemon();
    // console.log(pokemonObj);


})


const fetchPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then(resp => resp.json())
    .then(data => {
        let pokemonObj = {}
        pokemonObj.name = data.name
        pokemonObj.id = data.id
        pokemonObj.image = data.sprites.front_default;
        console.log(pokemonObj)
        return pokemonObj
    })
}