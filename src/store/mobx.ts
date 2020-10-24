import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

export interface Question {
  id: number;
  body: string;
  answers: string[];
  correct: number;
  winning: string;
}

class Store {
  questions: Question[] = [];
  currentQuestion: Question | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getData() {
    const data = require('../utils/data.json');
    this.questions = data.questions;
  }

  setCurrentQuestion(question: Question | null) {
    this.currentQuestion = question;
  }
}

const StoreContext = createContext<Store>({} as Store);
export const StoreProvider = StoreContext.Provider;
export const store = new Store();
export const useStore = (): Store => useContext(StoreContext);
