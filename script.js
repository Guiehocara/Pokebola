const pokemonContainer = document.querySelector(".pokemon-container")
const  prevButton = document.querySelector(".prev")
const nextButton = document.querySelector(".next")
const pageSpan = document.querySelector(".page-index")
const spinner = document.querySelector(".spinner");
const ITEMS_PER_PAGE = 24
let page = 0
let max =  1281
async function getPokemons(offset, limit) { 
    pageSpan.classList.add("hidden")
    nextButton.disabled = true
    prevButton.disable = true
    spinner.classList.remove("hidden")
    const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    )

const json = await res.json()
max = json.count
const json3 = Array
let i = 0;
console.log(json.results[0].name)
while(i < 10){
    json2 = Array
    json2[0] = json.results[i].name
    json2[1] = await fetch(
        `${json.results[i].url}`
    )
    json3[i] = json2
    i++
}

console.log(json2[1])




const pokemons = await Promise.all(json.results.map(
    async({url}) => {
        const pokemonRes = await fetch(url)
        return pokemonRes.json()

    })
)
    render(pokemons)
    pageSpan.classList.remove("hidden")
    nextButton.disabled = false
    prevButton.disable = false
    spinner.classList.add("hidden")
}

function render(pokemons){

    pokemonContainer.innerHTML = null
    pokemons.forEach((pokemon) => {
        const card = `
            <li class="card" onClick="this.classList.toggle('flipped')">
                <img 
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}"
                    loading="lazy"
                    class="sprite"
                    />

                    <p class=name"> ${pokemon.name}</p>
                    </li>
        
                    <li class="card hidden" onClick="this.classList.toggle('flipped')">
                    <img 
                        src="${pokemon.abilities}"
                        alt="${pokemon.name}"
                        loading="lazy"
                        class="sprite"
                        />
    
                        <p class=name"> ${pokemon.name}</p>
                        </li>
            
        
        `
        pokemonContainer.innerHTML += card


    });
}
prevButton.addEventListener("click", () => {
    if(page - 1 < 0) return
    page--
    pageSpan.innerHTML = page
    getPokemons(ITEMS_PER_PAGE * page, ITEMS_PER_PAGE)
});
nextButton.addEventListener("click", () => {
    if(page + 1 > Math.floor(max/ITEMS_PER_PAGE)) return
    page++
    pageSpan.innerHTML = page
    getPokemons(ITEMS_PER_PAGE * page, ITEMS_PER_PAGE)
    
});
getPokemons(page * ITEMS_PER_PAGE, ITEMS_PER_PAGE);