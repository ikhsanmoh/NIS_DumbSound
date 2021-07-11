import SongCard from '../card/SongCard';

import './Main.css';

const Main = ({ openMusicPlayer, musics }) => {
  // const musicsHasItems = musics.length

  return (
    <main className="main">
      <div className="main-top">
        <h4>Dengarkan Dan Rasakan</h4>
      </div>
      <div className="main-body">
        {musics && musics.map((music, index) => (
          <SongCard
            key={index}
            image={music.thumbnail}
            title={music.title}
            year={music.year}
            artist={music.artis.name}
            onClick={() => openMusicPlayer(index)}
          />
        ))}
      </div>
    </main>
  )
}

export default Main
