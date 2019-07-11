'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.table('reservations', (table) => {
      table.timestamp('reservation').notNullable()
      table.timestamp('devolution').notNullable()
    })
  }

  down () {
    this.table('reservations', (table) => {
      table.date('reservation').notNullable()
      table.date('devolution').notNullable()
    })
  }
}

module.exports = ReservationSchema
