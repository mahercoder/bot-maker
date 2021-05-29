// function getTime(){
//     const newDate = new Date()
//     let seconds = newDate.getSeconds()
//     let minutes = newDate.getMinutes()
//     let hour    = newDate.getHours()

//     if(seconds < 10) seconds=`0`+seconds
//     if(minutes < 10) minutes=`0`+minutes
//     if(hour    < 10) hour=`0`+hour
  
//     return `${hour}:${minutes}:${seconds}`
// }

// function getDate(){
//     const newDate = new Date()
//     let day = newDate.getDate()
//     let month = newDate.getMonth()+1
//     let year = newDate.getFullYear()
  
//     if(day < 10) day=`0`+day
//     if(month < 10) month=`0`+month
//     if(year < 10) year=`0`+year
  
//     return `${day}.${month}.${year}`
//   }

// console.log(
//     getDate()
// )

const NodeCache = require( "node-cache" );
const myCache1 = new NodeCache();
const myCache2 = new NodeCache();

const obj = { my: "Special", variable: 42 };
const obj2 = { my: "other special", variable: 1337 };
 
const objects = [
    {id: 96796718, name: 'Mohirbek', surname: 'Odiljonov'},
    {id: 96796758, name: 'Hojiakbar', surname: 'Kamoliddinov'},
    {id: 96796728, name: 'Sohibjon', surname: 'Qayumov'}
]

let arr = []

for(let i=0; i < objects.length; i++){
    const obj = objects[i]
    arr.push({
        key: obj.id,
        val: obj
    })
}

myCache2.mset(arr)
myCache1.mset(arr)

console.log(
    myCache2.mget()
)