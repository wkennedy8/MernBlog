import React, { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Article = () => {
  const history = useHistory()
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get('/articles').then(({ data }) => setArticles(data))
  }, [])

  const handleClick = id => {
    history.push(`/articles/${id}`)
  }
  return (
    <Container>
      {articles.map(article => (
        <Card className='mt-4' key={article._id}>
          <Card.Header>
            <span style={{ fontWeight: '700', fontSize: 20 }}>
              {article.title}
            </span>
          </Card.Header>
          <Card.Body>
            {article.article.substring(0, 300)}...
            <br />
            <br />
            <div>
              <Button size='sm' onClick={() => handleClick(article._id)}>
                Read More
              </Button>
            </div>
          </Card.Body>
          <Card.Footer>Author: {article.author}</Card.Footer>
        </Card>
      ))}
    </Container>
  )
}

export default Article
