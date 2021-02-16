import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'


import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GithubCorner';
import { route } from 'next/dist/next-server/server/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import QuizLogo from '../src/components/QuizLogo';

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
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5}}
          variants={{
            show: { opacity: 1, y: '0'},
            hidden: { opacity: 0, y: '100%'}
          }}
          initial="hidden"
          animate="show"
          >
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
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5}}
          variants={{
            show: { opacity: 1},
            hidden: { opacity: 0}
          }}
          initial="hidden"
          animate="show"
        
        >
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
                      <Widget.Topic 
                        as={Link}
                        href={`/quiz/${projectName}__${githubUser}`} >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  )
                })}
              </ul>

            </Widget.Content>

          </Widget.Content>
        </Widget>
        <Footer 
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5}}
          variants={{
            show: { opacity: 1},
            hidden: { opacity: 0}
          }}
          initial="hidden"
          animate="show"        
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https:github.com/lucas5g" />

    </QuizBackground>
  );
}

export default Home;
