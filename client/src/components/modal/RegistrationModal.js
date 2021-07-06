import { useState } from 'react'
import { API, setAuthToken } from '../../config/api'
import Modal from './Modal'
import Button from '../button/Button';

import './FormsModal.css'

const RegistrationModal = ({ switchModal, modalStat, modalClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [listAs, setListAs] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const body = JSON.stringify({
        fullName: name,
        email,
        password,
        listAs: '0',
        gender,
        phone,
        address
      })

      const response = await API.post("/register", body, config)

      if (response.status === 200) {
        alert('Registration Success!')
      }

      setName('')
      setEmail('')
      setPassword('')
      setAddress('')
      setListAs('')
      setGender('')
      setPhone('')
      setAddress('')

      modalClose()
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }

  return (
    <>
      <Modal modalStat={modalStat} modalClose={modalClose}>
        <div className="form-modal">
          <h1>Registration</h1>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <select
              onChange={e => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <Button text="Register" className="btn" onClick={false} />
          </form>
          <p>
            Already have an account ? Klik
            <b>
              <a
                id='login'
                href="?"
                onClick={(e) => {
                  e.preventDefault()
                  switchModal(e.target.id)
                }}
              > Here
              </a>
            </b>
          </p>
        </div>
      </Modal>
    </>
  )
}

export default RegistrationModal
