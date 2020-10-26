import React, { useCallback, useEffect, useMemo } from 'react';
import { AppButton } from './_ui/AppButton';
import { Thumb } from './Thumb';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import classNames from 'classnames';
import Confetti from 'react-confetti'
import useSound from 'use-sound';
import winningTheme from '../assets/sounds/winning_theme.mp3';

type GameOverModalProps = {
  visible: boolean;
  onCancel(): void;
}

export const GameOverModal = observer(({visible, onCancel}: GameOverModalProps) => {
  const Store = useStore();

  const [playWinningTheme, { stop: stopWinningTheme }] = useSound(
      winningTheme,
      { volume: 0.1 }
  );

  useEffect(() => {
    if (visible && Store.currentQuestion?.id === 11) {
      playWinningTheme();
    }
  }, [visible, Store.currentQuestion, playWinningTheme]);

  const startGameAgain = useCallback(() => {
    Store.setCurrentQuestion(Store.questions[0]);
    Store.deleteAnswersHighlights();
  }, [Store]);

  const handleCloseModal = useCallback(() => {
    startGameAgain();
    onCancel();
    stopWinningTheme();
  }, [startGameAgain, onCancel, stopWinningTheme])

  const modalStyle = classNames({
    modal: true,
    'modal--opened': visible,
  });

  const shouldConfettiRun = visible && Store.currentQuestion?.id! === 11;
  const endTextBody = useMemo(
      () => {
        if (Store.currentQuestion?.id === 11) {
          return `${Store.currentQuestion.winning} earned.`
        } else {
          return Store.currentQuestion?.id! > 0
              ? `${Store.questions[Store.currentQuestion?.id! - 1].winning} earned.`
              : `Better luck next time!`
        }
      }, [Store.currentQuestion, Store.questions]
  );

  return (
      <>
        <div className={modalStyle}>
          <Confetti
              run={shouldConfettiRun}
              width={window.innerWidth}
              height={window.innerHeight}
          />
          <div className="modal__container">
            <Thumb />
            <div className="end">
              <div className="end__text">
                {Store.currentQuestion?.id! > 0 && <h2 className="end__text__heading">Total score:</h2>}
                <h1 className="end__text__body">{endTextBody}</h1>
              </div>
              <AppButton type="button" text="Try again" onClick={handleCloseModal} />
            </div>
          </div>
        </div>
      </>
  );
});
