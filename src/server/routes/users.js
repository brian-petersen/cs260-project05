const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')

const knex = require('../services/knex')

const SALT_ROUNDS = 10

// router.get('/', async (req, res, next) => {
//   const data = await knex('users')
//     .select('id', 'username', 'created_at')

//   res.json(data)
// })

router.post('/', async (req, res, next) => {
  const { username, password } = req.body

  let data = await knex('users')
    .where({ username })
    .count()
  const count = parseInt(data[0].count)

  if (count > 0)
    res.sendStatus(400)

  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  data = await knex('users')
    .returning('id')
    .insert({
      username,
      hash,
    })
  const id = data[0]

  const session = uuid()
  await knex('sessions')
    .insert({ user_id: data.id, session })

  res.json({ session })
})

module.exports = router
