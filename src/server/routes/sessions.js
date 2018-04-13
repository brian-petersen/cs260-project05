const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')

const isAuthenticated = require('../services/utils').isAuthenticated
const knex = require('../services/knex')

router.post('/', async (req, res, next) => {
  const { username, password } = req.body

  const data = await knex('users')
    .where({ username })
    .first('id', 'hash')

  if (!data)
    res.sendStatus(400)

  const match = await bcrypt.compare(password, data.hash)

  if (!match)
    res.sendStatus(400)

  const session = uuid()

  await knex('sessions')
    .insert({ user_id: data.id, session })

  res.json({ session })
})

router.delete('/', isAuthenticated, async (req, res, next) => {
  const { auth } = req.headers

  await knex('sessions')
    .where({ user_id: req.userId, session: auth })
    .delete()

  res.sendStatus(200)
})

module.exports = router
