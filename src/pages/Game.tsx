import React, { useEffect } from 'react';
import { Winnings } from '../components/Winnings';
import { Answers } from '../components/Answers';
import { useStore } from '../store/mobx';
import { observer } from 'mobx-react';

export const Game = observer(() => {
  const Store = useStore();

  useEffect(() => {
    Store.getData();
    Store.setCurrentQuestion(Store.questions[0]);
  }, []);

  return (
    <div className="game">
      <section className="questions">
        <h2>{Store.currentQuestion?.body}</h2>
        <Answers />
      </section>
      <section className="winnings">
        <Winnings />
      </section>
    </div>
  );
});
