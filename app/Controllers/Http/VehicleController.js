'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Vehicle = use('App/Models/Vehicle')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with vehicles
 */
class VehicleController {
  /**
   * Show a list of all vehicles.
   * GET vehicles
   */
  async index () {
    const vehicles = await Vehicle.all()

    return vehicles
  }

  /**
   * Create/save a new vehicle.
   * POST vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all()
    const photo = request.file('photo')

    const vehicle = await Vehicle.create(data)
    vehicle.photo = `${vehicle.id}.${photo.subtype}`
    await vehicle.save()

    await photo.move(Helpers.tmpPath('uploads/veiculos'), {
      name: vehicle.photo
    })

    return vehicle
  }

  /**
   * Display a single vehicle.
   * GET vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update vehicle details.
   * PUT or PATCH vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a vehicle with id.
   * DELETE vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
   * Show a vehicle photo.
   * GET vehicles/:path
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async photo ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/veiculos/${params.path}`))
  }
}

module.exports = VehicleController
