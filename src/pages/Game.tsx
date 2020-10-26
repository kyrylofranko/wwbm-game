import React, { useCallback, useEffect, useState } from 'react';
import { Winnings } from '../components/Winnings';
import { Answers } from '../components/Answers';
import { useStore } from '../store';
import { observer } from 'mobx-react';
import { GameOverModal } from '../components/GameOverModal';
import useSound from 'use-sound';
import nextRound from '../assets/sounds/next.mp3';
import { Sandwich } from '../components/Sandwich';
import classNames from 'classnames';

export const Game = observer(() => {
  const Store = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [isWinningsOpen, setWinningsOpen] = useState(false);

  const [playNextRound, { stop: stopPlayNextRound }] = useSound(
      nextRound,
      { volume: 0.1 }
  );

  useEffect(() => {
    Store.getData();
    Store.setCurrentQuestion(Store.questions[0]);
  }, [Store]);

  useEffect(() => {
    if (Store.wrongAnswer !== null) {
      setTimeout(() => {
        setModalVisible(true);
      }, 4000)
    }
  }, [Store.wrongAnswer]);

  useEffect(() => {
    if (Store.correctAnswer !== null && Store.wrongAnswer === null) {
      setTimeout(() => {
        playNextRound();
        Store.setCurrentQuestion(Store.questions[Store.currentQuestion!.id + 1]);
        Store.deleteAnswersHighlights();
      }, 4000)
    }
  }, [Store,
    playNextRound,
    Store.correctAnswer, Store.questions, Store.currentQuestion, Store.deleteAnswersHighlights, Store.setCurrentQuestion]);

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
        <Answers stopPlayNextRound={stopPlayNextRound} />
      </section>
      <section className={winningsStyle}>
        <Winnings />
      </section>
    </div>
  );
});
