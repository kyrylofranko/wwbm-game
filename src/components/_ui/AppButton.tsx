import React from 'react';
import classNames from 'classnames';

type AppButtonProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  style?: string;
  disabled?: boolean;
  onClick?(): void;
};

export const AppButton = (props: AppButtonProps) => {
  const { type, disabled, text, style, onClick } = props;
  const btnClass = classNames('btn-default', style);

  return (
    <button type={type} className={btnClass} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};
