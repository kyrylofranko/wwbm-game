import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import data from '../utils/data.json';

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
  correctAnswer: number | null = null;
  activeAnswer: number | null = null;
  wrongAnswer: number | null = null;
  isCheckingAnswer = false;
  isStartingGameSoundPlaying = false;

  constructor() {
    makeAutoObservable(this);
  }

  getData() {
    this.questions = data.questions;
  }

  setStartingGameSoundPlaying(value: boolean) {
    this.isStartingGameSoundPlaying = value;
  }

  setCurrentQuestion(question: Question | null) {
    this.currentQuestion = question;
  }

  setCheckingAnswer(value: boolean) {
    this.isCheckingAnswer = value;
  }

  setCorrectAnswer(answerIndex: number | null) {
    this.correctAnswer = answerIndex;
  }

  setActiveAnswer(answerIndex: number | null) {
    this.activeAnswer = answerIndex;
  }

  setWrongAnswer(answerIndex: number | null) {
    this.wrongAnswer = answerIndex;
  }

  deleteAnswersHighlights() {
    this.activeAnswer = null;
    this.correctAnswer = null;
    this.wrongAnswer = null;
  }
}

const StoreContext = createContext<Store>({} as Store);
export const StoreProvider = StoreContext.Provider;
export const store = new Store();
export const useStore = (): Store => useContext(StoreContext);
