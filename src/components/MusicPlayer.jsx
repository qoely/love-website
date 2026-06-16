import { useRef, useState } from 'react';

/**
 * Floating music player (bottom-right).
 * Autoplay-muted pattern, click to unmute.
 * Hidden if no src configured in customize.json.
 */
export default function MusicPlayer({ src, title }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (!src) return null;

  const onClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`music-toggle${playing ? ' is-playing' : ''}`}
        aria-label={title ? `Putar/jeda musik: ${title}` : 'Putar/jeda musik'}
        aria-pressed={playing}
        onClick={onClick}
      >
        <span className="music-icon" data-icon={playing ? 'pause' : 'play'} />
      </button>
      <audio ref={audioRef} src={src} loop preload="none" />
    </>
  );
}
