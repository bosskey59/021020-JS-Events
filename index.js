document.addEventListener("DOMContentLoaded",function(){
    loadPosts()
    mountFormListener()
    mountClickToListTitle()
    mountMouse()
    eventDelegation()
})

const formTitle = document.querySelector("#title")
const formAuthor = document.querySelector("#author")
const formContent = document.querySelector("#content")
const postForm = document.getElementById("blog-form")
const baseUrl = "http://localhost:3000/api/v1/blogs"

function likeFeature(){
    const likeButtons = document.querySelectorAll(".plus")
    
    for (likeButton of likeButtons){
        likeButton.addEventListener("click", sendLike)
    } 
}

async function sendLike(e){
    const blogId = e.target.parentElement.id
    let likes = parseInt(e.target.parentElement.querySelector(".likes").innerText)
    likes ++

    const postObj = {
        likes
    }
    
    const options = {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
        },
        body: JSON.stringify({blog:postObj}) // body data type must match "Content-Type" header
    }
    const url = `${baseUrl}/${blogId}`

    const resp = await fetch(url, options)
    const data = await resp.json()
    if (!data.errors){
        loadPosts()
    }else{
        throw new Error( `${data.errors}` )
    } 
}

function eventDelegation(){
    const postList = document.querySelector(".post-lists")
    postList.addEventListener("click",function(e){
        
        // if (e.target.className === "plus"){
        //     let likes = e.target.parentElement.querySelector(".likes").innerText
        //     // to be continued
        //     console.log("plus")
        // }else 
        if (e.target.className === "edit"){
            console.log("edit")
            // grab all the data from this card
            const [title, author, content] = e.target.parentElement.querySelectorAll("span")
            // populate the form with said values
            formTitle.value = title.innerText
            formAuthor.value = author.innerText
            formContent.value = content.innerText
            postForm.dataset.id = e.target.parentElement.id
            // make changes to form to indetify if its edit or delete mode
            document.querySelector(".btn").value = "Edit Post"
            postForm.dataset.action = "update"
            // change the type of fetch sent!
            // clean up
                // make sure to change data action to create
            
        }else if (e.target.className === "delete"){
            const Id = e.target.parentElement.id
            console.log("delete", Id)
            deleteBlog(Id)
        }
    })
}

function addPostsToDom(posts){
    document.querySelector(".post-lists").innerHTML = ""
    posts.forEach(function(post){
        renderPost(htmlifyPost(post))
    })
}

function loadPosts(){
    fetch('http://localhost:3000/api/v1/blogs')
    .then(resp => resp.json())
    .then(data =>{
        addPostsToDom(data)
    })
    .then(()=> likeFeature())
    
}

function getPostData(){
    return {
        title: formTitle.value,
        author: formAuthor.value,
        content: formContent.value
    }  
}

const htmlifyPost = function(post){
    return(`
    <div class="card"  >
        <div class="card-content" id="${post.id}">
          <span class="card-title">${post.title}</span>
          <p>By: <span> ${post.author}</span></p>
          <p><span> ${post.content}</span> </p>
          <p class="likes"> ${post.likes}</p>
          <button class="plus"> + </button>
          <button class="edit"> Edit </button>
          <button class="delete"> Delete </button>
        </div>
    </div>
    `
    )
}

function clearForm (){
    delete postForm.dataset.id
    postForm.dataset.action = "create"
    formTitle.value = ""
    formAuthor.value = ""
    formContent.value = ""
}

const renderPost = (post) => {
    const postList = document.querySelector(".post-lists")
    postList.innerHTML += post
}

async function deleteBlog(id){
    const resp = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
                }
    })
    const data = await resp.json()


    loadPosts()
}

function mountFormListener(){
    // identifying the element you want to target with your even listener
    // add event listener to dom element
    postForm.addEventListener("submit", function(event){
        event.preventDefault()
        // grab the text from each field
        const postObj = getPostData()
        let options
        let url
        if (postForm.dataset.action === "create"){
            options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
                },
                body: JSON.stringify({blog:postObj}) // body data type must match "Content-Type" header
            }
            url = baseUrl
            // send fetch request to handle making new BlogPost to API
            
        }else if (postForm.dataset.action === "update"){
            options = {
                method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
                },
                body: JSON.stringify({blog:postObj}) // body data type must match "Content-Type" header
            }
            url = `${baseUrl}/${postForm.dataset.id}`
        }

        // sendFetch(url,options)
        // .catch(err => alert(err))
        fetch(url,options)
            .then(resp => resp.json())
            .then((data) => {
                if (!data.errors){
                    loadPosts()
                    clearForm()
                }else{
                    throw new Error( `${data.errors}` )
                } 
                
                // const htmlPost = htmlifyPost(data)
                // // mount the new post to the DOM
                // renderPost(htmlPost)
                // debugger
                
            })
            .catch(alert)

        // create the HTML to display the new post
        // const htmlPost = htmlifyPost(postObj)
        // // // mount the new post to the DOM
        // renderPost(htmlPost)
        // clearForm(event)
    })
}
let index = 0
const colors = ["red", "green", "blue", "black"]
const maxIndex = colors.length

function colorChange(element){
    element.style.color = colors[index++]
    if (index === maxIndex){
        index = 0
    }
}

function mountClickToListTitle(){
    const listElement =  document.querySelector(".post-lists h3")
    listElement.addEventListener("click", function(e){
        colorChange(listElement)
    })
}

function mountMouse(){
    const header = document.querySelector("h1")
    header.addEventListener("mouseover", ()=>colorChange(header))
}


