import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router'


// import db from '../../db.json';
import db from '../../../db.json'
import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import Footer from '../../components/Footer';
import GitHubCorner from '../../components/GithubCorner';
import { route } from 'next/dist/next-server/server/router';
import Input from '../../components/Input';
import Button from '../../components/Button';
import QuizLogo from '../../components/QuizLogo';
import AlternativesForm from '../../components/AlternativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultados
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`restul_${index}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>

      </Widget.Content>
    </Widget>
  )
}

function LoadingWidget(){
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [ Desafio do Loading ]
      </Widget.Content>
    </Widget>
  )
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}){
  const [ selectedAlternative, setSelectedAlternative] = useState(undefined)
  const [ isQuestionSubmited, setIsQuestionSubmited] = useState(false)
  const questionId = `question_${questionIndex}`
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1 } de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img 
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover'
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

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault()
            setIsQuestionSubmited(true)
            setTimeout(() => {
              addResult(isCorrect)
              onSubmit()
              setIsQuestionSubmited(false)
              setSelectedAlternative(undefined)
            }, 3 * 1000)
          }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative_${alternativeIndex}`
              const alternativeStatus = isCorrect ? 'SUCCESS':'ERROR'
              const isSelected = selectedAlternative === alternativeIndex

              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >

                  <input 
                    style={{ display: 'none'}}
                    id={alternativeId}
                    name={questionId}
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}

                </Widget.Topic>
              )
            })}
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar 
            </Button>

            {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
            {isQuestionSubmited && !isCorrect && <p>você errou!</p>}

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  )

}

export const QuizContainer = styled.div`
    width: 100%;
    max-width: 350px;
    padding-top: 45px;
    margin: auto 10%;
    @media screen and (max-width: 500px){
        margin: auto;
        padding: 15px;
    }

`;

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

function QuizPage({ externalQuestions, externalBg }) {

  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [results, setResults] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = externalQuestions[questionIndex]
  const totalQuestions = externalQuestions.length
  const bg = externalBg

  function addResult(result) {
    setResults([
      ...results,
      result,
    ])
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])


  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }
  const router = useRouter()
  const [name, setName] = useState('')
  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState == screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          >

          </QuestionWidget>
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>

    </QuizBackground>
  );
}

export default QuizPage;
