
let idno = 1
let pokeLimit = 151
function fetchKantoPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokeLimit}`)
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon)
        })
    })
}

function fetchPokemonData(pokemon){
    let url = pokemon.url // Saving pokemon url to a variable to use in a fetch
    fetch(url)
    .then(response => response.json()) // formatting the response into a json file
    .then(function(pokeData){
    })
}

const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokeLimit}`
try {
    fetch(baseUrl)
    .then(response => {
        const responseJson = response.json()
        return responseJson
        })
    .then(data => {
        const pokemons = data.results
        sampleId = 1
        if(document.getElementById('pokeList')!= null){
        pokemons.forEach(pokemon => { //goes through all pokemon listing them with ability to click and go to pokemons direct page
            document.getElementById('pokeList')
            .insertAdjacentHTML('beforeend', 
                `<li>
                
                <img class="pokeData" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokIdGetter(pokemon.url)}.png"/>    
                <br>
                <button class="pokeButton" id="${sampleId}">${(pokemon.name).toUpperCase()}</a></button>            
                </li>
                
                `)
                
                document.getElementById(sampleId).addEventListener('click', 
                    function(){
                        console.log("passed ID:" + this.id)
                        sessionStorage.setItem("idNo", this.id)
                        window.location.href= "001.html"
                    }
                )
                sampleId ++
            })
        }else if(document.getElementById('gallery')!= null){
            pokemons.forEach(pokemon => { //goes through all pokemon listing them with ability to click and go to pokemons direct page
                document.getElementById('gallery')
                .insertAdjacentHTML('beforeend', 
                    `<li >
                    <a>
                    <img class="galData" id="${sampleId}" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokIdGetter(pokemon.url)}.png"/>
                    </a>
                    
                    </li>
                    
                    `)
                    document.getElementById(sampleId).addEventListener('click', 
                        function(){
                            console.log("passed ID:" + this.id)
                            sessionStorage.setItem("idNo", this.id)
                            window.location.href= "001.html"
                        }
                    )
                    sampleId ++
                })
        }
        })
    .catch(error => {
        console.error(error)
        })
} catch (error) {
    console.error(error)
}



// function setChoice(id){
//     console.log(`passed ID:${id}`)
//     sessionStorage.setItem('idNo', `${id}`)
//     window.location.href= "001.html"
// }



// function setNav(){
//     if(idno > 1){
//         document.getElementById(navBar).innerHTML= '';
//         document.getElementById(navBar).insertAdjacentHTML("beforebegin",
//             `<a onclick=previousPokemon() id="prevPok">Previous Pokémon</a>`);
//     }else{
//         document.getElementById(navBar).innerHTML= '';
//         document.getElementById(navBar).insertAdjacentHTML("beforebegin",
//             `<a onclick=previousPokemon() id="prevPok"></a>`);
//     }
//     if(idno < pokeLimit){
//         document.getElementById(navBar).innerHTML= '';
//         document.getElementById(navBar).insertAdjacentHTML("beforeend",
//             `<a onclick=nextPokemon() id="nextPok">Next Pokémon</a>`);
//     }else{
//         document.getElementById(navBar).innerHTML= '';
//         document.getElementById(navBar).insertAdjacentHTML("beforeend",
//             `<a onclick=nextPokemon() id="nextPok"></a>`);
//     }
// }

