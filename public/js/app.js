

console.log ('client side js file is loaded')



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
const msg3 = document.querySelector ('#message-3') // adding forecast info

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    msg2.textContent = 'Loading content'
    msg1.textContent = ''
    // build the URL
    const url = '/weather?address=' + location
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
                   msg3.textContent = "Wind Speed: " + data.winds
                }
            } )
        
        } )
})