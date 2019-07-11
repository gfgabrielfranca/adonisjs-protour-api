'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Vehicle extends Model {
  getPhoto () {
    return `${Env.get('APP_URL')}/vehicles/photo/${this.photo}`
  }
}

module.exports = Vehicle
