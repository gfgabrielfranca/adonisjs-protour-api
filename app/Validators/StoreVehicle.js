'use strict'

class StoreVehicle {
  get rules () {
    return {
      photo: 'required|file|file_ext:png,jpg|file_types:image',
      name: 'required|max:128',
      description: 'max:255',
      status: 'boolean',
      value: 'required|number'
    }
  }
}

module.exports = StoreVehicle
