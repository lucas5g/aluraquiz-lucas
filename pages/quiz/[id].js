import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({dbExterno}){
  return(
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen externalBg={dbExterno.bg} />
      </ThemeProvider>
    // <div>
    //   <QuizScreen 
    //     externalQuestions={dbExterno.questions}
    //     bg={dbExterno.bg}
    //   />
    // </div>
  )
}

export async function getServerSideProps(context){
  // console.log('Infos que o next da para nós', context.query.id)
  const [projectName, githubUser] = context.query.id.split('__')
  try{

    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if(respostaDoServer.ok){
        return respostaDoServer.json()
      }
      throw new Error('Falha em pegar os dados')
    })
    .then((respostaConvertidaemObjeto) => respostaConvertidaemObjeto)
    .catch((err) => {
      console.error(err)
    })
    
    // console.log('Infos que o Next da para nós ', context.query.id)
    return {
      props: {
        dbExterno
      },
    }
  } catch(err){
    throw new Error(err)
  }

}