const knex = require('./knex')

async function isAuthenticated(req, res, next) {
  const { auth } = req.headers

  if (!auth)
    return res.sendStatus(400)

  const data = await knex('sessions')
    .where({ session: auth })
    .first('user_id')

  if (!data)
    return res.sendStatus(400)

  req.userId = data.user_id

  next()
}

module.exports.isAuthenticated = isAuthenticated
