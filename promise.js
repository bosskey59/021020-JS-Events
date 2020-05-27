done = true

const firstFunc = function(){
    return new Promise(function(resolve, reject){
        if (done){
            resolve("ASYNC JS is.....")
        }else{
            reject("Promise Failed")
        }
    })
}

const secondFunc = function(data){
    return new Promise(function(resolve, reject){
        resolve(data+"very useful but confusing at first!")
    })
}

function amazingFunc(){
    return "This Functions is doing a lot of cool stuff!"
}


// console.log("a")
// firstFunc()
// .then(data => secondFunc(data))
// .then(console.log)
// .catch(err => console.log(err))

async function myRequest(){
    const result = await firstFunc()
    console.log("testing")
    const fullResult = await secondFunc(result)
    console.log(fullResult)
}

const resp = myRequest()

// .catch(err => console.log(err))
amazingFunc()

