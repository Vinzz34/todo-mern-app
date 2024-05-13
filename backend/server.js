require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const todosRoutes = require('./routes/todosRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT,() => {
            console.log(`connected to database and listening on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())
app.use('/api/todos',todosRoutes);
app.use('/api/user',userRoutes);

