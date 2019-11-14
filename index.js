document.addEventListener("DOMContentLoaded",function(){
    giveFormEvent()
    clickEvent()
    mouseOverEvent()
    buttonEvent()
})

function getFormData(){
    return{
        title: document.getElementById("title").value,
        author: document.getElementById("author").value, 
        content: document.getElementById("content").value 
    }
}

function postHtml(post){
    return `
    <div class="card">
        <div class="card-content">
            <span class="card-title">${post.title}</span>
            <p>By: ${post.author}</p>
            <p>${post.content}</p>
            <button class="colorButton">Change Background</button>
        </div>
    </div>
    `
}

const attachPost = function(post){
    document.querySelector(".post-lists").innerHTML += post
}

const clearForm = () =>{
    document.getElementById("title").value = ""
    document.getElementById("author").value = "" 
    document.getElementById("content").value = ""
}

function giveFormEvent(){
    const form = document.querySelector("#blog-form")
    // document.querySelector("#blog-form").addEventListener("submit", function(event){
    form.addEventListener("submit", function(event){
        event.preventDefault()
        // grab all necessary data off DOM and returns a object post
        const post = getFormData();
        // create html template for a list item
        const htmlPost = postHtml(post)
        // attach that new list item to DOM
        attachPost(htmlPost)
        // clear our user input fields
        clearForm();
    })
}

const colors = ["red", "green", "blue", "black"]
let index = 0
const maxIndex = colors.length

const changeColor = (title) => {   
    title.style.color = colors[index++]
    if(index == maxIndex){
        index = 0;
    }
}

function clickEvent(){
    const title = document.querySelector(".post-lists h3")
    title.addEventListener("click", function(){
        changeColor(title)
    })
}

function mouseOverEvent(){
    const header = document.querySelector("h1")
    header.addEventListener("mouseover",()=>changeColor(header))
}

function buttonEvent(){
    const allPosts = document.querySelector(".post-lists")
    const colors = ["red", "green", "blue", "black"]
    let index = 0
    const maxIndex = colors.length
    allPosts.addEventListener("click", function(e){
        if (e.target.className === "colorButton"){
            e.target.parentElement.parentElement.style.backgroundColor = colors[index++]
            if(index == maxIndex){
                index = 0;
            }
        }
    })
}

