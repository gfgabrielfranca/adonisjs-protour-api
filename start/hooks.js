const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const moment = use("moment")

  const checkDatetimeFormat = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    if (moment(value, "YYYY-MM-DD HH:mm:ss", true).isValid() === false) {
      throw message
    }
  }

  const checkDatetimeBefore = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const [ argfield, model, id ] = args

    let argValue = get(data, argfield)

    if (!argValue) {
      const Model = use(`App/Models/${model}`)
      argValue = await Model.find(id)
      argValue = argValue[argfield]
    }

    if (moment(value).isBefore(moment(argValue)) === false) {
      throw message;
    }
  }

  const checkDatetimeAfter = async (data, field, message, args, get) => {
    const value = get(data, field)

    if (!value) {
      return
    }

    const [ argfield, model, id ] = args

    let argValue = get(data, argfield)

    if (!argValue) {
      const Model = use(`App/Models/${model}`)
      argValue = await Model.find(id)
      argValue = argValue[argfield]
    }

    if (moment(value).isAfter(moment(argValue)) === false) {
      throw message;
    }
  }

  Validator.extend('checkDatetimeFormat', checkDatetimeFormat)
  Validator.extend('checkDatetimeBefore', checkDatetimeBefore)
  Validator.extend('checkDatetimeAfter', checkDatetimeAfter)
})
