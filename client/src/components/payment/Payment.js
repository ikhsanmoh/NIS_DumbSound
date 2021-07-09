import { useState } from 'react';
import { API } from '../../config/api'

import TrasparantHeader from '../base/TrasparantHeader';
import Button from '../button/Button'

import './Payment.css'

const Payment = () => {
  const [accountNumber, setAccountNumber] = useState('')
  const [attache, setAttache] = useState(null)

  const onSubmitHandler = async (e) => {
    try {
      // e.preventDefault()
      // if (isNaN(old)) return alert('Old input must contain number.')
      // const SUCCESS = 200
      // const config = {
      //   headers: {
      //     "Content-type": "application/json"
      //   }
      // }

      // const oldInt = +old
      // const body = JSON.stringify({
      //   name,
      //   old: oldInt,
      //   type,
      //   startCareer
      // })

      // const response = await API.post("/artist", body, config)

      // if (response.status === SUCCESS) {
      //   setName('')
      //   setOld('')
      //   setType('')
      //   setStartCareer('')

      //   alert('Artsit Added.')
      // }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }

  const handleUploadFileChanges = (e) => {
    const uploaded = e.target.files[0]
    setAttache(uploaded)
    // const uploadedPath = URL.createObjectURL(uploaded)
    // setImagePreview(uploadedPath)
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
