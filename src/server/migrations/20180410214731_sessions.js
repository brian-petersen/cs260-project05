exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', table => {
    table.increments('id')
    table.integer('user_id')
    table.string('session')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions')
}
