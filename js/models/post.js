class Post {
    static all = []
    
    constructor({id, title, author, content, likes}){
        this.id = id
        this.title = title
        this.author= author
        this.content = content
        this.likes = likes
        Post.all.push(this)
    }

    htmlifyPost(){
        return(`
        <div class="card"  >
            <div class="card-content" id="${this.id}">
              <span class="card-title">${this.title}</span>
              <p>By: <span> ${this.author}</span></p>
              <p><span> ${this.content}</span> </p>
              <p class="likes"> ${this.likes}</p>
              <button class="plus"> + </button>
              <button class="edit"> Edit </button>
              <button class="delete"> Delete </button>
            </div>
        </div>
        `
        )
    }

    renderPost(){
        postList.innerHTML += this.htmlifyPost()
    }

    static renderPosts(){
        postList.innerHTML = ""
        Post.all.forEach(post => post.renderPost())
        likeFeature()
    }


    static loadPosts(){
        // send request and then go ahead and create all blogs from data
        API.get() // this will create all blogs
        .then(posts =>{
            posts.forEach(post => new Post(post))
            Post.renderPosts()
        }) //render all blogs
    }
}