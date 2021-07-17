const { users: User, payments: Payment } = require('../../models')

/**
 * Check and updates user subscription by it's payment expiration/due date.
 * @async
 * @param {Integer} userId 
 * @returns {String} subscription status
 */
exports.checkUserSubscription = async (userId) => {
  let subscription = 'false'

  const userLatestPayment = await Payment.findOne({
    include: {
      model: User,
      as: 'user',
      attributes: {
        exclude: ['password', 'listAs', 'createdAt', 'updatedAt']
      },
      where: { id: userId }
    },
    attributes: {
      exclude: ['userId', 'createdAt', 'updatedAt']
    },
    order: [['dueDate', 'ASC']],
    limit: 1
  })

  if (userLatestPayment) {
    const parseJSON = JSON.parse(JSON.stringify(userLatestPayment))

    let currentDate = new Date() // init current date
    let dueDate = parseJSON.dueDate
    dueDate = dueDate.split('/') // split date by / to get day, month, year as array
    dueDate = `${dueDate[1]}/${dueDate[0]}/${dueDate[2]}` // reform date to valid js date format
    dueDate = new Date(dueDate) // init expiration/due date

    // Calculate time difference
    const DIFF_IN_TIME = dueDate.getTime() - currentDate.getTime()
    // Calclulate day difference
    const DIFF_IN_DAYS = DIFF_IN_TIME / (1000 * 3600 * 24)

    // Chek if user still not reach the payment expiration/due date
    if (DIFF_IN_DAYS >= 0) subscription = 'true'
  }
  return subscription
}