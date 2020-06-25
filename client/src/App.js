import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import Home from './pages/Home'
import AddBlog from './pages/AddBlog'
import Navbar from './components/Navbar'
import ArticlePage from './pages/ArticlePage'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/add-blog' component={AddBlog} />
          <Route exact path='/articles/:id' component={ArticlePage} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
