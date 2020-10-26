import React, { useCallback, useEffect } from 'react';
import { AppButton } from '../components/_ui/AppButton';
import { Thumb } from '../components/Thumb';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import MainTheme from '../assets/sounds/main_theme.mp3';
import LetsPlay from '../assets/sounds/lets_play.mp3';

export const Welcome = () => {
  const [playMainTheme, { stop: stopPlayingMainTheme }] = useSound(
      MainTheme,
      { volume: 0.1 }
  );
  const [playLetsPlay, { isPlaying: isLetsPlaySoundPlaying}] = useSound(
      LetsPlay,
      { volume: 0.1 }
  );

  useEffect(() => {
    playMainTheme();
  }, [playMainTheme])

  const handleStartGame = useCallback(() => {
    stopPlayingMainTheme();
    playLetsPlay();
    console.log(isLetsPlaySoundPlaying)
  }, [stopPlayingMainTheme, playLetsPlay, isLetsPlaySoundPlaying])

  return (
    <div className="triangle-bg">
      <div className="welcome">
        <div className="welcome__container">
          <Thumb />
          <div className="start">
            <h1 className="start__heading">Who wants to be a millionaire?</h1>
            <Link to={{
              pathname: '/questions',
              state: { isLetsPlaySoundPlaying }
            }} className="link" onClick={handleStartGame}>
              <AppButton type="button" text="Start" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
