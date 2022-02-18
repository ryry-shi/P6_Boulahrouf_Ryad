function previous(genre) {
    let movies_selector = $(`#${genre}`)
    movies_selector.append(movies_selector.children()[0])
    update()
   }

function next(genre) {
    let movies_selector = $(`#${genre}`)
    movies_selector.prepend(movies_selector.children()[6])
    update()
   }

function update(genre) {
    let movies_selector = $(`#${genre}`)
    let children = movies_selector.children()
    children.each((index, elem)=> {
        if( index < 4 ) {
            $(elem).show()
        } else {
            $(elem).hide()
        }
    })
   }

//function qui va ajouter les information dans le modal une par div dans les modal
function modal_try_un(data){
    description = ["title","actors","genres","duration","rated","directors" ,"countries","date_published","description","imdb_score","metascore"]
    movie_detail = data
    for (var i = 1; i <= 11 ; i++){
        //on trie les information une par une 
        description_une_par_une = description[i]
        console.log(description_une_par_une)
        modal = document.getElementById(`modal_${i}`)
        //on les ajoute une par une dans les div grâce a la boucle for
        div = movie_detail[description_une_par_une]
        modal.append(div)
    }
   }


function modal_un(image_url){
    modal = document.getElementById("modal")
    img = document.createElement("img")
    modal.appendChild(img)
    img.src = image_url.src
}

function openWin(url){
    newwin=window.open(url,'','width=400,height=400,top=200,left=200')
}

function chooce_carousel(genre){
    let id = document.getElementById(genre)
    return id
}


let get_data = async(genre)=>{
    const response = await fetch(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=${genre}`)
    const data = await response.json()
    return data.results
}

let get_url = async()=>{
    const test = document.getElementById("test_click").textContent
    const response = await fetch(test)
    const data = await response.json()
    return data
}

let get_best_movie = async()=>{
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page_size=1")
    const data = await response.json()
    let div = document.getElementById("best_movie")
    let lien = document.createElement('a')
    lien.title = data.results[0].title
    lien.setAttribute("onClick",openWin(data.results[0].imdb_url))
    let img = document.createElement("img")
    img.src = data.results[0].image_url
    modal_un(img)
    div.appendChild(lien)
    lien.appendChild(img)
  }

//   <a href="${movie_data.imdb_url}">


let get_data_movies = async(genre)=>{
    const movies = await get_data(genre)
    movies.forEach((movie_data, index) => {
        $(`#movie_${index+1}_${genre}`).html(`
            <a alt="${movie_data.url}" onclick=${modal_try_un(movie_data)}">
                <img src="${movie_data.image_url}">
            </a>
        `)
        console.log(movie_data.url)
    });
}

// test.addEventListener('click', async function(){
//     const response = await get_url()
//     modal_try_un(response)
// })

document.addEventListener('DOMContentLoaded',function() {
    get_data_movies("romance")
    get_data_movies("drama")
    get_data_movies("action")
    get_best_movie()
})

