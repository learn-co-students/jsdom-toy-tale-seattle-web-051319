const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    const addToy = document.getElementsByClassName("add-toy-form")[0]
    console.log(addToy)

    addToy.addEventListener('submit', createToy)

    // 2 => submit listener here
    // listen for Create New Toy button (#add-toy-form)
    // fetch post request to db to add toy
      // fetch(destinationURL, configObject{method: #, header: #, body: # })
    // make a new div with makeCards()
  } else {
    toyForm.style.display = 'none'
  }
})

function createToy(ev){
  ev.preventDefault()

  let toyName = ev.target.elements['name'].value
  let imgUrl = ev.target.elements['image'].value

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: toyName,
      image: imgUrl,
      likes: 0
      })
  })
  .then(res => res.json())
  .then(toy => {
      // make the movie appear at the top of the list
      console.log(toy)
      makeCards([toy])
    })

}

// OR HERE!
document.addEventListener("DOMContentLoaded", getAllToys)

function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json();
  }).then(function(json){
    makeCards(json);
  })
}

function makeCards(json){

  for(const toy of json){
    const name = toy.name;
    const img = toy.image;
    const likes = toy.likes;

    const toyCollection = document.getElementById("toy-collection")
    const card = document.createElement('div')
    card.className = "card" //toyCollection

    const header = document.createElement('h2')
    header.innerText = name

    const image = document.createElement('img')
    image.src = img
    image.className = "toy-avatar"

    const totalLikes = document.createElement('p')
    totalLikes.innerText = likes

    const btn = document.createElement('button')
    btn.innerText = "Like <3"
    btn.className = "like-btn"
    btn.addEventListener("click", () => { incrementLikes(totalLikes) })

    card.appendChild(header)
    card.appendChild(image)
    card.appendChild(totalLikes)
    card.appendChild(btn)


    toyCollection.appendChild(card)
  }

  // 1 => iterate over the data
    // make a new div <div class="card">
      // h2 tag with the toy's name
      // img tag --src of the toy's image attribute -- class name "toy-avatar"
      // p tag with how many likes that toy has
      // button tag with a class "like-btn"

}


// create event listener for like button
function incrementLikes(totalLikes) {
  // conditionally increment toy's like
  // if request is sent
  // create function sendLike()
    // increment like number on browser
    let likes = totalLikes.innerText

    console.log(likes)
    // const likeButton = document.getElementById("like-btn")

    // ev.preventDefault()
    // likeButton.addEventListener("click", getAllToys)

    // let likeButton = ev.target.elements['likeBtn'].value
    //
    // fetch('http://localhost:3000/toys', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify({
    //
    //     likes: 0
    //     })
    // })
    // .then(res => res.json())
    // .then(toy => {
    //     // make the movie appear at the top of the list
    //     console.log(toy)
    //     makeCards([toy])
    //   })
    //
    //



}


function sendLike() {
  // fetch(destinationURL, confiObject{method: #, headers: #, body: # })
}








// getAllToys()
