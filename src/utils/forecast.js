const request = require('request')

const result = (long,lat, callback) => {
    const url = weatherUrl(long, lat)
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback(error,undefined)
            return
        }

        var temperature = body.currently.temperature
        const precipProbability = body.currently.precipProbability
        const daySummary = body.daily.data[0].summary
        callback(undefined,{
            current: "Det är "+temperature+" grader med en "+precipProbability+"% risk för regn",
            today: daySummary
        })
    })
}

const weatherUrl = (long,lat) => 'https://api.darksky.net/forecast/1ced12032bb226e6eb446551474aeaa2/'+long+','+lat+'?units=si&lang=sv'

module.exports = result