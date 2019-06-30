'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('name', 128).notNullable()
      table.string('icon').unique()
      table.integer('quantity').notNullable().unsigned()
      table.float('value').notNullable().unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
