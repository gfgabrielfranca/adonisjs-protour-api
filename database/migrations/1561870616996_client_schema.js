'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('name', 128).notNullable()
      table.string('email', 128).notNullable()
      table.string('phone').notNullable()
      table.string('nationality', 128).notNullable()
      table.enu('document', ['CPF', 'Passaporte', 'Estrangeiro']).notNullable()
      table.string('document_number').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
