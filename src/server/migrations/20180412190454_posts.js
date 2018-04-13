exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.increments('id')
    table.integer('user_id')
    table.string('caption', 1000)
    table.string('image_name')
    table.string('mimetype')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}
