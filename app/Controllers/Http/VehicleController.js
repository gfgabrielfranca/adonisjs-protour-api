'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const fs = require('fs')

const Vehicle = use('App/Models/Vehicle')
const Helpers = use('Helpers')
const Drive = use('Drive')

const removeFile = Helpers.promisify(fs.unlink)
const exists = Helpers.promisify(fs.stat)

/**
 * Resourceful controller for interacting with vehicles
 */
class VehicleController {
  /**
   * Show a list of all vehicles.
   * GET vehicles
   *
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const page = request.get().page
    let vehicles

    if (page != null) {
      vehicles = await Vehicle.query().paginate(page, 10)
    } else {
      vehicles = await Vehicle.all()
    }

    return vehicles
  }

  /**
   * Create/save a new vehicle.
   * POST vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ request }) {
    const data = request.all()
    const photo = request.file('photo')

    try {
      const ContentType = file.headers['content-type']
      const ACL = 'public-read'

      Vehicle.photo = await Drive.put(`${vehicle.id}.${photo.subtype}`, file.stream, {
        ContentType,
        ACL
      })
      await vehicle.save()

    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: "Não foi possível enviar o arquivo",
          error_message: error.message
        }
      })
    }

    const vehicle = await Vehicle.create(data)

    // await request.multipart.file('photo', {
    //   types: ['jpeg', 'jpg', 'png'],
    //   size: '2mb'
    // }, async (photo) => {
    //   try {
    //     const ContentType = file.headers['content-type']
    //     const ACL = 'public-read'

    //     Vehicle.photo = await Drive.put(`${vehicle.id}.${photo.subtype}`, file.stream, {
    //       ContentType,
    //       ACL
    //     })
    //     await vehicle.save()

    //   } catch (error) {
    //     return response.status(error.status).send({
    //       error: {
    //         message: "Não foi possível enviar o arquivo",
    //         error_message: error.message
    //       }
    //     })
    //   }
    // }).process()

    // await photo.move(Helpers.tmpPath('uploads/vehicles'), {
    //   name: vehicle.photo
    // })

    return vehicle
  }

  /**
   * Display a single vehicle.
   * GET vehicles/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const vehicle = await Vehicle.find(params.id)

    if (!vehicle) {
      return response.notFound()
    }

    return vehicle
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
    const vehicle = await Vehicle.find(params.id)

    if (!vehicle) {
      return response.notFound()
    }

    const data = request.all()
    data.photo = vehicle.photo
    vehicle.merge(data)

    const photo = request.file('photo')
    if (photo) {
      await removeFile(Helpers.tmpPath(`uploads/vehicles/${vehicle.photo}`))

      vehicle.photo = `${vehicle.id}.${photo.subtype}`

      await photo.move(Helpers.tmpPath('uploads/vehicles'), {
        name: vehicle.photo
      })
    }

    vehicle.save()

    return vehicle
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
    const vehicle = await Vehicle.find(params.id)

    if (!vehicle) {
      return response.notFound()
    }

    await vehicle.delete()
    await removeFile(Helpers.tmpPath(`uploads/vehicles/${vehicle.photo}`))

    return response.ok()
  }

  /**
   * Show a vehicle photo.
   * GET vehicles/:path
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async photo ({ params, response }) {
    try {
      await exists(Helpers.tmpPath(`uploads/vehicles/${params.path}`))
    } catch (error) {
      return response.notFound()
    }

    return response.download(Helpers.tmpPath(`uploads/vehicles/${params.path}`))
  }
}

module.exports = VehicleController
