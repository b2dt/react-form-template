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
					<FormSection title="Subsection 1 Form" formFields={formProps} inputsPerRow={1}/>
					<FormSection title="Subsection 2 Form" formFields={formProps} inputsPerRow={2}/>
					<FormSection title="Subsection 3 Form" formFields={formProps} inputsPerRow={3}/>
				</Form>
				<Form
					title={"Braden lika-do-da-cha-cha"}
					formFields={formProps}
					inputsPerRow={2}
					/>
			</div>
		)
	}
}