

console.log ('client side js file is loaded')

//will use fetch api (client side)
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)  => {
//         console.log (data)
//     } )

// } )

// try to fetech some weather info
// get some wether info
//console.log (url)
// fetch(url).then((response) => {
//     response.json().then((data)  => {
//         if (data.error)  {
//             console.log (data.error)
//         }
//         else  {
//             console.log(data.location)
//             console.log (data)
//         }
//     } )

// } )

const weatherForm = document.querySelector ('form')

const search = document.querySelector ('input')
const msg1 = document.querySelector ('#message-1')
const msg2 = document.querySelector ('#message-2')  // # for id selector

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    msg2.textContent = 'Loading content'
    msg1.textContent = ''
    // build the URL
    const url = 'http://localhost:3000/weather?address=' + location
    console.log (url)
    fetch(url).then((response) => {
            response.json().then((data)  => {
                if (data.error)  {
                    console.log (data.error)
                    mst1.textContent = data.error
                }
                else  {
                    console.log(data.location)                  
                   // Load some weather info
                   msg1.textContent = data.location
                   msg2.textContent = "Condition: " + data.condition + " Temp: " + data.temp + " Feels: " + data.feels
                }
            } )
        
        } )
})