import React, { useEffect } from 'react';
import { Answer } from './Answer';
import { useStore } from '../store';
import { observer } from 'mobx-react';
import useSound from 'use-sound';
import CheckingAnswer from '../assets/sounds/final_answer.mp3';
import WrongAnswer from '../assets/sounds/wrong_answer.mp3';
import CorrectAnswer from '../assets/sounds/correct_answer.mp3';

type AnswersProps = {
  stopNextRound(id?: string): void;
  stopPlayingRoundSounds(id?: string): void;
};

export const Answers = observer(({ stopNextRound, stopPlayingRoundSounds }: AnswersProps) => {
  const store = useStore();

  const [playCheckingAnswerSound, { stop: stopCheckingAnswerSound }] = useSound(CheckingAnswer, {
    volume: 0.15,
  });

  const [playWrongAnswerSound] = useSound(WrongAnswer, { volume: 0.15 });

  const [playCorrectAnswerSound, { stop: stopCorrectAnswerSound }] = useSound(CorrectAnswer, {
    volume: 0.15,
  });

  useEffect(() => {
    if (store.correctAnswer === null) {
      stopCorrectAnswerSound();
    }
  }, [store.correctAnswer, stopCorrectAnswerSound]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (store.isCheckingAnswer || store.correctAnswer !== null) {
      return;
    } else {
      stopNextRound();
      stopPlayingRoundSounds();
      store.setActiveAnswer(answerIndex);
      store.setCheckingAnswer(true);
      playCheckingAnswerSound();

      setTimeout(() => {
        if (answerIndex === store.currentQuestion?.correct) {
          store.setCorrectAnswer(answerIndex);
          playCorrectAnswerSound();
          stopCheckingAnswerSound();
          store.setCheckingAnswer(false);
        } else {
          stopCheckingAnswerSound();
          store.setWrongAnswer(answerIndex);
          playWrongAnswerSound();
          setTimeout(() => {
            if (store.currentQuestion) {
              store.setCorrectAnswer(store.currentQuestion.correct);
            }

            store.setCheckingAnswer(false);
          }, 1700);
        }
      }, 5000);
    }
  };

  return (
    <ul className="answers">
      {store.currentQuestion?.answers.map((answer, index) => (
        <Answer key={answer} answer={answer} index={index} handleSelect={handleAnswerSelect} />
      ))}
    </ul>
  );
});
