/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';


function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true
            if (isAcerto) {
              return somatoriaAtual + 1
            }
            return somatoriaAtual
          })}
          {' '}
         perguntas
        </p>
        <ul>
          {console.log(results)}
          {results.map((result, index) => (
            <li key={result}>
              #
              {index + 1}
              {' '}
               Resultado:
               {result}
              {result === true ? 'Acertou' : 'Errou'}
            </li>

          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit }) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined)
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false)
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

  function addResult(result) {
    setResults([
      ...results,
      result
    ])
  }
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Pergunta {questionIndex + 1} de {totalQuestions}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>
        <form onSubmit={(event) => {
          event.preventDefault()
          setIsQuestionSubmited(true)
          setTimeout(() => {
            addResult(isCorrect)
            setIsQuestionSubmited(false)
            setSelectedAlternative(undefined)
            onSubmit()
          }, 3 * 1000)
        }}>

          {question.alternatives.map((alternative, index) =>
            // const alternativeId = `alternative_${index}`
            <Widget.Topic
              key={index}
              as="label"
              htmlFor={index}
            >
              <input
                // style={{display:'none'}}
                id={index}
                name={questionIndex}
                type="radio"
                onChange={() => setSelectedAlternative(index)}
              />
              {alternative}
            </Widget.Topic>
          )}
          <Button type="submit" disabled={!hasAlternativeSelected} >
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p> Você acertou</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  // console.log('Perguntas criadas: ', db.questions)
  const [screenState, setScreenState] = useState(screenStates.RESULT)
  const [results, setResults] = useState([true, false, true])
  const totalQuestions = db.questions.length
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex]

  useEffect(() => {
    setTimeout(() => {
      // setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  const handleSubmit = () => {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }
  return (
    <QuizBackground>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (

          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            addResult={addResult}

          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}


      </QuizContainer>
    </QuizBackground >
  );
}