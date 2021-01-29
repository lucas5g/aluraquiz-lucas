/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

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

function QuestionWidget({ question, questionIndex, totalQuestions }) {
    // const questionId = `question__${questionIndex}`;
    // console.log(question)
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
                {/* {console.log(question.alternatives[0])} */}
                {question.alternatives.map((alternative) => 
                    <p>
                        {alternative}
                    </p>
                )}
                {/* <pre>
                    {JSON.stringify(question, null, 4)}
                </pre> */}
                <Button 
                    type="submit"
                    >
                    Confirmar
                </Button>
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
    const totalQuestions = db.questions.length
    const questionIndex = 0
    const question = db.questions[questionIndex]
    return (
        <QuizBackground>
            <QuizContainer>
                <QuizLogo />
                <QuestionWidget
                    question={question}
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}

                />


                <LoadingWidget />
            </QuizContainer>
        </QuizBackground >
    );
}