const request = require('request')

const result = (adress, callback) => {
    request({
        url: geocodeUrl(adress),
        json: true
    }, (error, {body}) => {
        if(error){
            callback(error,undefined)
            return
        }

        if(body.features.length === 0){
            callback({
                code: 404,
                message: 'Not Found'
            },undefined)
            return
        }

        var place = body.features[0]
        callback(undefined, {
            name: place.text,
            long: place.center[0],
            lat: place.center[1]
        })
    })
}

const geocodeUrl = (address) => 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1Ijoia2FybHNzb25hbm5hYW5rYSIsImEiOiJjanllZTBrMTYxMWkyM2hsZ2VhMncwbHZiIn0.lp1mhGGh0xKfxsfzxVufyw'

module.exports = result