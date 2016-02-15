
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

import { Optimist } from '../src'
import optimist from 'redux-optimist'


function fakePost() {
  return new Promise((resolve, reject) => {
    // setTimeout(() => resolve({ response: 123 }), 1000)
    setTimeout(() => reject(new Error('some error')), 1000)
  })
}


function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO': return state.concat([ action.text ])
    default: return state
  }
}

function status(state = { writing: false, error: null }, action) {
  switch (action.type) {
    case 'ADD_TODO'         : return { writing: true, error: null }
    case 'ADD_TODO:commit'  : return { writing: false, error: null }
    case 'ADD_TODO:revert'  : return { writing: false, error: action.error }
    default: return state
  }
}

let App = connect(state => state)(
class App extends Component {
  static contextTypes = {
    optimist: PropTypes.func
  }
  add = async action => {
    let o = this.context.optimist('ADD_TODO'),
      dispatch = this.props.dispatch

    dispatch(o.begin({ text: action.text }))
    try{
      dispatch(o.commit({
        respose: (await fakePost({ text: action.text })).response
      }))
    }
    catch(error) {
      dispatch(o.revert({ error }))
    }

  }
  componentDidMount() {
    this.add({ text: 'add me' })
  }
  render() {
    return (<div>
      {JSON.stringify(this.props.todos)}
      <br/>
      {JSON.stringify(this.props.status)}
    </div>)
  }
})

const reducers = {
  todos,
  status
}

class ORoot extends Component {
  store = createStore(optimist(combineReducers(reducers)));
  render() {
    return (<Provider store={this.store}>
      <Optimist>
        {this.props.children}
      </Optimist>
    </Provider>)
  }
}

render(<ORoot><App/></ORoot>, document.getElementById('app'))
