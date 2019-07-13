'use strict'

class UpdateCliente {
  get rules () {
    return {
      name: 'max:128',
      email: 'email',
      nationality: 'max:128',
      document: 'in:CPF,Passaporte,Estrangeiro',
    }
  }
}

module.exports = UpdateCliente
