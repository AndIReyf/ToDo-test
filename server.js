const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

// Init Server
const app = express()

// Init Port
const PORT = process.env.PORT || config.get('PORT')

// Middleware
app.use(express.json())

app.use('/api/items', require('./routes/api/items'))

// Server static assets
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Start Server
;(async () => {
    try {
        // Connect to DB
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => console.log(`Server run on port:`, PORT))

    } catch (e) {
        console.log('Server error', e.message)
        // Stop all processes if something get wrong
        process.exit(1)
    }
})();
