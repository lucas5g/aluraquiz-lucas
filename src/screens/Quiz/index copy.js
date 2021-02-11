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
  const [ results, setResults] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const questionIndex = currentQuestion
  const question = externalQuestions[questionIndex]
  const totalQuestions = externalQuestions.length
  const bg = externalBg

  function addResult(result){
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
    if (nextQuestion < totalQuestion) {
      setCurrentQuestion(nextQuestion)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }
  const router = useRouter()
  const [name, setName] = useState('')
  return (
    <QuizBackground backgroundImage={bg}>
      <Head>
        <title>
          AluraQuiz - Modelo Base
        </title>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>#Quiz Java Script</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault()
              router.push(`/quiz?name=${name}`)
              console.log('teste')
            }}>
              <Input
                name="nomeDoUsuario"
                placeholder="Dia ai seu nome"
                onChange={(event) => {
                  const { value } = event.target
                  setName(value)
                }
                } />
              <Button type="submit" disabled={name.length === 0}>
                Jogar {name}
              </Button>

            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>#Quiz Java Script</h1>
          </Widget.Header>
          <Widget.Content>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              {JSON.stringify(db)}
              {/* <ul>
                {db.external.map((linkExterno) => {
                  const [projectName, githubUser ] = linkExterno
                    .replace(/\//g,'')
                    .replace('https:','')
                    .replace('.vercerl.app', '')
                    .split('.')
                  return(
                    <li key={linkExterno}>
                      <Widget.Topic href={linkExterno}>
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  )
                })}
              </ul> */}

            </Widget.Content>

          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https:github.com/lucas5g" />

    </QuizBackground>
  );
}

export default QuizPage;
