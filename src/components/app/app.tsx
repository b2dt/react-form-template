import * as React from 'react'
import {renderRoutes} from 'react-router-config'
import {RouteComponentProps} from "react-router";


export interface AppPageProps extends RouteComponentProps<any> {

}

export default class App extends React.Component<AppPageProps, any> {
	constructor(props) {
		super(props)
		
	}
	
	componentDidMount() {
	
	}
	
	componentDidUpdate(prevProps, prevState) {
	
	}
	
	render() {
		const {props} = this
		
		return (
			<div id="app">
				hello world
			</div>
		)
	}
}