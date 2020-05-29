document.addEventListener("DOMContentLoaded",function(){
    Post.loadPosts()
    mountFormListener()
    // mountClickToListTitle()
    // mountMouse()
    eventDelegation()
})

const formTitle = document.querySelector("#title")
const formAuthor = document.querySelector("#author")
const formContent = document.querySelector("#content")
const postForm = document.getElementById("blog-form")
const postList = document.querySelector(".post-lists")

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
    API.patch(postObj, blogId)
}

function eventDelegation(){
    const postList = document.querySelector(".post-lists")
    postList.addEventListener("click",function(e){
        
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
            API.delete(Id)
        }
    })
}

function getPostData(){
    return {
        title: formTitle.value,
        author: formAuthor.value,
        content: formContent.value
    }  
}

function clearForm (){
    delete postForm.dataset.id
    postForm.dataset.action = "create"
    formTitle.value = ""
    formAuthor.value = ""
    formContent.value = ""
}

function mountFormListener(){
    // identifying the element you want to target with your even listener
    // add event listener to dom element
    postForm.addEventListener("submit", function(event){
        event.preventDefault()
        // grab the text from each field
        const postObj = getPostData()
        if (postForm.dataset.action === "create"){
            API.post(postObj)
        }else if (postForm.dataset.action === "update"){
            const Id = event.target.dataset.id
            API.patch(postObj, Id)
        }

    })
}



