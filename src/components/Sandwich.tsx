import React from 'react';
import cn from 'classnames';

type SandwichProps = {
  isWinningsOpen: boolean;
  toggleSandwich(): void;
};

export const Sandwich = ({ isWinningsOpen, toggleSandwich }: SandwichProps) => {
  return (
    <a
      href="!#"
      className={cn({
        sandwich: true,
        'sandwich--clicked': isWinningsOpen,
      })}
      onClick={(e) => {
        e.preventDefault();
        toggleSandwich();
      }}
    >
      <span />
      <span />
      <span />
    </a>
  );
};
