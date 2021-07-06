import './SongCard.css';

const SongCard = ({ image, title, year, artist, onClick }) => {
  return (
    <div className="song-card">
      <div className="block" onClick={onClick}></div>
      <div className="thumbnail">
        <img src={image} alt="" />
      </div>
      <div className="info">
        <div className="title">{title}</div>
        <div className="year">{year}</div>
      </div>
      <div className="artist">{artist}</div>
    </div>
  )
}

SongCard.defaultProps = {
  image: '/no-image.jpg',
  title: 'Unknown',
  year: 'Unknown',
  artist: 'Unknown',
  onClick: () => { alert('Card clicked') }
}

export default SongCard
