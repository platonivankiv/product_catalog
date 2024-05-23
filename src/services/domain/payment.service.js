class PaymentService {
  async processPayment(userId) {
    console.log(`Start of payment processing for the user ${userId}`)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const paymentSuccessful = true

        if (paymentSuccessful) {
          resolve({ success: true, message: 'The payment was successful' })
        } else {
          reject(new Error('Payment failed'))
        }
      }, 2000)
    })
  }
}

module.exports = new PaymentService()
