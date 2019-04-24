import "@babel/polyfill";
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from "./components/app/app";

require('./components/app/app.scss')

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)