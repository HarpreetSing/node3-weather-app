const request = require('request')

const forecast = (lat,long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=235959edb7344b3612217c3191b6cd31&query=' + lat + ',' + long + '&units=m'

    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error || !body.location.name){
            callback('Unable to find location!',undefined)
        }
        
        else{
            const data = body.current
            callback(undefined,data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. ' + ' It feels like ' + data.feelslike + '  degrees out.')
        }
    })

}

module.exports = forecast