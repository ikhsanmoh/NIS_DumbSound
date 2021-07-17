import { useState, useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { API, setAuthToken } from '../../config/api'

import { Alert, AlertTitle } from '@material-ui/lab';

import Loading from '../spinner/Loading';
import Modal from './Modal';

import './FormsModal.css'

const LoginModal = ({ switchModal, modalStat, modalClose }) => {
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        email,
        password
      })

      const response = await API.post("/login", body, config)

      setTimeout(() => {
        if (response.status === 200) {
          setEmail('')
          setPassword('')

          setIsLoading(false)
          modalClose()

          setAuthToken(response.data.data.user.token)
          dispatch({
            type: 'LOGIN',
            payload: response.data.data.user
          })
        }
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      setAlert(
        <Alert style={{ textAlign: 'left' }} severity="error">
          <AlertTitle>Login failed!</AlertTitle>
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
          <h1>Login</h1>
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
            <button className="btn" disabled={isLoading}>
              {isLoading ? (
                <div className="center">
                  <Loading type="bubbles" color='white' />
                </div>
              ) : "Login"}
            </button>
          </form>
          <p>
            Don't have an account ? Klik
            <b>
              <a
                id='regist'
                href='?'
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

LoginModal.defaultProps = {
  modalStat: false,
  switchModal: () => console.log('The switchModal method hasnt defined yet'),
}

export default LoginModal
