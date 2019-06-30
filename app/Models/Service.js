'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Service extends Model {
  getIcon () {
    return `${Env.get('APP_URL')}/services/icon/${this.icon}`
  }
}

module.exports = Service
