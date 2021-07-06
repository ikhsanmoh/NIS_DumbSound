import SongCard from '../card/SongCard';

import './Main.css';

const Main = ({ openMusicPlayer }) => {
  return (
    <main className="main">
      <div className="main-top">
        <h4>Dengarkan Dan Rasakan</h4>
      </div>
      <div className="main-body">
        <SongCard onClick={openMusicPlayer} />
      </div>
    </main>
  )
}

export default Main
