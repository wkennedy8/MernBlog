import React, { useState, useContext } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import AuthModal from './AuthModal'
import axios from 'axios'

const Navigation = () => {
  const [modalShow, setModalShow] = useState(false)
  const { currentUser, setCurrentUser } = useContext(AuthContext)

  const handleSignout = async () => {
    const token = localStorage.getItem('token')
    await axios({
      method: 'POST',
      url: '/users/logout',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem('token')
        setCurrentUser(null)
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand>
          <Link to='/'>Mern Blog</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Item>
              <Link to='/'>Home</Link>
            </Nav.Item>
            {currentUser && (
              <Nav.Item className='ml-4'>
                <Link to='/dashboard'>Dashboard</Link>
              </Nav.Item>
            )}
            <Nav.Item
              className='ml-4'
              onClick={() => {
                currentUser ? handleSignout() : setModalShow(true)
              }}
            >
              {currentUser ? 'Sign Out' : 'Login'}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AuthModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default Navigation
