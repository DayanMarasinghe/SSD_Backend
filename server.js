require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to DB.."))

app.use(express.json())

//setting routes
const userRouter = require('./routes/users')
app.use('/users', userRouter)

const messageRouter = require('./routes/messages')
app.use('/messages', messageRouter)

const fileRouter = require('./routes/files')
app.use('/files', fileRouter)

app.listen(3000, () => console.log('Server Started on port 3000'))