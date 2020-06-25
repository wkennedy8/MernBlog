import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'

const EditBlogModal = props => {
  const [formData, setFormData] = useState(null)
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    axios.get(`/article/${props.id}`).then(({ data }) =>
      setFormData({
        ...formData,
        title: data.title,
        article: data.article
      })
    )
  }, [])

  const handleEdit = async e => {
    e.preventDefault()
    await axios({
      method: 'PATCH',
      url: `/update/${props.id}`,
      headers: { Authorization: `Bearer ${props.token}` },
      data: formData
    }).then(res => props.onHide())
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit Blog Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group controlId='formBasicTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              value={formData ? formData.title : ''}
              name='title'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicBody'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              as='textarea'
              value={formData ? formData.article : ''}
              name='article'
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditBlogModal
