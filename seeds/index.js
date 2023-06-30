const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useNewUrlParser : true,
    // useCreateIndex : true,
    useUnifiedtopology : true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i=0; i<300 ; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground ({
            author : '6471ff445a65a50fb29d4af7',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quis suscipit animi, laborum facilis sint ipsum nemo aperiam et perspiciatis natus, voluptate totam atque dignissimos quos, id beatae ratione laboriosam.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images : [
                {
                  url: 'https://res.cloudinary.com/dnzme7fzd/image/upload/v1685900929/YelpCamp/yp6pfylfopab25q75ds8.jpg',
                  filename: 'YelpCamp/yp6pfylfopab25q75ds8',
                },
                {
                  url: 'https://res.cloudinary.com/dnzme7fzd/image/upload/v1685900936/YelpCamp/qbb1xn3kxvcbz0kzffm7.jpg',
                  filename: 'YelpCamp/qbb1xn3kxvcbz0kzffm7',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})