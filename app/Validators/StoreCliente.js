'use strict'

class StoreCliente {
  get rules () {
    return {
      name: 'required|max:128',
      email: 'required|email',
      phone: 'required',
      nationality: 'required|max:128',
      document: 'required|in:CPF,Passaporte,Estrangeiro',
      document_number: 'required'
    }
  }
}

module.exports = StoreCliente
