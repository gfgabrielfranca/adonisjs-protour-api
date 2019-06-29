'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehicleSchema extends Schema {
  up () {
    this.create('vehicles', (table) => {
      table.increments()
      table.string('photo', 64).unique()
      table.string('name', 128).notNullable()
      table.string('description', 255).nullable()
      table.boolean('status').notNullable().defaultTo(true)
      table.float('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vehicles')
  }
}

module.exports = VehicleSchema
