import React from 'react';
import { Winning } from './Winning';
import { useStore } from '../store/mobx';

export const Winnings = () => {
  const { questions } = useStore();

  return (
    <ul className="winnings__list">
      {questions.map((item) => <Winning key={item.id} {...item} />).reverse()}
    </ul>
  );
};
