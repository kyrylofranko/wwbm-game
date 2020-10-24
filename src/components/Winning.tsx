import React from 'react';
import classNames from 'classnames';
import { useStore } from '../store/mobx';

type WinningProps = {
  id: number;
  winning: string;
};

export const Winning = (props: WinningProps) => {
  const Store = useStore();
  const { id, winning } = props;

  const itemStyle = classNames({
    winnings__item: true,
    'winnings__item--active': Store.currentQuestion?.id === id,
  });

  return (
    <li key={id} className={itemStyle}>
      {winning}
    </li>
  );
};
