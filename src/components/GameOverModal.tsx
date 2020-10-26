import React, { useCallback } from 'react';
import { AppButton } from './_ui/AppButton';
import { Thumb } from './Thumb';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import classNames from 'classnames';
import Confetti from 'react-confetti'

type GameOverModalProps = {
  visible: boolean;
  onCancel(): void;
}

export const GameOverModal = observer(({ visible, onCancel }: GameOverModalProps) => {
  const Store = useStore();

  const startGameAgain = useCallback(() => {
    Store.setCurrentQuestion(Store.questions[0]);
    Store.deleteAnswersHighlights();
  }, [Store]);

  const handleCloseModal = useCallback(() => {
    startGameAgain();
    onCancel();
  }, [startGameAgain, onCancel])

  const modalStyle = classNames({
    modal: true,
    'modal--opened': visible,
  });

  return (
      <>
        <div className={modalStyle}>
          <Confetti
              run={visible}
              recycle={false}
              width={window.innerWidth}
              height={window.innerHeight}
          />
          <div className="modal__container">
            <Thumb />
            <div className="end">
              <div className="end__text">
                <h2 className="end__text__heading">Total score:</h2>
                <h1>{Store.currentQuestion?.winning} earned.</h1>
              </div>
              <AppButton type="button" text="Try again" onClick={handleCloseModal} />
            </div>
          </div>
        </div>
      </>
  );
});
