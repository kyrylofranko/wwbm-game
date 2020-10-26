import React, { useEffect } from 'react';
import { Answer } from './Answer';
import { v4 as uuid } from 'uuid';
import { useStore } from '../store';
import { observer } from 'mobx-react';
import useSound from 'use-sound';
import CheckingAnswer from '../assets/sounds/final_answer.mp3';
import WrongAnswer from '../assets/sounds/wrong_answer.mp3';
import CorrecAnswer from '../assets/sounds/correct_answer.mp3';

type AnswersProps = {
  stopNextRound(id?: string): void;
  stopPlayingRoundSounds(id?: string): void;
};

export const Answers = observer(({ stopNextRound, stopPlayingRoundSounds }: AnswersProps) => {
  const Store = useStore();

  const [playCheckingAnswer, { stop: stopPlayCheckingAnswer }] = useSound(CheckingAnswer, {
    volume: 0.15,
  });

  const [playWrongAnswer] = useSound(WrongAnswer, { volume: 0.15 });

  const [playCorrectAnswer, { stop: stopPlayCorrectAnswer }] = useSound(CorrecAnswer, {
    volume: 0.15,
  });

  useEffect(() => {
    if (Store.correctAnswer === null) {
      stopPlayCorrectAnswer();
    }
  }, [Store.correctAnswer, stopPlayCorrectAnswer]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (Store.isCheckingAnswer || Store.correctAnswer !== null) {
      return;
    } else {
      stopNextRound();
      stopPlayingRoundSounds();
      Store.setActiveAnswer(answerIndex);
      Store.setCheckingAnswer(true);
      playCheckingAnswer();

      setTimeout(() => {
        if (answerIndex === Store.currentQuestion?.correct) {
          Store.setCorrectAnswer(answerIndex);
          playCorrectAnswer();
          stopPlayCheckingAnswer();
          Store.setCheckingAnswer(false);
        } else {
          stopPlayCheckingAnswer();
          Store.setWrongAnswer(answerIndex);
          playWrongAnswer();
          setTimeout(() => {
            if (Store.currentQuestion) {
              Store.setCorrectAnswer(Store.currentQuestion.correct);
            }

            Store.setCheckingAnswer(false);
          }, 1700);
        }
      }, 5000);
    }
  };

  return (
    <ul className="answers">
      {Store.currentQuestion?.answers.map((answer, index) => (
        <Answer key={uuid()} answer={answer} index={index} handleSelect={handleAnswerSelect} />
      ))}
    </ul>
  );
});
