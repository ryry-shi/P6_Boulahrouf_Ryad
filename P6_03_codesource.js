function previous(genre) {
    let movies_selector = $(`#${genre}`)
    movies_selector.append(movies_selector.children()[0])
    update(genre)
   }


function next(genre) {
    let movies_selector = $(`#${genre}`)
    movies_selector.prepend(movies_selector.children()[6])
    update(genre)
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

function all_name(){
    carousel_cate("romance", "blue")
    carousel_cate("action", "green")
    carousel_cate("drama", "white")
    carousel_cate("best", "yellow")
}

//function qui va ajouter les information dans le modal une par div dans les modal

function carousel_cate(genre, color= string){
    let test = document.getElementById(genre+"_carousel")
    test.style.width = "1000px"
    test.style.heigh = "200px"
    test.style.fontSize = "32px"
    test.style.margin = "auto"
    test.style.display = "fixed"
    test.style.padding = "10px"
    test.style.borderBottom = "solid"
    test.style.color = color
}


async function setup_modal(movie_id){
    const response = await fetch(`http://127.0.0.1:8000/api/v1/titles/${movie_id}`)
    const data = await response.json()
    document.getElementById("modal").style.display= "block";
    movie_detail = data
    for(const [key, value] of Object.entries(data)) {
        let info = document.getElementById(key)
        if (info != undefined) {
          info.innerHTML = `<div class="title">${key} : ${value}</div>`
        if(info == duration){
            info.innerHTML =`<div class="title">${key} : ${value} minute</div>`
        }
          if (info == image_url){
            info.innerHTML = `<img src="${value}"></img>`
          }
        }        
      }
    }


function open_modal(url){
    newwin=window.open(url,'','width=400,height=400,top=200,left=200')
}

function close_modal() {
    document.getElementById("modal").style.display= "none";
}

function choose_carousel(genre){
    let id = document.getElementById(genre)
    return id
}

let get_data_carousel_movies = async () => {
    const movies = await get_best_data()
    movies.forEach((movie_data, index) => {
        $(`#movie_${index+1}_best`).html(`
            <img src="${movie_data.image_url}" onclick="modal_try_un(${movie_data.id})">
        `)
    });
}

let get_movies = async (genre = "") => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page_size=7&genre=${genre}`)
    const data = await response.json()
    return data.results
}

let setup_best_movie = async () => {
    const movie_data = await get_movies()
    $(`#best_movie`).html(`
        <img src="${movie_data[0].image_url}"height=450px onclick="setup_modal(${movie_data[0].id})"></img>
    `) 
  }

let setup_carousel = async (genre = "") => {
    const movies = await get_movies(genre)
    movies.forEach((movie_data, index) => {
        if (genre === ""){
            genre = "best"
        }
        $(`#movie_${index+1}_${genre}`).html(`
            <img src="${movie_data.image_url}" onclick="setup_modal(${movie_data.id})">
        `)
    });
}

function all_carousel(){
    setup_carousel("romance")
    setup_carousel("drama")
    setup_carousel("action")
    setup_best_movie()
    setup_carousel()

}


document.addEventListener('DOMContentLoaded',function() {
    all_carousel()
    all_name()
})

