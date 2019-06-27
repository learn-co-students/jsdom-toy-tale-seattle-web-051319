const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let URL = "http://localhost:3000/toys"

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


// OR HERE!

document.addEventListener("DOMContentLoaded", () => {
  getToys();
})

function getToys(){
  return fetch(URL)
  .then(resp => resp.json())
  .then(json => allToys(json))
}

function allToys(json){
    for (i = 0; i < json.length; i++){
        createToy(json[i])
    }
}

function createToy(toy){
  let id = toy.id
  let name = toy.name
  let toyImg = toy.image
  let likes = toy.likes
  
  let allToys = document.getElementById("toy-collection")
  let div = document.createElement("div");
  div.setAttribute("id", `${toy.id}`)
  let h2 = document.createElement("h2");
  // add div and h2 to the card
  h2.innerText = name;
  div.className = "card"
  div.appendChild(h2);

  //add p tag to card
  let p = document.createElement("p");
  p.innerText = `${likes} Likes`
  div.appendChild(p);

  //add image to card
  let image = document.createElement("img");
    image.src =`${toyImg}`
    image.className = "toy-avatar"
  div.appendChild(image);

  //add button to all
  let button = document.createElement("button");
  button.className = "like-btn";
  button.setAttribute('id', id);
  button.innerText = "Like"
  div.appendChild(button);

  
  
  allToys.appendChild(div);


  button.addEventListener("click", () => {
    toy.likes += 1;
    fetch(URL + "/" + `${id}`,{
      method: 'PATCH',
      body: JSON.stringify({
        "likes": toy.likes
      }),
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then(json => {
        p.innerText = `${toy.likes} Likes`
})
  })
}


let form = document.getElementsByClassName("add-toy-form")

form[0].addEventListener("submit", () => {
  toy = {
    name: form[0].name.value,
    image: form[0].image.value
  }
  newToy(toy);
})



function newToy(toy){
  toy.likes = 0;
fetch(URL, {
  method: 'POST',
  body: JSON.stringify(toy),
  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
})
.then(res => res.json())
.then(json => {
  debugger;
  createToy(toy)
})
}

// fetch(URL + "/" + `${toy.id}`)





