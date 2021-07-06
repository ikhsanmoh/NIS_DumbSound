import { useState } from 'react'
// import { API, setAuthToken } from '../../config/api'
import Modal from './Modal'
import Button from '../button/Button';

import './FormsModal.css'

const RegistrationModal = ({ switchModal, modalStat, modalClose }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    // try {
    //   e.preventDefault()

    //   const config = {
    //     headers: {
    //       "Content-type": "application/json"
    //     }
    //   }

    //   const body = JSON.stringify({
    //     email,
    //     username,
    //     password,
    //     fullName: name
    //   })

    //   const response = await API.post("/register", body, config)

    //   if (response.status === 200) {
    //     alert('Registration Success!')
    //   }

    //   setEmail('')
    //   setName('')
    //   setUsername('')
    //   setPassword('')

    //   modalClose()
    // } catch (error) {
    //   alert(error?.response?.data?.message)
    // }
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
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button text="Register" className="btn" />
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
