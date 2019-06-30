const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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

const Url = "http://localhost:3000/toys"

function main() {
	getAllToys();
	createNewToy();
}

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
	const toyDivName = document.createElement("h2");
	const toyDivImg = document.createElement("img");
	const toyDivLikes = document.createElement("p");
	const toyDivLikeButton = document.createElement("button");
			
	toyDiv.className = "card";
	toyDivName.textContent = toy.name;
	toyDiv.id = toy.id;
	toyDivImg.className = "toy-avatar";
	toyDivImg.src = toy.image;
	toyDivLikes.textContent = toy.likes;
	toyDivLikeButton.className = "like-btn";
	toyDivLikeButton.textContent = "Like <3";
			
	toyDiv.appendChild(toyDivName);
	toyDiv.appendChild(toyDivImg);
	toyDiv.appendChild(toyDivLikes);
	toyDiv.appendChild(toyDivLikeButton);
	
	toyCollection.appendChild(toyDiv);
	
	toyDivLikeButton.addEventListener("click", function(event) {
		handleLike(event.target);
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

function handleLike(likeButton) {
	const toy = likeButton.parentElement;
	const toyId = toy.id;
	const currentLikes = toy.childNodes[2].textContent;
	const updatedLikes = (parseInt(currentLikes) + 1).toString();
	const toyUrl = `http://localhost:3000/toys/${toyId}`;
	
	const updatedLikeObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({likes: updatedLikes})
	}

	fetch(toyUrl, updatedLikeObj)
		.then(response => response.json())
		.then(json => {
			const updatedToy = document.getElementById(json.id);
			updatedToy.childNodes[2].textContent = json.likes;
		});
}

main();