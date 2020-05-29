// // Factory Function
// function personGenerator(name, catchPhrase){
//     return{
//         name:name,
//         catchPhrase:catchPhrase,
//         saySomething: function(){
//             console.log(`${catchPhrase}, My name is ${name}`)
//         }
//     }
// }
// people = []

// const alex = personGenerator("alex", "Howdy!!!")
// const biagio = personGenerator("Biagio", "JS is fun!")

// people.push(alex)
// people.push(biagio)

// constructor function
// Person.all = []
// function Person(name, catchPhrase){
//     this.name = name
//     this.catchPhrase = catchPhrase
//     Person.all.push(this)
// }

// Person.prototype.saySomething = function(){
//     console.log(`${this.catchPhrase}, My name is ${this.name}`)
// }

// // Person.all = []
// Person.allSpeak = function(){
//     for (const person of Person.all){
//         person.saySomething()
//     }
// }

// const alex = new Person("alex", "Howdy!!!")
// const biagio = new Person("Biagio", "JS is fun!")

// Person.prototype.hello = function(){
//     console.log(this)
// }

// Person.all.push(alex)
// Person.all.push(biagio)



class Person{
    static all = []

    constructor(name, catchPhrase){
        this.name = name
        this.catchPhrase = catchPhrase
        Person.all.push(this)
    }

    saySomething(){
        console.log(`${this.catchPhrase}, My name is ${this.name}`)
    }

    logThis(){
        console.log(this)
    }

    static allSpeak(){
        for (const person of Person.all){
            person.saySomething()
        }
    }
}


const alex = new Person("alex", "Howdy!!!")
const biagio = new Person("Biagio", "JS is fun!")

