const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const usersRouter = require('./routes/users')
const sessionsRouter = require('./routes/sessions')
const postsRouter = require('./routes/posts')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/sessions', sessionsRouter)
app.use('/posts', postsRouter)

module.exports = app
