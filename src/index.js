const url = "http://localhost:3000/toys"
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newForm = document.querySelector('.add-toy-form')
const likeButton = document.querySelectorAll('.like-btn')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

newForm.addEventListener("submit", () =>{
  let name = newForm[0].value;
  let imageUrl = newForm[1].value;
  addNewToy(name, imageUrl);
})

// OR HERE!

function fetchToy(){
 fetch(url)
 .then(resp => resp.json())
 .then(json => {
    addToys(json)
 })
}

function addToys(info){
  let toyBox = document.querySelector("#toy-collection")
  
  info.forEach(toy => {
    let div = document.createElement("div")
    div.classList.add("card")
    toyBox.appendChild(div)

    let name = document.createElement("h2")
    name.innerText = toy.name
    div.appendChild(name)
  
    let image = document.createElement("img")
    image.src = toy.image
    image.classList.add("toy-avatar")
    div.appendChild(image)

    let likes = document.createElement("p")
    likes.innerText = `${toy.likes} likes`
    div.appendChild(likes)

    let button = document.createElement("button")
    button.classList.add("like-btn")
    button.innerText = "Like <3"
    div.appendChild(button)
    button.addEventListener('click', () => {
      addLike(toy, likes)
    })  
  })
}

function addNewToy(name, imageUrl){
  fetch(url,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: imageUrl,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(json => console.log(json))
  .catch(err => console.log(err.message))

}

function addLike(toy, likes){
  toy.likes += 1;
  likes.innerText = `${toy.likes} likes`;
  updateLikes(toy);
}

function updateLikes(toy) {
  fetch(`${url}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes
    })
  })
  .then(resp => resp.json())
  .then(obj => console.log(obj))
  .catch(err => err.message)
}

fetchToy();
