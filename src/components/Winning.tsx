import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useStore } from '../store';
import { COLORS } from '../utils/colors';
import { observer } from 'mobx-react';

type WinningProps = {
  id: number;
  winning: string;
};

export const Winning = observer((props: WinningProps) => {
  const Store = useStore();
  const { id, winning } = props;

  const itemStyle = classNames({
    winnings__item: true,
    'winnings__item--active': Store.currentQuestion?.id === id,
  });

  const itemTextColor = useMemo(
      () => Store.currentQuestion?.id === id
          ? COLORS.primary
          : id < Store.currentQuestion?.id!
              ? COLORS.fontSecondary
              : 'black',
      [Store.currentQuestion, id]
  );

  return (
    <li
        key={id}
        className={itemStyle}
        style={{ color: itemTextColor }}
    >
      {winning}
    </li>
  );
});
