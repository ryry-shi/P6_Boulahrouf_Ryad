//fetch prend deux parametre url et option
//envois une donner a l'url
// .then retourne la réponse de notre fetch  on nomme une donner ici reponse par défaut
// Une réponse ainsi n'est pas lisible car elle n'est pas retourner en json

class Carousel{

  /** Utiliser js doc pour commenter
   * 
   * @param {HTMLElement} element 
   * @param {Object} options 
   * @param {Object} options.slidesToScroll nombre d'élement a faire défiler
   * @param {Object} options.slidesToVisible nombre d'élement visible
   */
  constructor(element, options = {}){
    this.element = element
    this.options = Object.assign({},{
      slideToScroll:0,
      slideToVisible:1
    },options)
    let root = this.createClss('carousel')
    let container = this.createClss('carousel_container')
    root.appendChild(container)
  }


  /**
 * @param {string} className
 * @returns {HTMLElement}
 * */

createClss(className){
  let div = document.createElement('div')
  div.setAttribute('class', className)
  return div
}

}

let get_best_movies = async (genre)=>{
  const response = await fetch(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&genre=${genre}`)
  const data = await response.json()
  return data.results
}

let get_best_movie = async()=>{
  const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page_size=1")
  const data = await response.json()
  let div = document.getElementById("meilleurFilm")
  const lien = document.createElement('a')
  lien.title = data.results[0].title
  lien.href = data.results[0].imdb_url
  const img = document.createElement("img")
  img.src = data.results[0].image_url
  document.body.appendChild(lien);
  lien.appendChild(img)
}




window.addEventListener('DOMContentLoaded', async (event) => {
  const get_movie = await get_best_movie()
  const best_romance_movies = await get_best_movies("romance");
  let test = document.getElementById("test")
  best_romance_movies.forEach(element => {
    const lien = document.createElement('a')
    lien.href = element.imdb_url
    const img = document.createElement("img")
    img.src = element.image_url
    test.appendChild(lien)
    lien.appendChild(img)
    ;
    
  });
  console.table(best_romance_movies)

  new Carousel(document.querySelector('#carousel1')),{
    slideToScroll:3,
    slideToVisible:4
}
});

// const img = document.getElementById("img")
// let func = async ()=>{
//   fetch('http://127.0.0.1:8000/api/v1/titles/11976170')
//   .then (data => {
//       console.log(data)
//       const response = fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page_size=1")
//       img = createElement("img")
//       img.src = data.image_url
//       div = document.getElementById("meilleurFilm")
//   })

// }
// func()