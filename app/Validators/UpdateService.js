'use strict'

class UpdateService {
  get rules () {
    return {
      name: 'max:128',
      icon: 'file|file_ext:png,jpg,svg|file_size:2mb|file_types:image',
      quantity: 'number',
      value: 'number'
    }
  }
}

module.exports = UpdateService
