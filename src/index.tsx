import "@babel/polyfill";
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Store} from 'redux'
import {Provider} from 'react-redux'
import AppWrapper from './components/app/appWrapper'
import {appStore} from './store/store'

require('./components/app/app.scss')

const store: Store<any> = appStore

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={AppWrapper}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)