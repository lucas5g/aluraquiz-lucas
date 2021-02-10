import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router'


import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GithubCorner';
import { route } from 'next/dist/next-server/server/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

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

function Home() {

  const router = useRouter()
  const [name, setName] = useState('')
  return (
    <QuizBackground backgroundImage={db.bg}>
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
              
              <ul>
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
              </ul>

            </Widget.Content>

          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https:github.com/lucas5g" />

    </QuizBackground>
  );
}

export default Home;
