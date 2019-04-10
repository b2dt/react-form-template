import * as React from 'react'
import {renderRoutes} from 'react-router-config'
import {RouteComponentProps} from "react-router";
import Form from '../form/form';
import {InputType} from "../../models/inputType";
import FormSection from "../formSection/formSection";

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
				index: 0,
				id: "rus-first-name",
				required: true,
				inputType: InputType.Text,
				placeholder: "BRONTS",
				defaultText: "",
				label: "First Name"
			}, {
				index: 1,
				id: "rus-last-name",
				required: true,
				inputType: InputType.Text,
				label: "Last Name"
			}, {
				index: 2,
				id: "rus-id",
				inputType: InputType.Text,
				placeholder: "tso5912",
				defaultText: "TESTING",
				label: "User Id"
			}
		]
		
		return (
			<div id="app">
				<Form title="NEW CONTAINER FORM">
					<FormSection title="subsection 1 form" formFields={formProps} inputsPerRow={2}/>
					<FormSection title="subsection 2 form" formFields={formProps} inputsPerRow={2}/>
				</Form>
			</div>
		)
	}
}