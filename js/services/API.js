class API {
    static baseUrl = "http://localhost:3000/api/v1/blogs"

    static options = {
        headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
        }
    }

    static get(){
        return(
        fetch('http://localhost:3000/api/v1/blogs')
        .then(resp => resp.json())
        )
    }

    static post(data){
        const options ={
            ...API.options,
            method: 'POST',
            body: JSON.stringify({blog:data})
        }

        fetch(API.baseUrl,options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                // create a new post
                new Post(data)
                // render all posts(make sure empty post list)
                Post.renderPosts()
                clearForm()
            }else{
                throw new Error( `${data.errors}` )
            } 
            
        })
        .catch(alert)
    }

    static delete(Id){
        const options ={
            ...API.options,
            method: 'DELETE'
        }
        const url = API.baseUrl + `/${Id}`

        fetch(url,options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                const index = Post.all.findIndex((post)=> post.id === data.id)
                Post.all.splice(index,1)
                Post.renderPosts()
                // filter through all posts and get rid of deleted
                // re render all posts
            }else{
                throw new Error( `${data.errors}` )
            } 
        })
        .catch(alert)
    }

    static patch(data, Id){
        const options ={
            ...API.options,
            method: 'PATCH',
            body: JSON.stringify({blog:data})
        }
        const url = API.baseUrl + `/${Id}`
        fetch(url,options)
        .then(resp => resp.json())
        .then((data) => {
            if (!data.errors){
                // create a new post
                // debugger
                const editedPosts  = Post.all.map(post =>{
                    if(post.id === data.id){
                        return new Post(data)
                    }else{
                        return post
                    }
                })
                Post.all = editedPosts
                Post.renderPosts()
            }else{
                throw new Error( `${data.errors}` )
            } 
            
        })
        .catch(alert)
    }

}