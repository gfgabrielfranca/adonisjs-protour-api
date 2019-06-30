'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const Env = use('Env')

Route.get('/', ({ response }) => {
  response.ok(Env.get('APP_NAME', 'APP'))
}).as('app')

Route.resource('vehicles', 'VehicleController')
  .apiOnly()
  .validator(new Map([
    [['vehicles.store'], ['StoreVehicle']],
    [['vehicles.update'], ['UpdateVehicle']]
  ]))

Route.get('vehicles/photo/:path', 'VehicleController.photo').as('vehicles.photo')

Route.resource('services', 'ServiceController')
  .apiOnly()
  .validator(new Map([
    [['services.store'], ['StoreService']],
    [['services.update'], ['UpdateService']]
  ]))

Route.get('services/icon/:path', 'ServiceController.icon').as('services.icon')

Route.resource('clientes', 'ClientController')
  .apiOnly()
  .validator(new Map([
    [['clientes.store'], ['StoreCliente']],
    [['clientes.update'], ['UpdateCliente']]
  ]))

Route.any('*', ({ response }) => {
  response.notFound()
}).as('all')
