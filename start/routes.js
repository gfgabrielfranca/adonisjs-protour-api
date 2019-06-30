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

Route.resource('vehicle', 'VehicleController')
  .apiOnly()
  .validator(new Map([
    [['vehicle.store'], ['StoreVehicle']],
    [['vehicle.update'], ['UpdateVehicle']]
  ]))

Route.get('vehicle/photo/:path', 'VehicleController.photo').as('vehicle.photo')

Route.any('*', ({ response }) => {
  response.notFound()
}).as('all')
