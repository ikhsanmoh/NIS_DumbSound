import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const MusicPlayer = ({ playIndex, musics }) => {
  const audioList = musics.map(music => {
    return {
      name: music.title,
      singer: music.artis.name,
      cover: music.thumbnail,
      musicSrc: music.attache
    }
  })

  return (
    <ReactJkMusicPlayer
      audioLists={audioList}
      playIndex={playIndex}
      autoPlay={true}
      toggleMode={false}
      showDownload={false}
      showThemeSwitch={false}
      showLyric={false}
      mode='full'
    />
  )
}

export default MusicPlayer
