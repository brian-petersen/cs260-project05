const shared = {
  client: 'postgresql',
  connection: {
    database: 'picshare',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations'
  },
}

module.exports = {
  development: shared,
  production: shared,
}
