import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'

const ArticlePage = () => {
  const [article, setArticle] = useState(null)
  const [commentInputShow, setCommentInputShow] = useState(false)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const { id } = useParams()

  useEffect(() => {
    getArticle()
    getComments()
  }, [comments])

  const getArticle = async () => {
    await axios.get(`/article/${id}`).then(({ data }) => {
      setArticle(data)
    })
  }

  const getComments = async () => {
    await axios.get(`/${id}/comments`).then(({ data }) => setComments(data))
  }

  const handleCommentSubmit = e => {
    e.preventDefault()
    console.log(text)
    axios({
      method: 'POST',
      url: `/comments/${id}/add`,
      data: { text }
    })
      .then(() => setCommentInputShow(false))
      .catch(error => console.log(error))
  }
  return (
    <Container className='mt-4'>
      <h3>{article && article.title}</h3>
      <p>Written by: {article && article.author}</p>
      <p style={{ whiteSpace: 'pre-line' }}>{article && article.article}</p>
      <Container
        style={{ borderBottom: '1px solid gray' }}
        className='d-flex justify-content-between'
      >
        <h5 className='mt-4'>Comments</h5>
        <span
          className='mt-4'
          onClick={() => setCommentInputShow(!commentInputShow)}
        >
          Leave a Comment
        </span>
      </Container>
      {comments.length < 1 ? (
        <Container>
          <p className='mt-2'>No Comments</p>
        </Container>
      ) : (
        comments.map(comment => (
          <Card key={comment._id} className='mt-2'>
            <Card.Body>{comment.text}</Card.Body>
            <Card.Footer>- @anonymous</Card.Footer>
          </Card>
        ))
      )}
      {commentInputShow && (
        <Form onSubmit={handleCommentSubmit} className='mt-2'>
          <Form.Group>
            <Form.Control
              value={text}
              type='text'
              placeholder='Add your comment here..'
              onChange={e => setText(e.target.value)}
            />
          </Form.Group>
          <Button type='submit'>Add Comment</Button>
        </Form>
      )}
    </Container>
  )
}

export default ArticlePage
