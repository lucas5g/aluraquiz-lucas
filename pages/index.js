import db from '../db.json'
import styled from 'styled-components'
import  Widget  from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GithubCorner'


export const QuizContainer = styled.div`
    width: 100%;
    max-width: 350px;
    padding-top: 45px;
    margin: auto 10%;
    @media screen and (max-width: 500px){
        margin: auto;
        padding: 15px;
    }

`

function Home() {
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <Widget>
                    <Widget.Header>
                        <h1>teste</h1>
                    </Widget.Header>
                    <Widget.Content>


                        <p>lorem</p>
                    </Widget.Content>
                </Widget>
                <Footer />
            </QuizContainer>
            <GitHubCorner projectUrl='https:github.com/lucas5g'/>

        </QuizBackground>
    )
}

export default Home