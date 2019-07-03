const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const URL = "http://localhost:3000/toys"

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    const addToy = document.getElementsByClassName("add-toy-form")[0]
    console.log(addToy)

    addToy.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})
//or below here
const Url = "http://localhost:3000/toys"

 function getAllToys() {
	fetch(Url)
		.then(response => response.json())
		.then(json => displayAllToys(json));
}

 function displayAllToys(json) {
	json.forEach(toy => displayToy(toy));
}

 function displayToy(toy) {
	const toyCollection = document.getElementById("toy-collection");
	const toyDiv = document.createElement("div");
	const toyHeader = document.createElement("h2");
	const toyImg = document.createElement("img");
	const toyLikes = document.createElement("p");
	const toyLikesBtn = document.createElement("button");

 	toyDiv.className = "card";
	toyHeader.textContent = toy.name;
	toyDiv.id = toy.id;
	toyImg.className = "toy-avatar";
	toyImg.src = toy.image;
	toyLikes.textContent = toy.likes;
	toyLikesBtn.className = "like-btn";
	toyLikesBtn.textContent = "Like <3";

 	toyDiv.appendChild(toyHeader);
	toyDiv.appendChild(toyImg);
	toyDiv.appendChild(toyLikes);
	toyDiv.appendChild(toyLikesBtn);

 	toyCollection.appendChild(toyDiv);

 	toyLikesBtn.addEventListener("click", function(event) {
		clickLike(event.target);
	})
}

 function createNewToy() {
	const newToyForm = document.getElementsByClassName("add-toy-form");

 	newToyForm[0].addEventListener("submit", function(event) {
		event.preventDefault();
		sendNewToyData();
	});
}

 function sendNewToyData() {
	const newToyForm = document.getElementsByClassName("add-toy-form");
	const newToyName = newToyForm[0].elements.name.value;
	const newToyImg = newToyForm[0].elements.image.value;
	const newToyData = {
		name: newToyName,
		image: newToyImg,
		likes: "0"
	};

 	newToyForm[0].reset();

 	const newToyObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(newToyData)
	};

 	fetch(Url, newToyObj)
		.then(response => response.json())
		.then(json => displayToy(json));
}

 function clickLike(likeButton) {
	const toy = likeButton.parentElement;
	const toyId = toy.id;
	const currentLikes = toy.childNodes[2].textContent;
	const updatedLikes = (parseInt(currentLikes) + 1).toString();
	const toyURL = `http://localhost:3000/toys/${toyId}`;

 	const updatedLikeObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({likes: updatedLikes})
	}

 	fetch(toyURL, updatedLikeObj)
		.then(resp => resp.json())
		.then(json => {
			const updatedToy = document.getElementById(json.id);
			updatedToy.childNodes[2].textContent = json.likes;
		});
}

getAllToys();
createNewToy();
