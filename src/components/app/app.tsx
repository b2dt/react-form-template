import * as React from 'react'
import {renderRoutes} from 'react-router-config'
import {RouteComponentProps} from "react-router";
import Form from '../form/form';
import {InputType} from "../../models/inputType";

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
		const formProps = [
			{
				id: "rus-name",
				required: true,
				inputType: InputType.Text,
				defaultText: "BRONTS",
				label: "First Name"
			},
			{
				id: "rus-id",
				inputType: InputType.Text,
				defaultText: "tso5912",
				label: "User Id"
			}
		]
		
		return (
			<div id="app">
				<Form
					formFields={formProps}
					inputsPerRow={2}
				/>
			</div>
		)
	}
}