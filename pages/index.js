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
                        <h1>The Legend of zelda</h1>
                    </Widget.Header>
                    <Widget.Content>
                        <form onSubmit={ (event ) => {
                            event.preventDefault()
                            router.push(`/quiz?name=${name}`)
                            console.log('teste')
                        }}>
                            <input placeholder="Dia ai seu nome" onChange={(event) => {
                                const {value} = event.target
                                setName(value)
                            }} />
                            <button type="submit" disabled={name.length === 0}>
                                Jogar {name}
                            </button>

                        </form>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl="https:github.com/lucas5g" />

        </QuizBackground>
    );
}

export default Home;
