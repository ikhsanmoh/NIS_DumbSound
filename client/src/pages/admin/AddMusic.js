import { useState, useContext } from 'react';
import { API } from '../../config/api'

import AdminHeader from '../../components/base/AdminHeader';
import Button from '../../components/button/Button'

import './AddMusic.css'

/**
 * TODO 1: Desing Add music display/form
 * TODO 2: Init state and function for add music
 * TODO 3: Set Up Model and API at the backend
 */

const AddMusic = () => {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [attache, setAttache] = useState('')
  const [artistId, setArtistId] = useState('')

  const onSubmitHandler = async (e) => {
    // try {
    //   e.preventDefault()
    //   if (isNaN(old)) return alert('Old input must contain number.')
    //   const SUCCESS = 200
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json"
    //     }
    //   }

    //   const oldInt = +old
    //   const body = JSON.stringify({
    //     name,
    //     old: oldInt,
    //     type,
    //     startCareer
    //   })

    //   const response = await API.post("/artist", body, config)

    //   if (response.status === SUCCESS) {
    //     setName('')
    //     setOld('')
    //     setType('')
    //     setStartCareer('')

    //     alert('Artsit Added.')
    //   }
    // } catch (error) {
    //   alert(error?.response?.data?.message)
    // }
  }

  const handleUploadFileImageChanges = (e) => {
    const uploaded = e.target.files[0]
    setThumbnail(uploaded)
    // const uploadedPath = URL.createObjectURL(uploaded)
    // setImagePreview(uploadedPath)
  }

  const handleUploadFileAudioChanges = (e) => {
    const uploaded = e.target.files[0]
    setAttache(uploaded)
    // const uploadedPath = URL.createObjectURL(uploaded)
    // setImagePreview(uploadedPath)
  }

  return (
    <div className='add-music'>
      <AdminHeader />
      <div className="form-wrapper">
        <div className="title">
          <h2>Add Music</h2>
        </div>

        <div className="form">
          <form onSubmit={onSubmitHandler}>
            <div className="input-group">
              <input
                className="title-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <div className="upload-btn-wrapper">
                <button className="btn btn-upload" disabled>Attache Thumbnail</button>
                <input
                  type="file"
                  name="image"
                  onChange={handleUploadFileImageChanges}
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Year"
              value={year}
              onChange={e => setYear(e.target.value)}
              required
            />
            <select
              onChange={e => setArtistId(e.target.value)}
              value={artistId}
            >
              <option value="">Singer</option>
              <option value="1">Coldplay</option>
              <option value="2">Ed Sheeran</option>
            </select>
            <div className="upload-btn-wrapper upload-attache-control">
              <button className="btn btn-upload" disabled>Attache</button>
              <input
                type="file"
                name="audio"
                onChange={handleUploadFileAudioChanges}
              />
            </div>
            <div className="submit">
              <Button text='Add Song' className="btn btn-submit" onClick={() => { }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddMusic
