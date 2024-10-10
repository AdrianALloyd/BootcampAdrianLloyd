function fetchKantoPokemon(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
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
        console.log(pokeData)
    })
}

// const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151`'
// try {
//     fetch(baseUrl)
//     .then(response => {
//         const responseJson = response.json()
//         return responseJson
//         })
//     .then(data => {
//         const pokemons = data.results
        
//         pokemons.forEach(pokemon => {
//             document.getElementById('pokeList')
//             .insertAdjacentHTML('beforeend', 
//                 `<li class="listers" onclick='detail("${pokemon.url}")'>
                
//                 <img class="pokeData" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokIdGetter(pokemon.url)}.png"/>    
//                 <br>
//                 <button class="pokeButton"><a href="${pokLinkGetter(pokemon.url)}.html" >${pokemon.name}</a></button>            
//                 </li>
                
//                 `)
                
//             })
//         })
//     .catch(error => {
//         console.error(error)
//         })
// } catch (error) {
//     console.error(error)
// }





    const dataSet = (url) => {
        try {
            fetch(url)
                .then(response => response.json())
                .then(pokemon => {
                 // Condition to check if mono or dual type
                if(pokemon.types.length > 1){
                    var pokTypes = [pokemon.types[0].type.name, pokemon.types[1].type.name]
                }else{
                    var pokTypes = [pokemon.types[0].type.name]
                }
                
                    // document.getElementById('typeText').innerHTML = `Type: ${pokeType}`
                    document.getElementById('detail')
                    // Inserts element in specified position, in this case, we're inserting it at the end of the current element
                        .insertAdjacentHTML('beforeend', // Template literal for pokemon information
                        
                        `
                            <p>ID : ${pokIdFormat(pokemon.id)}</p>
                            <p id="pokeType">Type :<br>  ${getType(pokTypes)}</p>
                            <p>Height : ${pokemon.height/10}m</p>
                            <p>Weight : ${pokemon.weight/10}kg</p>
                            <p id="flavourText">${getFlavour(pokemon.id)}</p>
                            <audio id="pokeCry" autoplay volume="0.05"  src="${pokemon.cries.legacy}"/>
                            
                        `
                        // Can add controls attribute to audio tag for playback controls
                        // <p>ID <b>:</b> 001</p>
                        // <p id="typeText">Type <b>: </b> </p>
                        // <p>Height <b>: </b> 0.7m</p>
                        // <p>Weight <b>: </b> 6.9kg</p>
                        // <p>About <b>: </b></p>
                        // <p>A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon</p>
                        
                            
                )}
                    )
                .catch(error => {
                    console.error(error)
                    })
            } catch (error) {
                console.error(error)
                }
        }
    

function getType(typeArr){

    var type1 = typeArr[0];
    var type2 = typeArr[1];
    console.log(typeArr[0]);
    console.log(type1);

    if(typeArr.length > 1){
        console.log("error1");
        return `<p class =${type1}>${type1}</p>  <p class =${type2}>${type2}</p>`
            
        
        
    }else{
        console.log("error2");
            return `type1`
            
            
        
    }
}




const getFlavour = (id) =>{
    let url = "https://pokeapi.co/api/v2/pokemon-species/" + id;
    console.log(url);
    try{
        fetch(url)
            .then(response => response.json())
            .then(pokemon => {
                let flavour = pokemon.flavor_text_entries[0].flavor_text;
                // let flavour = "";
                // for(let x of flavour){
                //     if((old_flavour[x] >='a' && old_flavour[x] <= 'z')||(old_flavour[x] >='Z' && old_flavour[x] <= 'Z')||(old_flavour[x] >='0' && old_flavour[x] <= '9')||(old_flavour[x] == 'é')||(old_flavour[x] == ' ')){
                //         flavor += old_flavour;
                //     }else{
                        
                //     }
                // }
                console.log(flavour)
                document.getElementById("flavourText").innerHTML = '';
                document.getElementById("flavourText").insertAdjacentHTML('beforeend',`About :<br> ${flavour}`);
                
            })
            .catch(error => {
                console.error(error)
                })
    } catch(error){
        console.error(error)
    }
    
}
        
function getData(id){
    let x = toUrl(id);
    dataSet(x);
}

function toUrl(idNumber){
    let urlString = "https://pokeapi.co/api/v2/pokemon/" + idNumber;
    
    return urlString;
}


function pokIdGetter(urlString){
    let length = urlString.length;
    let pokId = urlString.substr(34);
    pokId = pokId.substr(0, pokId.length-1)
    console.log(pokId);
    console.log(length);
    return pokId;
}

function pokIdFormat(pokeNum){
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

function pokLinkGetter(urlString){
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


