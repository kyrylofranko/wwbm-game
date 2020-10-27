import React from 'react';
import { Winning } from './Winning';
import { useStore } from '../store';
import { observer } from 'mobx-react';

export const Winnings = observer(() => {
  const store = useStore();

  return (
    <ul className="winnings__list">
      {store.questions.map((item) => <Winning key={item.id} {...item} />).reverse()}
    </ul>
  );
});
