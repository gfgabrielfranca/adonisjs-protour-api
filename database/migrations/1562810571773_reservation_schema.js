'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.table('reservations', (table) => {
      table.timestamp('reservation').notNullable().alter()
      table.timestamp('devolution').notNullable().alter()
    })
  }

  down () {
    this.table('reservations', (table) => {
      table.date('reservation').notNullable().alter()
      table.date('devolution').notNullable().alter()
    })
  }
}

module.exports = ReservationSchema
