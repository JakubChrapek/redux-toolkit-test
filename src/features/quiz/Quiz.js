import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectActiveQuestionNumber,
  selectQuestions,
  selectFinished,
  selectMaxPoints,
  selectScore,
  next,
  prev,
  toggle,
  finish,
} from './quizSlice';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const Quiz = () => {
  const currentQuestionNumber = useSelector(selectActiveQuestionNumber);
  const questions = useSelector(selectQuestions);
  const finished = useSelector(selectFinished);
  const dispatch = useDispatch();
  const maxPoints = useSelector(selectMaxPoints);
  const score = useSelector(selectScore);
  
  const handleNext = () => {
    if(finished) return
    if(questions[currentQuestionNumber + 1]) {
      dispatch(next());
    } else {
      dispatch(finish());
    }
  };

  const handleToggle = (answerIndex) => {
    dispatch(toggle(answerIndex));
  };

  return <div>
    {finished ? 
    <p>Podsumowanie: {score} / {maxPoints}</p>
    
    :
      <>
        <p>{currentQuestionNumber+1} / {questions.length}</p>
        <p>{questions[currentQuestionNumber].content}</p>
        <List>
          {questions[currentQuestionNumber].answers.map((answer, index) =>
            <ListItem key={`checkbox-${index}`} dense button onClick={() => handleToggle(index)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={answer.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': answer.id }}
                />
              </ListItemIcon>
              <ListItemText id={answer.id} primary={answer.content} />
            </ListItem>
          )}
        </List>

        <Button disabled={currentQuestionNumber === 0}onClick={() => dispatch(prev())}>Prev</Button>
        <Button onClick={handleNext}>
          {currentQuestionNumber === questions.length - 1 ? `Zakończ` : `Next`}
        </Button>
      </>
    }
  </div>
}

export default Quiz
