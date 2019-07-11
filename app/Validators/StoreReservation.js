'use strict'

class StoreReservation {
  get rules () {
    const id = this.ctx.params.id;

    return {
      reservation: `required|date|checkDatetimeFormat|checkDatetimeBefore:devolution,Reservation,${id}`,
      devolution: `required|date|checkDatetimeFormat|checkDatetimeAfter:reservation,Reservation,${id}`,
      reservation_place: 'required',
      devolution_place: 'required',
      status: 'required|in:PENDENTE,APROVADO,CANCELADO',
      client_id: 'required|integer|above:0',
      vehicle_id: 'required|integer|above:0'
    }
  }
}

module.exports = StoreReservation
