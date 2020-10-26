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

export const Game = observer(() => {
  const Store = useStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [isWinningsOpen, setWinningsOpen] = useState(false);

  const [
    playNextRound,
    { stop: stopNextRound, isPlaying: isNextRoundPlaying },
  ] = useSound(nextRound, { volume: 0.1 });

  const [
    playEasyRound,
    { stop: stopEasyRound, isPlaying: isEasyRoundPlaying },
  ] = useSound(easyRound, { volume: 0.1 });

  const [
    playMediumRound,
    { stop: stopMediumRound, isPlaying: isMediumRoundPlaying },
  ] = useSound(mediumRound, { volume: 0.1 });

  const [
    playHardRound,
    { stop: stopHardRound, isPlaying: isHardRoundPlaying },
  ] = useSound(hardRound, { volume: 0.1 });

  const [
    playHardRoundMillion,
    { stop: stopHardRoundMillion, isPlaying: isHardRoundMillionPlaying },
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
    if (Store.correctAnswer !== null || Store.wrongAnswer !== null) {
      stopPlayingRoundSounds();
    }
  }, [Store.correctAnswer, Store.wrongAnswer, stopPlayingRoundSounds]);

  useEffect(() => {
    if (
      (Store.isCheckingAnswer && isEasyRoundPlaying) ||
      (Store.isCheckingAnswer && isMediumRoundPlaying) ||
      (Store.isCheckingAnswer && isHardRoundPlaying) ||
      (Store.isCheckingAnswer && isHardRoundMillionPlaying)
    ) {
      stopPlayingRoundSounds();
    }
  }, [
    Store.isCheckingAnswer,
    isEasyRoundPlaying,
    isMediumRoundPlaying,
    isHardRoundPlaying,
    stopPlayingRoundSounds,
    isHardRoundMillionPlaying,
  ]);

  useEffect(() => {
    if (!isNextRoundPlaying) {
      if (Store.currentQuestion?.id! < 4) {
        playEasyRound();
      }

      if (Store.currentQuestion?.id! < 8 && Store.currentQuestion?.id! > 3) {
        playMediumRound();
      }

      if (Store.currentQuestion?.id! < 11 && Store.currentQuestion?.id! > 7) {
        playHardRound();
      }

      if (Store.currentQuestion?.id === 11) {
        playHardRoundMillion();
      }
    }
  }, [
    isNextRoundPlaying,
    Store.currentQuestion,
    playEasyRound,
    playMediumRound,
    playHardRound,
    playHardRoundMillion,
  ]);

  useEffect(() => {
    Store.getData();
    Store.setCurrentQuestion(Store.questions[0]);
  }, [Store]);

  useEffect(() => {
    if (Store.wrongAnswer !== null) {
      setTimeout(() => {
        setModalVisible(true);
      }, 4000);
    }
  }, [Store.wrongAnswer]);

  useEffect(() => {
    if (Store.correctAnswer !== null && Store.wrongAnswer === null) {
      if (Store.currentQuestion?.id === 11) {
        setTimeout(() => {
          setModalVisible(true);
          Store.setCorrectAnswer(null);
        }, 5000);
      } else {
        setTimeout(() => {
          playNextRound();
          Store.setCurrentQuestion(Store.questions[Store.currentQuestion!.id + 1]);
          Store.deleteAnswersHighlights();
        }, 4000);
      }
    }
  }, [
    Store,
    playNextRound,
    Store.correctAnswer,
    Store.questions,
    Store.currentQuestion,
    Store.deleteAnswersHighlights,
    Store.setCurrentQuestion,
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
        <h2 className="questions__heading">{Store.currentQuestion?.body}</h2>
        <Answers stopNextRound={stopNextRound} stopPlayingRoundSounds={stopPlayingRoundSounds} />
      </section>
      <section className={winningsStyle}>
        <Winnings />
      </section>
    </div>
  );
});
