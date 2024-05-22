const cron = require('node-cron')
const CartService = require('./cart.service')

class TasksService {
  start() {
    const timezones = [
      'America/New_York',
      'Europe/London',
      'Europe/Moscow',
      'Asia/Tokyo',
    ]

    timezones.forEach((timezone) => {
      cron.schedule(
        '0 0 * * *',
        async () => {
          console.log(
            '[CronJob]: The beginning of the task of removing old armor',
          )
          try {
            await CartService.releaseOldReservation()
          } catch (error) {
            console.error(`Error performing cron task in ${timezone}:`, error)
          }
        },
        {
          scheduled: true,
          timezone,
        },
      )
    })
  }
}
module.exports = new TasksService()
