import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

const MusicPlayer = ({ currentIndexPlay, musics, unmount }) => {
  const audioList = musics.map(music => {
    return {
      name: music.title,
      singer: music.artis.name,
      cover: music.thumbnail,
      musicSrc: music.attache
    }
  })

  return unmount ? null : (
    <ReactJkMusicPlayer
      audioLists={audioList}
      playIndex={currentIndexPlay}
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
