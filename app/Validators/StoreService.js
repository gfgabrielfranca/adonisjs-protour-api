'use strict'

class StoreService {
  get rules () {
    return {
      name: 'required|max:128',
      icon: 'required|file|file_ext:png,jpg,svg|file_size:2mb|file_types:image',
      quantity: 'required|number',
      value: 'required|number'
    }
  }
}

module.exports = StoreService
