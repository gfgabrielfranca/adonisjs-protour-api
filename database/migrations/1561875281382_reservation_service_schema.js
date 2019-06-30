'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationServiceSchema extends Schema {
  up () {
    this.create('reservation_service', (table) => {
      table.increments()
      table
        .integer('reservation_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('reservations')
        .onDelete('CASCADE')
      table
        .integer('service_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('services')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('reservation_service')
  }
}

module.exports = ReservationServiceSchema
