'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Moment = use('Moment')

class Reservation extends Model {
  static get hidden () {
    return ['client_id', 'vehicle_id']
  }

  getReservation () {
    return Moment(this.reservation).format('YYYY-MM-DD HH:mm:ss')
  }

  getDevolution () {
    return Moment(this.devolution).format('YYYY-MM-DD HH:mm:ss')
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
