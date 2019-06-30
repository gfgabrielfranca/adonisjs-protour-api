'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reservation extends Model {
  static get hidden () {
    return ['client_id', 'vehicle_id']
  }

  clients () {
    return this.belongsTo('App/Models/Client')
  }

  vehicles () {
    return this.belongsTo('App/Models/Vehicle')
  }

  services () {
    return this.belongsToMany('App/Models/Service')
  }
}

module.exports = Reservation
