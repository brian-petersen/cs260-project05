const express = require('express')
const router = express.Router()
const resolve = require('path').resolve
const uuid = require('uuid/v4')
const multer = require('multer')

const PATH = resolve(__dirname + '/../uploads/')

console.log(PATH)

const upload = multer({
  dest: PATH,
  limits: {
    fieldSize: 5 * 1024,
  }
})
const isAuthenticated = require('../services/utils').isAuthenticated
const knex = require('../services/knex')

router.get('/', async (req, res, next) => {
  const data = await knex('posts')
    .innerJoin('users', 'users.id', 'posts.user_id')
    .select(
      'posts.id',
      'posts.user_id',
      'posts.caption',
      'posts.created_at',
      'users.username'
    )

    res.json(data)
})

router.post('/', isAuthenticated, upload.single('image'), async (req, res, next) => {
  const userId = req.userId
  const { caption } = req.body

  if (!req.file) {
    res.sendStatus(400)

    return
  }

  const insertRes = await knex('posts')
    .insert({
      user_id: userId,
      caption: caption,
      image_name: req.file.filename,
      mimetype: req.file.mimetype
    }, 'id')

  const post = await knex('posts')
    .innerJoin('users', 'users.id', 'posts.user_id')
    .where('posts.id', insertRes[0])
    .select(
      'posts.id',
      'posts.user_id',
      'posts.caption',
      'posts.created_at',
      'users.username'
    )

  res.json(post)
})

router.get('/:id/image', async (req, res, next) => {
  const { id } = req.params

  const data = await knex('posts')
    .where('id', id)
    .first('image_name', 'mimetype')

  res.sendFile(`${PATH}/${data.image_name}`, {
    headers: {
      'Content-Type': data.mimetype
    }
  })
})

module.exports = router