const dataSet = (url) => {
    try {
        fetch(url)
            .then(response => response.json())
            .then(pokemon => {
                // Condition to check if mono or dual type
            if(pokemon.past_types.length > 0){         //checking if any past types are present
                if(pokemon.past_types[0].types.length > 1){
                    var pokTypes = [pokemon.past_types[0].types[0].type.name, pokemon.past_types[0].types[1].type.name]
                }else{
                    var pokTypes = [pokemon.past_types[0].types[0].type.name]
                }
            }else{
                if(pokemon.types.length > 1){
                    var pokTypes = [pokemon.types[0].type.name, pokemon.types[1].type.name]
                }else{
                    var pokTypes = [pokemon.types[0].type.name]
                }
            }

            document.getElementById('title').innerHTML=""
            document.getElementById('title').innerHTML=`${pokemon.name.toUpperCase()}`
            document.getElementById('pokeName').innerHTML=""
            document.getElementById('pokeName').innerHTML=`${pokemon.name.toUpperCase()}`
            //type names put into an array to be processed later
            document.getElementById('detail').innerHTML=""
            document.getElementById('detail')
            // Inserts element in specified position, in this case, we're inserting it at the end of the current element
                .insertAdjacentHTML('beforeend', // Template literal for pokemon information
                
                `
                    <p>ID : ${pokIdFormat(pokemon.id)}</p>  
                    <p id="pokeType">Type :<br>  ${getType(pokTypes)}</p>
                    <p>Height : ${pokemon.height/10}m</p>
                    <p>Weight : ${pokemon.weight/10}kg</p>
                    <p id="flavourText">${getFlavour(pokemon.id)}</p>
                    <audio volume="0.1" id="pokeCry" autoplay src="${pokemon.cries.latest}"/>
                `
                    // <p>ID : ${pokIdFormat(pokemon.id)}</p>    passing pokemons id number to be parsed into 3 digits
                    // <p id="pokeType">Type :<br>  ${getType(pokTypes)}</p>  passing type array to output processed and styled types
                    // <p>Height : ${pokemon.height/10}m</p>
                    // <p>Weight : ${pokemon.weight/10}kg</p>
                    // <p id="flavourText">${getFlavour(pokemon.id)}</p>   calls function to get flavour text of each pokemon
                    // <audio id="pokeCry" autoplay volume="0.05"  src="${pokemon.cries.legacy}"/>   plays the pokemons cry on page load
                )
            }
                )
            .catch(error => {
                console.error(error)
                })
        } catch (error) {
            console.error(error)
            }
    }


const imageSet = (url) => {  //function to add the currently selected pokemon's image to the page
    try {
        fetch(url)
            .then(response => response.json())
            .then(pokemon => {
                
                getEvolutions(pokemon.id)
                let page = Math.floor((Math.random()*255) + 1);
                console.log(page)
                if(page == 5){
                    var isShiny = `${pokemon["sprites"]["other"]["official-artwork"]["front_shiny"]}`
                }else{
                    var isShiny = `${pokemon["sprites"]["other"]["official-artwork"]["front_default"]}`
                }
                document.getElementById('imageDetail').innerHTML=""
                document.getElementById('imageDetail') 
                // Inserts element in specified position, in this case, we're inserting it at the end of the current element
                    .insertAdjacentHTML('beforeend', // Template literal for pokemon information
                    
                        
                        `
                        <a href="${pokIdFormat(pokemon.id)}.html"  class="pokemonImage"><img alt="${pokemon.name}" src="${isShiny}"/><a/>
                        `    
                        //template literal creating an image of the selected pokemon that with link to the pokemon's page
                    )       
        }
                )
            .catch(error => {
                console.error(error)
                })
        } catch (error) {
            console.error(error)
            }
}

function getType(typeArr){ //

    var type1 = typeArr[0];
    var type2 = typeArr[1];

    if(typeArr.length > 1){
        
        return `<p class =${type1}>${type1}</p>  <p class =${type2}>${type2}</p>`
        //returns filled out template for dual type pokemon
    }else{
        
        return `<p class=${type1}>${type1}</p>`
        //returns filled out template for single type pokemon
    }
}

const getFlavour = (id) =>{
    let url = "https://pokeapi.co/api/v2/pokemon-species/" + idno;
    //gets the species section of the pokeapi
    try{
        fetch(url)
            .then(response => response.json())
            .then(pokemon => {
                let flavour = pokemon.flavor_text_entries[9].flavor_text;
                // gets the flavour text from the 9th generation (identical to first generation without obsolete symbols)
                
                document.getElementById("flavourText").innerHTML = '';
                document.getElementById("flavourText").insertAdjacentHTML('beforeend',`About :<br> ${flavour}`);
                //puts the flavour text on screen
            })
            .catch(error => {
                console.error(error)
                })
    } catch(error){
        console.error(error)
    }
}

