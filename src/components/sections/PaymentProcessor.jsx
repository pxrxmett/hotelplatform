import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, Calendar } from 'lucide-react'

const PaymentProcessor = ({ amount, onPaymentComplete }) => {
  const navigate = useNavigate()
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear previous errors when user starts typing
    if (error) setError(null)
  }

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || ''
  }

  const processPayment = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Validate card details (basic validation)
      if (paymentDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Invalid card number')
      }

      const paymentResult = {
        transactionId: 'TX' + Date.now(),
        last4: paymentDetails.cardNumber.slice(-4),
        timestamp: new Date().toISOString()
      }

      // Call the onPaymentComplete callback if provided
      if (onPaymentComplete) {
        onPaymentComplete(paymentResult)
      }

      // Navigate to booking confirmation page
      navigate('/bookingconfirmation', { 
        state: { 
          bookingData: {
            paymentStatus: 'completed',
            transactionId: paymentResult.transactionId,
            cardLast4: paymentResult.last4,
            amount: amount,
            timestamp: paymentResult.timestamp,
            cardHolder: paymentDetails.cardHolder
          }
        }
      })

    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">Payment Details</h3>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={processPayment} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formatCardNumber(paymentDetails.cardNumber)}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '')
                if (value.length <= 16) {
                  handleInputChange({ target: { name: 'cardNumber', value } })
                }
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg"
              placeholder="1234 5678 9012 3456"
              required
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Holder Name
          </label>
          <input
            type="text"
            name="cardHolder"
            value={paymentDetails.cardHolder}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <div className="relative">
              <input
                type="text"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  if (value.length <= 4) {
                    const formatted = value.replace(/(\d{2})(\d{2})/, '$1/$2')
                    handleInputChange({ target: { name: 'expiryDate', value: formatted } })
                  }
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg"
                placeholder="MM/YY"
                required
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <div className="relative">
              <input
                type="password"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  if (value.length <= 3) {
                    handleInputChange({ target: { name: 'cvv', value } })
                  }
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg"
                placeholder="123"
                maxLength="3"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 
                   rounded-lg text-white transition-colors
                   ${isProcessing 
                     ? 'bg-gray-400 cursor-not-allowed' 
                     : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing...
            </>
          ) : (
            <>
              <Lock size={20} />
              Pay {amount}
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default PaymentProcessor