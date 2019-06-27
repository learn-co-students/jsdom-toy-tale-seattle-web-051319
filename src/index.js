const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const toyURL = "http://localhost:3000/toys"

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


// OR HERE!

  //Our get fetch request to display all toys in the DB
  fetch(toyURL)
    .then(resource => {
      return resource.json()
    })
    .then(json =>{
      for (toy of json) {
        displayNewToy(toy)
      }
    })

    // Would like to add a new method to indicate what the numbers mean
    function displayNewToy(object) {
      const newToyDiv = document.createElement('div')
      newToyDiv.classList.add('card')
      newToyDiv.id = object.id
      newToyDiv.appendChild(createH2Attributes(object))
      newToyDiv.appendChild(createImgAttributes(object))
      newToyDiv.appendChild(createLikeCountAttributes(object))
      newToyDiv.appendChild(createPAttributes(object))
      newToyDiv.appendChild(createButtonAttributes(object))
      toyCollection.appendChild(newToyDiv)
    }

    function createH2Attributes(object) {
      const newToyH2 = document.createElement('h2')
      newToyH2.textContent = object.name
      return newToyH2
    }

    function createImgAttributes(object) {
      const newToyImg = document.createElement('img')
      newToyImg.src = object.image
      newToyImg.classList.add('toy-avatar')
      return newToyImg
    }

    function createPAttributes(object) {
      const newToyP = document.createElement('p')
      newToyP.textContent = object.likes
      return newToyP
    }

    // Added total likes header to indicate what numbers mean
    function createLikeCountAttributes(object) {
      const likeCountH = document.createElement('h5')
      likeCountH.textContent = 'Total Likes:'
      return likeCountH
    }

    function createButtonAttributes(object) {
      const newToyButton = document.createElement('button')
      newToyButton.classList.add('like-btn')
      newToyButton.textContent = "Like <3"
      addButtonListener(newToyButton)
      return newToyButton
    }

    //Capture info from the new toy form
    toyForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const data = {
        name: event.target[0].value,
        image: event.target[1].value,
        likes: 0
      }
      createNewToy(data)
    })

    //Our post fetch to create a new toy
    function createNewToy(info) {
      const newToyForm = document.querySelector('.add-toy-form')
      fetch(toyURL,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(info)
      })
      .then(response => response.json())
      .then(json => {
        displayNewToy(json)
        newToyForm.reset()
      })
    }

    //Capture info from the like button
    function addButtonListener(button) {
      button.addEventListener('click', () => {
        const toyId = button.parentElement.id
        const likeCount = button.previousElementSibling.textContent
        likeToy(toyId, likeCount)
      })
    }

    // Our patch fetch to like a toy
    function likeToy(id, num) {
      fetch(`${toyURL}/${id}`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: parseInt(num) + 1})
      })
      .then(response => response.json())
      .then(json => {
        const updatedToy = document.getElementById(id)
        const likes = updatedToy.children[3]
        likes.textContent = json.likes
      })
    }
