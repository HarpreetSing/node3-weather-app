const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//Setting path fors for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather app',
        name:'Harpreet Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        name:'Harpreet S.',
        title:'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        message:'This message is from the help page!',
        name:'H.S. Randhawa'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'Help - not found',
        name:'harpreet',
        message:'Help - Not Found!'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'No prodct found!'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error:'Please provide address!'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){return res.send({error})}

            res.send({
                forecast:forecastData,
                location:location,
            })
        })
    })    

})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Harpreet',
        message:'404 - Not Found!'
    })
})

app.listen(port, () => {
    console.log('Server is running at port '+ port +'!')
})