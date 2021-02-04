const request = require ('request')

const forecast = (lat, longt, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=aca9e69ad98f4e41675f20d5ee2ac9f6&query='+ lat + ',' + longt + '&units=f'
    request (
    { url, json: true}, (error, {body}) => {
        if (error)  {
            callback('Unable to connect to forecasting services!', undefined)
        }
        else if (body.error)  {
            callback('Location cannot be found', undefined)
        }
        else  {
            callback (undefined,  {
                Condition: body.current.weather_descriptions[0],
                Temperature: body.current.temperature,
                RealFeel: body.current.feelslike
            } )
            // console.log("Current weather information")
            // console.log("---------------------------")    
            // console.log('Condition: ' + response.body.current.weather_descriptions[0])    
            // console.log("Temperature: " + response.body.current.temperature)
            // console.log('Real Feel:  ' + response.body.current.feelslike)  
        }      
    }
)
}

module.exports = forecast