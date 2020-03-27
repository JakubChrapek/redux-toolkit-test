import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'quiz',
  initialState: {
    activeQuestion: 0,
    finished: false,
    score: 0,
    questions: [
      { 
        content: "How to start with Redis?",
        answers: [
          { id: 1, content: 'Just start! Done is better than perfect.', checked: false, points: 1 },
          { id: 2, content: 'Read all the documentation!', checked: false, points: 0 },
          { id: 3, content: 'Google it.', checked: false, points: 1 },
        ]
      
      },
      {
        content: "How to start with Firebase?",
        answers: [
          { id: 1, content: 'Get in touch with NetNinja tutorial.', checked: false, points: 0 },
          { id: 2, content: 'Docs 4the win!', checked: false, points: 1 },
          { id: 3, content: 'Create a mini project.', checked: false, points: 0 },
        ]
      },
      {
        content: "How to start with Redux-Toolkit?",
        answers: [
          { id: 1, content: 'Chmaro knows a little bit 😬.', checked: false, points: 1 },
          { id: 2, content: 'Read Redux docs ↔ Read Redux Toolkit docs', checked: false, points: 1 },
          { id: 3, content: 'Create a small project.', checked: false, points: 1 },
        ]
      },
    ]
  },
  reducers: {
    next: state => {
      state.activeQuestion += 1;
    },
    prev: state => {
      state.activeQuestion -= 1;
    },
    toggle: (state, action) => {
      const question = state.questions[state.activeQuestion];
      question.answers[action.payload].checked = !question.answers[action.payload].checked;
    },
    finish: state => {
      state.finished = true;
    }
  },
});

//REDUCERS TO DISPATCH
export const { next, prev, toggle, finish } = slice.actions;

// SELECTORS
export const selectQuestions = state => state.quiz.questions;
export const selectActiveQuestionNumber = state => state.quiz.activeQuestion;
export const selectFinished = state => state.quiz.finished;
export const selectMaxPoints = state => {
  let maxPoints = 0;
  state.quiz.questions.forEach(question => {
    maxPoints += question.answers.filter(answer => answer.points > 0).length
  });
  return maxPoints;
}
export const selectScore = state => {
  let score = 0;
  state.quiz.questions.forEach(question => {
    score += question.answers
    .filter(answer => answer.checked && answer.points > 0).length;
  });
  return score;
}

export default slice.reducer;