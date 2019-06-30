'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Client = use('App/Models/Client')

/**
 * Resourceful controller for interacting with clients
 */
class ClientController {
  /**
   * Show a list of all clients.
   * GET clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request }) {
    const page = request.get().page
    let clients

    if (page != null) {
      clients = await Client.query().paginate(page, 2)
    } else {
      clients = await Client.all()
    }

    return clients
  }

  /**
   * Create/save a new client.
   * POST clients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ request }) {
    const data = request.all()

    const client = await Client.create(data)

    return client
  }

  /**
   * Display a single client.
   * GET clients/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.notFound()
    }

    return client
  }

  /**
   * Update client details.
   * PUT or PATCH clients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.notFound()
    }

    const data = request.all()

    client.merge(data)
    client.save()

    return client
  }

  /**
   * Delete a client with id.
   * DELETE clients/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.notFound()
    }

    await client.delete()

    return response.ok()
  }
}

module.exports = ClientController
