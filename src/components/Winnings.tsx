import React from 'react';
import { Winning } from './Winning';
import { useStore } from '../store';
import { observer } from 'mobx-react';

export const Winnings = observer(() => {
  const Store = useStore();


  return (
    <ul className="winnings__list">
      {Store.questions.map((item) => <Winning key={item.id} {...item} />).reverse()}
    </ul>
  );
});
