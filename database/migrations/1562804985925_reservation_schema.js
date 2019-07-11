'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.table('reservations', (table) => {
      table.string('reservation_place').notNullable()
      table.string('devolution_place').notNullable()
    })
  }

  down () {
    this.table('update_reservations', (table) => {
      table.dropColumn('reservation_place')
      table.dropColumn('reservation_place')
    })
  }
}

module.exports = ReservationSchema
