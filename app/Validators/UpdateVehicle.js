'use strict'

class UpdateVehicle {
  get rules () {
    return {
      photo: 'file_ext:png,jpg|file_size:2mb|file_types:image',
      name: 'max:128',
      description: 'max:255',
      status: 'boolean',
      value: 'number'
    }
  }
}

module.exports = UpdateVehicle
