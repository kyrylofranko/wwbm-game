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
  const store = useStore();
  const { id, winning } = props;

  const itemStyle = classNames({
    winnings__item: true,
    'winnings__item--active': store.currentQuestion?.id === id,
  });

  const itemTextColor = useMemo(
    () => {
      if (store.currentQuestion?.id === id) {
        return COLORS.primary;
      } else if (id < store.currentQuestion?.id!) {
        return COLORS.fontSecondary;
      } else {
        return 'black';
      }
    },
    [store.currentQuestion, id],
  );

  return (
    <li key={id} className={itemStyle} style={{ color: itemTextColor }}>
      {winning}
    </li>
  );
});
