import React from 'react'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({db}){
  return(
    <div>
      Desafio da próxima aula junto com as animações
      <QuizScreen />
      <pre style={{color: 'black'}}>
        {JSON.stringify(db.questions, null, 4)}
      </pre>
    </div>
  )
}

export async function getServerSideProps(context){
  console.log('Infos que o next da para nós', context.query.id)

  const db = await fetch('https://aluraquiz-lucas.vercel.app/api/db')
    .then((response) => {
      if(response.ok){
        return response.json()
      }
      throw new Error('Falha em pegar os dados')
    })
    .then((response) => response)
    .catch((err) => {
      console.error(err)
    })
  
  console.log({db})
  console.log('Infos que o Next da para nós ', context.query.id)
  return {
    props: {
      db
    },
  }
}