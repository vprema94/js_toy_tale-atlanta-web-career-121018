document.addEventListener("DOMContentLoaded", setupPage)
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false 
let toyContainer = document.querySelector("#toy-collection")


function setupPage() {
  addFormHandler()
  renderAllToys()
} 

function addFormHandler() {
  addBtn.addEventListener('click', () => { 
    toyForm.addEventListener('submit', newToy)
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  }) 
}  

function newToy (event) {
  event.preventDefault();
  let name = event.target.name.value
  let image = event.target.image.value
  createToy(name, image,).then(renderToy)
  event.target.reset()
}  

function createToy(name, image, likes) {
  return fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
      })
  }).then(function (response) {
      return response.json()
  })
} 

function renderAllToys() { 
  toyContainer.textContent = "" 
  getToy().then(function (data) {
      data.forEach(renderToy)
  })
}  

function getToy() { 
  let url = `http://localhost:3000/toys`;
  return fetch(url).then(res => res.json())
  // .catch((error)=> console.log(error)) //can be used to debug
}  

function renderToy(toy) {
  let element = toyView(toy)
  toyContainer.appendChild(element)
}  

function toyView(toy) {
  let element = document.createElement('div')
  element.className = 'card' 
  element.dataset.id = toy.id
      let toyName = document.createElement('h2')
      toyName.textContent = toy.name
      element.appendChild(toyName) 

      let toyImg = document.createElement('img')
      toyImg.src = toy.image
      toyImg.className = 'toy-avatar'
      element.appendChild(toyImg)

      let toyLikes = document.createElement('p')
      toyLikes.textContent = toy.likes + " Likes"
      element.appendChild(toyLikes) 

      let likebtn = document.createElement('button') 
      likebtn.className = 'like-btn'
      likebtn.textContent = "Like <3"
      likebtn.addEventListener('click', addLike)
      element.appendChild(likebtn)
  return element
} 

function addLike() {
  // debugger
  let likes = parseInt(event.target.parentElement.querySelector('p').textContent)
  let id = event.target.parentElement.dataset.id
  likes++ 
  event.target.parentElement.querySelector('p').textContent = likes + " Likes"
  updateToy(likes, id)
} 

function updateToy(newlikes, id) {
  return fetch(`http://localhost:3000/toys/:${id}`,{
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }, 
    body: JSON.stringify({
      likes: newlikes
    })
  })     
}

