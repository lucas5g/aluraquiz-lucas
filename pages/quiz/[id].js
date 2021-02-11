import React from 'react'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({dbExterno}){
  return(
    <div>

      <QuizScreen 
        externalQuestions={dbExterno.questions}
        bg={dbExterno.bg}
      />
      
    </div>
  )
}

export async function getServerSideProps(context){
  // console.log('Infos que o next da para nós', context.query.id)

  const dbExterno = await fetch('https://aluraquiz-lucas.vercel.app/api/db')
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
  
  // console.log('Infos que o Next da para nós ', context.query.id)
  return {
    props: {
      dbExterno
    },
  }
}