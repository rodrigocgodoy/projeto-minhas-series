import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home'
import Menu from './template/Menu'
import About from './components/About'
import New from './components/NewSeries'
import Series from './components/Series'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Route exact path='/' component={Home} />
          <Route path='/series/:genre' component={Series} />
          <Route exact path='/new' component={New} />
          <Route exact path='/about' component={About} />
        </div>
      </Router>
    )
  }
}

export default App
