import React, { useState, useEffect, useContext } from 'react'
import { Container, Button, Row, Col, Card } from 'react-bootstrap'
import { AuthContext } from '../context/auth'
import EditBlogModal from '../components/EditBlogModal'
import axios from 'axios'

const Dashboard = ({ history }) => {
  const { currentUser } = useContext(AuthContext)
  const [articles, setArticles] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [blogToEdit, setBlogToEdit] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`/articles/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => setArticles(data))
    }
  }, [currentUser, articles])

  const handleAdd = () => {
    if (currentUser) {
      history.push('/add-blog')
    }
  }

  const handleDelete = id => {
    axios({
      method: 'DELETE',
      url: `/articles/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
  }
  return (
    <div className='mt-4'>
      <h3 style={{ textAlign: 'center' }}>Dashboard</h3>
      <Container>
        <h4>Your Blog Posts</h4>
        {articles.length < 1 ? (
          <p>You have not posted a blog.</p>
        ) : (
          articles.map(article => (
            <Container key={article._id}>
              <Row>
                <Col sm={8}>
                  <Card>
                    <Card.Header>{article.title}</Card.Header>
                    <Card.Body>{article.article}</Card.Body>
                    <Card.Footer>{article.author}</Card.Footer>
                  </Card>
                </Col>

                <Col xs={12} md={8}>
                  <Button
                    onClick={() => {
                      setBlogToEdit(article._id)
                      setModalShow(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='danger'
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </Container>
          ))
        )}

        <Button variant='success' onClick={handleAdd} className='mt-4'>
          Add a Blog
        </Button>
      </Container>
      {blogToEdit && (
        <EditBlogModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={blogToEdit}
          token={token}
        />
      )}
    </div>
  )
}

export default Dashboard
