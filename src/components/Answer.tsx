import React, { useCallback } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useStore } from '../store';

type AnswerProps = {
  answer: string;
  index: number;
  handleSelect(answerIndex: number): void;
};

export const Answer = observer(({ answer, index, handleSelect }: AnswerProps) => {
  const store = useStore();
  const itemStyle = classNames({
    answer: true,
    'answer--selected': store.activeAnswer === index,
    'answer--correct': store.correctAnswer === index,
    'answer--wrong': store.wrongAnswer === index,
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
  const onClick = useCallback(() => handleSelect(index), [handleSelect, index]);

  return (
    <li className={itemStyle} onClick={onClick}>
      <div className="answer__info">
        <p className="answer__letter">{generateAnswerLetter(index)}</p>
        <p className="answer__body">{answer}</p>
      </div>
    </li>
  );
});
