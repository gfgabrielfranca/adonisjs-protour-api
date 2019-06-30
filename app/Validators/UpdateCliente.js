'use strict'

class UpdateCliente {
  get rules () {
    return {
      name: 'max:128',
      email: 'email',
      nacionalidade: 'max:128',
      documento: 'in:CPF,Passaporte,Estrangeiro',
    }
  }
}

module.exports = UpdateCliente
