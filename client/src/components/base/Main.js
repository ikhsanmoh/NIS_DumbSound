import { useState } from 'react';

import SongCard from '../card/SongCard';

import './Main.css';

const inputSearchStyle = {
  backgroundImage: `url(/search-icon.png)`
}

const Main = ({ openMusicPlayer, musics }) => {
  const [search, setSearch] = useState('')
  const [musicList, setMusicList] = useState(musics)

  const searchHandler = (e) => {
    e.preventDefault()

    const filterMusics = musics.filter(music => {
      const titleLowerCase = music.title.toLowerCase()
      const searchLowerCase = search.toLowerCase()
      return titleLowerCase.includes(searchLowerCase)
    })

    setMusicList(filterMusics)
  }

  return (
    <main className="main">
      <div className="main-top">
        <h4>Dengarkan Dan Rasakan</h4>
      </div>
      <div className="search">
        <form onKeyUp={searchHandler}>
          <input
            style={inputSearchStyle}
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="main-body">
        {musicList && musicList.map((music, index) => (
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
