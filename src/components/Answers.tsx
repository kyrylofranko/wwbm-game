import React, { useState } from 'react';
import { Answer } from './Answer';
import { v4 as uuid } from 'uuid';
import { useStore } from '../store/mobx';

export const Answers = () => {
  const Store = useStore();
  const [activeAnswer, setActiveAnswer] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    setActiveAnswer(answerIndex);

    setTimeout(() => {
      if (answerIndex === Store.currentQuestion?.correct) {
        setCorrectAnswer(answerIndex);
      } else {
        setWrongAnswer(answerIndex);
      }
    }, 3000);
  };

  return (
    <ul className="answers">
      {Store.currentQuestion?.answers.map((answer, index) => (
        <Answer
          key={uuid()}
          answer={answer}
          index={index}
          activeAnswer={activeAnswer}
          correctAnswer={correctAnswer}
          wrongAnswer={wrongAnswer}
          handleSelect={handleAnswerSelect}
        />
      ))}
    </ul>
  );
};
