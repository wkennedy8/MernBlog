import React, { useState, useContext } from 'react'
import { Modal, Button, Form, FormText } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import axios from 'axios'

const AuthModal = props => {
  const history = useHistory()
  const { setCurrentUser } = useContext(AuthContext)
  const [login, setLogin] = useState(true)
  const [signup, setSignup] = useState(false)
  const [formData, setFormData] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAuth = e => {
    e.preventDefault()
    axios
      .post(login ? '/users/login' : '/users/register', formData)
      .then(({ data }) => {
        props.onHide()
        setCurrentUser(data.user)
        localStorage.setItem('token', data.token)
        history.push('/')
      })
      .catch(error => console.log(error))
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
          {login ? 'Login' : 'Register'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAuth}>
          {signup && (
            <Form.Group controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Full Name'
                name='name'
                onChange={handleChange}
              />
            </Form.Group>
          )}
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            {login ? 'Sign In' : 'Create Account'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        {login && (
          <FormText
            style={{ color: 'green' }}
            onClick={() => {
              setSignup(true)
              setLogin(false)
            }}
          >
            Need an account?
          </FormText>
        )}
        {signup && (
          <FormText
            style={{ color: 'green' }}
            onClick={() => {
              setLogin(true)
              setSignup(false)
            }}
          >
            Have an account? Login
          </FormText>
        )}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthModal
