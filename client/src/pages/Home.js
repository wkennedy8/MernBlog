import React from 'react'
import { Container } from 'react-bootstrap'
import ArticleList from '../components/ArticleList'

const Home = ({ history }) => {
  return (
    <Container>
      <h1 className='mt-4' style={{ textAlign: 'center' }}>
        Mern Blog
      </h1>
      <ArticleList />
    </Container>
  )
}

export default Home
