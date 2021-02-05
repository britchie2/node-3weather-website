const path = require ('path')
const express = require ('express')
const hbs = require ('hbs')
const { response } = require('express')

const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

var public_path = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set ('view engine','hbs')
app.set ('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory
app.use(express.static(public_path))

// match up to hbs file
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brooks'
    }) 
})

app.get ('/about', (req, res) => {
    res.render ('about', {
        title: 'About the stupid program',
        name: 'Tori Amos'
    })
})

app.get ('/help', (req, res) => {
    res.render ('help', {
        version: '1.0',
        author: 'Tori Amos',
        title: 'Help',
        name: 'brooks'
    })
})

app.get ('/weather', (req, res) => {
    if (!req.query.address)   {
        res.send(  {
            error: 'You failed to provide a search term'
        })
    }
    // else  {
    //     console.log(req.query.address)
    //     res.send ( {
    //         Time: '10:01 PST',
    //         Temperature: '99',
    //         Location: 'Headquarters ID',
    //         address: req.query.address
    //     })
    // }
    else  {
        geocode (req.query.address, (error, {latitude, longitude, location} ={}) => {
            if (error) return res.send ( {
                error: 'No address information provided'
            })
            else console.log ('DATA', latitude)
          //  const {latitude:lat, longitude:longt} = data
          //  lat = data.latitude;
          //  longt = data.longitude;      
            forecast(longitude, latitude, (error, data) => {        
                if (error) { 
                    console.log('Error', error)
                    return res.send ( {
                        error: 'Lookup failed for ' + req.query.address
                    })
                }
                else {
                    console.log('Data', data)
                    console.log ('Condition: ', data.Condition)
                    res.send ( {
                        text: data,
                        location: location,
                        condition: data.Condition,
                        temp: data.Temperature,
                        feels: data.RealFeel,
                        winds: data.Winds
                    })
                }
              })
        })
    }
    
})

app.get ('/products', (req, res) => {

    if (!req.query.search)   {
        res.send(  {
            error: 'You failed to provide a search term'
        })
    }
    else  {
        console.log(req.query.search)
        res.send (  {
        products: {}
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render ('err404', {
        errText: "Help article was not found. Stop guessing",
        title: 'Help Error Page',
        name: 'tori'
    })
})

app.get('*', (req, res) => {
    res.render ('err404', {
        errText: "No such page exists. Stop guessing",
        title: 'Help Error Page',
        name: 'tori'
    })
})


app.listen(port, () => {
    console.log('Server startup - on port #' + port)
})