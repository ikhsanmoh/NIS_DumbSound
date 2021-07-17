import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { API } from '../../config/api'

import Loading from '../spinner/Loading';
import TrasparantHeader from '../base/TrasparantHeader';

import './Payment.css'

const Payment = () => {
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')
  const [attache, setAttache] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (isNaN(accountNumber)) return alert('Account number should contains number!')
      if (attache === null) return alert('Input attache file first!')

      setIsLoading(true)
      const SUCCESS = 200

      const checkUserPayment = await API.get("/check-user-payment")

      if (checkUserPayment.status === SUCCESS && checkUserPayment.data.data !== null) {
        const subscriptionStatus = checkUserPayment.data.data.user.subscribe
        const paymentStatus = checkUserPayment.data.data.status

        if (subscriptionStatus === 'true') {
          setIsLoading(false)
          return alert('You already in the subscription!')
        }

        if (paymentStatus === 'Pending') {
          setIsLoading(false)
          return alert('You subscription is on proccess.')
        }
      }

      // Get Current Date
      const dateObj = new Date()
      const DAY = dateObj.getDate()
      const MONTH = dateObj.getMonth() + 1 // getMonth method is index based! (0-11), added 1 to get real month
      const YEAR = dateObj.getFullYear()

      // Prepare Post Data
      const CURRENT_DATE = `${DAY}/${MONTH}/${YEAR}`
      const STATUS = 'Pending'

      // Set form values
      const formData = new FormData()
      formData.set("startDate", CURRENT_DATE)
      formData.set("dueDate", CURRENT_DATE)
      formData.set("status", STATUS)
      formData.set("image", attache, attache.name)

      const config = {
        headers: { "Content-type": "multipart/form-data" }
      }

      const response = await API.post("/transaction", formData, config)

      setTimeout(() => {
        if (response.status === SUCCESS) {
          alert('Transaction Success.')
          setIsLoading(false)
          setAccountNumber('')
          setAttache(null)
          setImagePreview(null)
        }
      }, 2000)
    } catch (error) {
      alert(error?.response?.data?.message)
      setIsLoading(false)
    }
  }

  const handleUploadFileChanges = (e) => {
    const uploaded = e.target.files[0]
    const uploadedPath = URL.createObjectURL(uploaded)
    setImagePreview(uploadedPath)
    setAttache(uploaded)
  }

  return (
    <>
      <div className="payment">
        <TrasparantHeader />
        <div className="payment-body">
          <div className="title">
            <h1>Premium</h1>
          </div>
          <div className="message">
            Bayar sekarang dan nikmati streaming music yang kekinian dari <span className="dumbsound">
              <span className="orange-txt">DUMB</span>SOUND
            </span>
          </div>
          <div className="rekening">
            <span className="dumbsound">
              <span className="orange-txt">DUMB</span>SOUND:
            </span>
            0981312323
          </div>
          <div className="payment-form">
            <form onSubmit={onSubmitHandler}>
              <input
                type="text"
                placeholder="Input Your Account Number"
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                required
              />
              <div className="upload-btn-wrapper">
                <button className="btn flex attache-bill btn-upload" disabled>
                  <span>Attache proof of transfer</span>
                  <img src="/attache-bill.png" alt="..." />
                </button>
                <input
                  type="file"
                  name="image"
                  onChange={handleUploadFileChanges}
                />
              </div>
              {imagePreview !== null &&
                <div className='uploaded-file-preview'>
                  <img src={imagePreview} alt="..." />
                </div>}
              <button className="btn btn-submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="center">
                    <Loading type="bubbles" color='white' />
                  </div>
                ) : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
