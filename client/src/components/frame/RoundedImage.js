
import './Frame.css'

const RoundedImage = ({ imageName, size, zoom, onClick }) => {
  const path = '/'
  const def = 'no-pict.jpg'
  let src = null
  if (imageName) {
    src = path + imageName
  } else {
    src = path + def
  }

  const img = {
    backgroundImage: `url(${src})`,
  }

  const sizes = {
    width: size,
    height: size,
    backgroundSize: zoom
  }

  return (
    <div className="rounded" style={sizes} onClick={onClick}>
      <div className="outline">
        <div className="image" style={img}></div>
      </div>
    </div>
  )
}

RoundedImage.defaultProps = {
  imageName: null,
  size: '100px',
  zoom: '120%',
  onClick: e => alert('Clicked')
}

export default RoundedImage