const getEvolutions = (id) =>{ //function to get the evolutions for currently selected pokemon

    var evolId;
    let urlEvo = "https://pokeapi.co/api/v2/pokemon-species/" + idno; 
    try{
        fetch(urlEvo)
        .then(response => response.json())
        .then(pokemon => {
            evolId = pokEvoIdGetter(pokemon.evolution_chain.url);
            //gets the url to be used for the evolution chain
    let url = "https://pokeapi.co/api/v2/evolution-chain/" + evolId;
    var pokeID = pokemon.name;
    try{
        fetch(url)
        .then(response => response.json())
        .then(pokemon => {
            var baseIdentifier = [];
            var evoIdentifier = [];
            var secondEvoIdentifier = [];
            //creating arrays to be concatenated later
            
            baseIdentifier[0] = pokemon["chain"]["species"]["name"]
            //sets the value for the base level pokemon
            for(let x in pokemon["chain"]["evolves_to"]){ //loop to check for multiple evolutions at 1st level eg. Eevee
                if(pokemon["chain"]["evolves_to"].length != 0){
                    evoIdentifier[x] = pokemon["chain"]["evolves_to"][x]["species"]["name"]
            }
            for(let y in pokemon["chain"]["evolves_to"][0]["evolves_to"]){ //loop to check for multiple evolutions at 2nd level eg. politoad (although not neccesary for kanto only)
                if(pokemon["chain"]["evolves_to"][x]["evolves_to"].length != 0){
                    secondEvoIdentifier[x] = pokemon["chain"]["evolves_to"][x]["evolves_to"][0]["species"]["name"]
                }
            }
            var evoArray = baseIdentifier.concat(evoIdentifier,secondEvoIdentifier);
            //joining the arrays together
            }
            for(let x in evoArray){
                if(evoArray[x] != pokeID){
                setevoImage(toUrl(evoArray[x])); //checks for currently selected pokemon so the image isn't also added in the evolution slots
                } 
            }
        })
        .catch(error => {
            console.error(error)
            })
    } catch(error){
        console.error(error)
    }

        })
        .catch(error => {
            console.error(error)
            })
    } catch(error){
        console.error(error)
    } 

    
}


const setevoImage = (url) => {  //function to add in evolution images
    try {
        fetch(url)
            .then(response => response.json())
            .then(pokemon => {
                
                
                if(pokemon.id <= pokeLimit){
                document.getElementById('imageDetail')
                    .insertAdjacentHTML('beforeend', 
                        `
                        <a id="${pokemon.id}" class="evolutionImage"><img alt="${pokemon.name}" src="${pokemon["sprites"]["other"]["official-artwork"]["front_default"]}"/></a>
                        `    
                        //template literal creating an image of the selected pokemon's evolutions that with link to the pokemon's page
                    ) 
                
                    document.getElementById(pokemon.id).addEventListener('click', 
                        function(){
                            console.log("passed ID:" + this.id)
                            sessionStorage.setItem("idNo", this.id)
                            getData()
                        }
                    )
                }     
        }
                )
            .catch(error => {
                console.error(error)
                })
        } catch (error) {
            console.error(error)
            }
}


function getData(){  //function to call the functions to set the data and images on the page
    idno = sessionStorage.getItem('idNo')
    console.log(idno)
    let x = toUrl(idno);
    console.log(idno)
    //setNav();
    dataSet(x);
    imageSet(x);
}

function toUrl(idNumber){ //gets the url with corrosponding pokemon id number

    let urlString = "https://pokeapi.co/api/v2/pokemon/" + idNumber;  
    return urlString; 
}



function pokEvoIdGetter(urlString){ //function to process the url string to get only the id number of the evolutions of the pokemon selected
    let pokId = urlString.substr(42);
    pokId = pokId.substr(0, pokId.length-1)
    return pokId;
}

function pokIdGetter(urlString){ //function to process the url string to get only the id number of the selected pokemon
    let length = urlString.length;
    let pokId = urlString.substr(34);
    pokId = pokId.substr(0, pokId.length-1)
    return pokId;
}

function pokIdFormat(pokeNum){   //function to format the pokemons id number to 3 digits
    let numString = pokeNum.toString();
    if(numString.length == 3){
        return pokeNum;
    }else if(numString.length == 2){
        return "0" + pokeNum;
    }else if(numString.length == 1){
        return "00" + pokeNum;
    }else{
        return "001";
    }
}

function pokLinkGetter(urlString){ //function to format pokemon url into 3 digit id number
    let pokeNum = pokIdGetter(urlString);

    if(pokeNum.length == 3){
        return pokeNum;
    }else if(pokeNum.length == 2){
        return "0" + pokeNum;
    }else if(pokeNum.length == 1){
        return "00" + pokeNum;
    }else{
        return "001";
    }

}

function getRandom(){
    var page = Math.floor((Math.random()*pokeLimit) + 1 )
    
    console.log(`this random:${page}`)
    sessionStorage.setItem('idNo', page)
    location.href = '001.html';
}

function nextPokemon(){
    idno++
    sessionStorage.setItem('idNo', idno)
    getData(idno)
    console.log(idno)
}

function previousPokemon(){
    idno--
    sessionStorage.setItem('idNo', idno)
    getData(idno)
    console.log(idno)
}



