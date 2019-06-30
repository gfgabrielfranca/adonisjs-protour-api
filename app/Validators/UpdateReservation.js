'use strict'

class UpdateReservation {
  get rules () {
    let { devolution } = this.ctx.request.only(['devolution'])
    devolution = new Date(devolution)

    return {
      devolution: 'date|dateFormat:YYYY-MM-DD',
      reservation: `date|dateFormat:YYYY-MM-DD|before:${devolution.getFullYear()}-${devolution.getMonth() + 1}-${devolution.getDate() + 2}`,
      status: 'in:PENDENTE,APROVADO,CANCELADO',
      client_id: 'integer|above:0',
      vehicle_id: 'integer|above:1'
    }
  }
}

module.exports = UpdateReservation
