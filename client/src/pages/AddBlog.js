import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import axios from 'axios'

const AddBlog = ({ history }) => {
  const [formData, setFormData] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleBlogSubmit = e => {
    const token = localStorage.getItem('token')
    e.preventDefault()
    axios({
      method: 'POST',
      url: '/articles/add',
      headers: { Authorization: `Bearer ${token}` },
      data: formData
    }).then(() => history.push('/dashboard'))
  }
  return (
    <div>
      <h3 className='mt-4' style={{ textAlign: 'center' }}>
        Add a Blog
      </h3>
      <Container>
        <Form onSubmit={handleBlogSubmit}>
          <Form.Group controlId='formBasicTitle'>
            <Form.Label>Title: </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              name='title'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicArticle'>
            <Form.Label>Body: </Form.Label>
            <Form.Control
              as='textarea'
              rows='10'
              placeholder='Write your blog here...'
              name='article'
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formBasicAuthor'>
            <Form.Label>Written By:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Author Name'
              name='author'
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default AddBlog
