'use strict'

class StoreCliente {
  get rules () {
    return {
      name: 'required|max:128',
      email: 'required|email',
      telefone: 'required',
      nacionalidade: 'required|max:128',
      documento: 'required|in:CPF,Passaporte,Estrangeiro',
      numero_documento: 'required'
    }
  }
}

module.exports = StoreCliente
