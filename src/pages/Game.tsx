import React, { useCallback, useEffect, useState } from 'react';
import { Winnings } from '../components/Winnings';
import { Answers } from '../components/Answers';
import { useStore } from '../store';
import { observer } from 'mobx-react';
import { GameOverModal } from '../components/GameOverModal';
import useSound from 'use-sound';
import classNames from 'classnames';
import { Sandwich } from '../components/Sandwich';
import nextRound from '../assets/sounds/next.mp3';
import easyRound from '../assets/sounds/easy.mp3';
import mediumRound from '../assets/sounds/medium.mp3';
import hardRound from '../assets/sounds/hard.mp3';
import hardRoundMillion from '../assets/sounds/hard_million.mp3';
import startSound from '../assets/sounds/lets_play.mp3';

export const Game = observer(() => {
  const store = useStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [isWinningsOpen, setWinningsOpen] = useState(false);

  const [playStartSound, {isPlaying: isStartSoundPlaying}] = useSound(startSound, {volume: 0.1});

  const [
    playNextRound,
    {stop: stopNextRound, isPlaying: isNextRoundPlaying},
  ] = useSound(nextRound, {volume: 0.1});

  const [
    playEasyRound,
    {stop: stopEasyRound, isPlaying: isEasyRoundPlaying},
  ] = useSound(easyRound, {volume: 0.1, soundEnabled: !isStartSoundPlaying});

  const [
    playMediumRound,
    {stop: stopMediumRound, isPlaying: isMediumRoundPlaying},
  ] = useSound(mediumRound, {volume: 0.1, soundEnabled: !isStartSoundPlaying});

  const [
    playHardRound,
    {stop: stopHardRound, isPlaying: isHardRoundPlaying},
  ] = useSound(hardRound, {volume: 0.1, soundEnabled: !isStartSoundPlaying});

  const [
    playFinalRound,
    {stop: stopHardRoundMillion, isPlaying: isFinalRoundPlaying},
  ] = useSound(hardRoundMillion, {
    volume: 0.1,
  });

  const stopPlayingRoundSounds = useCallback(() => {
    stopEasyRound();
    stopMediumRound();
    stopHardRound();
    stopHardRoundMillion();
  }, [stopEasyRound, stopMediumRound, stopHardRound, stopHardRoundMillion]);

  useEffect(() => {
    if (
        store.correctAnswer !== null
        || store.wrongAnswer !== null
    ) {
      stopPlayingRoundSounds();
    }
  }, [store.correctAnswer, store.wrongAnswer, stopPlayingRoundSounds]);

  useEffect(() => {
    if (
        (store.isCheckingAnswer && isEasyRoundPlaying) ||
        (store.isCheckingAnswer && isMediumRoundPlaying) ||
        (store.isCheckingAnswer && isHardRoundPlaying) ||
        (store.isCheckingAnswer && isFinalRoundPlaying)
    ) {
      stopPlayingRoundSounds();
    }
  }, [
    store.isCheckingAnswer,
    isEasyRoundPlaying,
    isMediumRoundPlaying,
    isHardRoundPlaying,
    stopPlayingRoundSounds,
    isFinalRoundPlaying,
  ]);

  useEffect(() => {
    if (isNextRoundPlaying) {
      stopPlayingRoundSounds();
    }
  }, [isNextRoundPlaying, stopPlayingRoundSounds]);

  useEffect(() => {
    if (!isNextRoundPlaying) {
      if (store.currentQuestion?.id! < 4) {
        playEasyRound();
      } else if (store.currentQuestion?.id! < 8) {
        playMediumRound();
      } else if (store.currentQuestion?.id! < 11) {
        playHardRound();
      } else if (store.currentQuestion?.id === 11) {
        playFinalRound();
      }
    }
  }, [
    store.currentQuestion, isNextRoundPlaying, playEasyRound,
    playMediumRound, playHardRound, playFinalRound,
  ]);

  useEffect(() => {
    if (store.currentQuestion?.id === 0) {
      playStartSound();
    }
  }, [playStartSound]);

  useEffect(() => {
    store.getData();
    store.setCurrentQuestion(store.questions[0]);
  }, [store]);

  useEffect(() => {
    if (store.wrongAnswer !== null) {
      setTimeout(() => {
        setModalVisible(true);
      }, 4000);
    }
  }, [store.wrongAnswer]);

  useEffect(() => {
    if (store.correctAnswer !== null && store.wrongAnswer === null) {
      if (store.currentQuestion?.id === 11) {
        setTimeout(() => {
          setModalVisible(true);
          store.setCorrectAnswer(null);
        }, 5000);
      } else {
        setTimeout(() => {
          playNextRound();
          store.setCurrentQuestion(store.questions[store.currentQuestion!.id + 1]);
          store.deleteAnswersHighlights();
        }, 4000);
      }
    }
  }, [
    store,
    playNextRound,
    store.correctAnswer,
    store.questions,
    store.currentQuestion,
    store.deleteAnswersHighlights,
    store.setCurrentQuestion,
  ]);

  const toggleSandwich = useCallback(() => {
    setWinningsOpen(!isWinningsOpen);
  }, [isWinningsOpen]);

  const winningsStyle = classNames({
    winnings: true,
    'winnings--opened': isWinningsOpen,
  });

  return (
      <div className="game">
        <GameOverModal visible={modalVisible} onCancel={() => setModalVisible(false)} />
        <section className="questions">
          <Sandwich isWinningsOpen={isWinningsOpen} toggleSandwich={toggleSandwich} />
          <h2 className="questions__heading">{store.currentQuestion?.body}</h2>
          <Answers stopNextRound={stopNextRound} stopPlayingRoundSounds={stopPlayingRoundSounds} />
        </section>
        <section className={winningsStyle}>
          <Winnings />
        </section>
      </div>
  );
});
