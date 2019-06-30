'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Reservation = use('App/Models/Reservation')
const Client = use('App/Models/Client')
const Vehicle = use('App/Models/Vehicle')

/**
 * Resourceful controller for interacting with reservations
 */
class ReservationController {
  /**
   * Show a list of all reservations.
   * GET reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const page = request.get().page
    let reservations

    if (page != null) {
      reservations = await Reservation.query().with('services').with('vehicles').with('clients').paginate(page, 2)
    } else {
      reservations = await Reservation.query().with('services').with('vehicles').with('clients').fetch()
    }

    return reservations
  }

  /**
   * Create/save a new reservation.
   * POST reservations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const {services, ...data} = request.all()

    let reservation
    try {
      reservation = await Reservation.create(data)
    } catch (error) {
      if (error.code && error.code == 23503) {
        return response.notFound({error: error.detail})
      }
    }

    if (services && services.length > 0) {
      try {
        await reservation.services().attach(services)
      } catch (error) {
        if (error.code && error.code == 23503) {
          return response.notFound({error: error.detail})
        }
      }

      await reservation.load('services')
      await reservation.load('vehicles')
      await reservation.load('clients')
    }

    return reservation
  }

  /**
   * Display a single reservation.
   * GET reservations/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const reservation = await Reservation.find(params.id)

    if (!reservation) {
      return response.notFound()
    }

    await reservation.load('services')
    await reservation.load('vehicles')
    await reservation.load('clients')

    return reservation
  }

  /**
   * Update reservation details.
   * PUT or PATCH reservations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const reservation = await Reservation.find(params.id)

    if (!reservation) {
      return response.notFound()
    }

    const {services, ...data} = request.all()

    const vehicle = await Vehicle.find(data.vehicle_id)
    if (!vehicle) {
      return response.notFound({error:'vehicle not found'})
    }

    const client = await Client.find(data.client_id)
    if (!client) {
      return response.notFound({error:'client not found'})
    }

    reservation.merge(data)
    await reservation.save()

    if (services && services.length > 0) {
      try {
        await reservation.services().sync(services)
      } catch (error) {
        if (error.code && error.code == 23503) {
          return response.notFound({error: error.detail})
        }
      }

      await reservation.load('services')
      await reservation.load('vehicles')
      await reservation.load('clients')
    }

    return reservation
  }

  /**
   * Delete a reservation with id.
   * DELETE reservations/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const reservation = await Reservation.find(params.id)

    if (!reservation) {
      return response.notFound()
    }

    await reservation.delete()

    return response.ok()
  }
}

module.exports = ReservationController
