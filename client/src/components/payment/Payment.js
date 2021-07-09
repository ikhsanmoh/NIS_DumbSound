import { useState } from 'react';
import { API } from '../../config/api'

import TrasparantHeader from '../base/TrasparantHeader';
import Button from '../button/Button'

import './Payment.css'

const Payment = () => {
  const [accountNumber, setAccountNumber] = useState('')
  const [attache, setAttache] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (isNaN(accountNumber)) return alert('Account number should contains number!')
      if (attache === null) return alert('Input attache file first!')
      const SUCCESS = 200

      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }

      // Set Req body
      const dateObj = new Date()
      const CURRENT_DATE = `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
      const STATUS = 'Pending'

      const formData = new FormData()
      formData.set("startDate", CURRENT_DATE)
      formData.set("dueDate", CURRENT_DATE)
      formData.set("status", STATUS)
      formData.set("image", attache, attache.name)

      const response = await API.post("/transaction", formData, config)

      if (response.status === SUCCESS) {
        alert('Transaction Success.')
        setAccountNumber('')
        setAttache(null)
        setImagePreview(null)
      }
    } catch (error) {
      alert(error?.response?.data?.message)
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
                <button className="btn btn-upload" disabled>Attache proof of transfer</button>
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
              <div className="submit">
                <Button text='Send' className="btn btn-submit" onClick={() => { }} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
