const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Exporess config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handelbars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static public path
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Me'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({ error: {
            code: 400,
            message: 'Required query parameter `address`'
        }})
    }

    geocode(req.query.address, (error, {name, long, lat} = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(long,lat, (error, {current, today}) => {
            if(error){
                return res.send({ error })
            }
            return res.send({
                forecast: {
                    now: current,
                    today
                },
                location: name
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        path: req.path,
        title: 'Help article is nowhere to be found',
        name: 'No one'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        path: req.path,
        title: 'Nowhere',
        name: 'No one'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})