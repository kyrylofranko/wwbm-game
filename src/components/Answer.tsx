import React from 'react';
import classNames from 'classnames';

type AnswerProps = {
  answer: string;
  activeAnswer: number | null;
  correctAnswer: number | null;
  wrongAnswer: number | null;
  index: number;
  handleSelect(answerIndex: number): void;
};

export const Answer = ({
  answer,
  activeAnswer,
  correctAnswer,
  wrongAnswer,
  index,
  handleSelect,
}: AnswerProps) => {
  const itemStyle = classNames({
    answer: true,
    'answer--selected': activeAnswer === index,
    'answer--correct': correctAnswer === index,
    'answer--wrong': wrongAnswer === index,
  });

  const generateAnswerLetter = (index: number) => {
    switch (index) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      default:
        return 'D';
    }
  };
  return (
    <li className={itemStyle} value={answer} onClick={() => handleSelect(index)}>
      <div className="answer__text">
        <p className="answer__letter">{generateAnswerLetter(index)}</p>
        <p>{answer}</p>
      </div>
    </li>
  );
};
