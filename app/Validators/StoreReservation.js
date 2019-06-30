'use strict'

class StoreReservation {
  get rules () {
    let { devolution } = this.ctx.request.only(['devolution'])
    devolution = new Date(devolution)

    return {
      devolution: 'required|date|dateFormat:YYYY-MM-DD',
      reservation: `required|date|dateFormat:YYYY-MM-DD|before:${devolution.getFullYear()}-${devolution.getMonth() + 1}-${devolution.getDate() + 2}`,
      status: 'required|in:PENDENTE,APROVADO,CANCELADO',
      client_id: 'required|integer|above:0',
      vehicle_id: 'required|integer|above:0'
    }
  }
}

module.exports = StoreReservation
