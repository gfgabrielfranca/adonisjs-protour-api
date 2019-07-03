'use strict'

class UpdateReservation {
  get rules () {
    const id = this.ctx.params.id;

    return {
      reservation: `date|checkDatetimeFormat|checkDatetimeBefore:devolution,Reservation,${id}`,
      devolution: `date|checkDatetimeFormat|checkDatetimeAfter:reservation,Reservation,${id}`,
      status: 'in:PENDENTE,APROVADO,CANCELADO',
      client_id: 'integer|above:0',
      vehicle_id: 'integer|above:0'
    }
  }
}

module.exports = UpdateReservation
