'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('name', 128).notNullable()
      table.string('email', 128).notNullable()
      table.string('telefone').notNullable()
      table.string('nacionalidade', 128).notNullable()
      table.enu('documento', ['CPF', 'Passaporte', 'Estrangeiro']).notNullable()
      table.string('numero_documento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
