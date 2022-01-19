//fetch prend deux parametre url et option
//envois une donner a l'url
// .then retourne la réponse de notre fetch  on nomme une donner ici reponse par défaut
// Une réponse ainsi n'est pas lisible car elle n'est pas retourner en json

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

get_test = async()=>{
  const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page_size=1")
  const data = response.json
  console.log(data)
}

window.addEventListener('DOMContentLoaded', async (event) => {
  const get_movie = await get_best_movie()
  const get_test = await get_test()
  const best_romance_movies = await get_best_movies("romance")
  let test = document.getElementById("romance")
  best_romance_movies.forEach(element => {
    const url = document.createElement('a')
    url.href = element.imdb_url
    const img = document.createElement("img")
    img.src = element.image_url
    document.body.appendChild(url)
    url.appendChild(img)
  })
})