const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todosRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()

const hbs = exphbs.create({
    /* config */
    defaultLayout: 'main',
    extname: 'hbs'
});

// Register `hbs.engine` with the Express app.
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'pages')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todosRoutes)


async function start() {
    try {
        await mongoose.connect('mongodb+srv://mamchurrr:1q2w3e4r5t@cluster0-a2nla.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server has been started on port: ', PORT);

        })
    } catch (err) {
        throw err
    }
}

start()