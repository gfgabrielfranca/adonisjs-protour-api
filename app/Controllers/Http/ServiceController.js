'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const fs = require('fs')

const Service = use('App/Models/Service')
const Helpers = use('Helpers')

const removeFile = Helpers.promisify(fs.unlink)
const exists = Helpers.promisify(fs.stat)

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index ({ request }) {
    const page = request.get().page
    let services

    if (page != null) {
      services = await Service.query().paginate(page, 10)
    } else {
      services = await Service.all()
    }

    return services
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ request }) {
    const data = request.all()
    const icon = request.file('icon')

    const service = await Service.create(data)
    service.icon = `${service.id}.${icon.subtype}`
    await service.save()

    await icon.move(Helpers.tmpPath('uploads/services'), {
      name: service.icon
    })

    return service
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const service = await Service.find(params.id)

    if (!service) {
      return response.notFound()
    }

    return service
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const service = await Service.find(params.id)

    if (!service) {
      return response.notFound()
    }

    const data = request.all()
    data.icon = service.icon
    service.merge(data)

    const icon = request.file('icon')
    if (icon) {
      await removeFile(Helpers.tmpPath(`uploads/services/${service.icon}`))

      service.icon = `${service.id}.${icon.subtype}`

      await icon.move(Helpers.tmpPath('uploads/services'), {
        name: service.icon
      })
    }

    await service.save()

    return service
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const service = await Service.find(params.id)

    if (!service) {
      return response.notFound()
    }

    await removeFile(Helpers.tmpPath(`uploads/services/${service.icon}`))
    await service.delete()

    return response.ok()
  }

  /**
   * Show a service icon.
   * GET services/:path
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async icon ({ params, response }) {
    try {
      await exists(Helpers.tmpPath(`uploads/services/${params.path}`))
    } catch (error) {
      return response.notFound()
    }

    return response.download(Helpers.tmpPath(`uploads/services/${params.path}`))
  }
}

module.exports = ServiceController
