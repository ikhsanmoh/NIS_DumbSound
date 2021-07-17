import { useState } from 'react'
import { API } from '../../config/api'

import { Alert, AlertTitle } from '@material-ui/lab';

import Loading from '../spinner/Loading';
import Modal from './Modal'

import './FormsModal.css'

const RegistrationModal = ({ switchModal, modalStat, modalClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(false)
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
      setIsLoading(true)

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
      setTimeout(() => {
        if (response.status === 200) {
          setIsLoading(false)

          // Clear Form
          setName('')
          setEmail('')
          setPassword('')
          setAddress('')
          setListAs('')
          setGender('')
          setPhone('')
          setAddress('')

          modalClose()
        }
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      setAlert(
        <Alert style={{ textAlign: 'left' }} severity="error">
          <AlertTitle>Registration failed!</AlertTitle>
          {error?.response?.data?.message || 'Something went wrong!'}
        </Alert>
      )
      setTimeout(() => setAlert(false), 3000)
    }
  }

  return (
    <>
      <Modal modalStat={modalStat} modalClose={modalClose}>
        <div className="form-modal">
          <h1>Registration</h1>
          {alert && alert}
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
            <button className="btn" disabled={isLoading}>
              {isLoading ? (
                <div className="center">
                  <Loading type="bubbles" color='white' />
                </div>
              ) : "Register"}
            </button>
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
