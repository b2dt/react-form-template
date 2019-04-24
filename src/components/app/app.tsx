import * as React from 'react'
import Form from '../form/form';
import {InputType} from "../../models/inputType";
import FormSection from "../formSection/formSection";
import {FormFieldProps} from "../../models/formFieldProps";

export interface AppPageProps {

}

export default class App extends React.Component<AppPageProps, any> {
	constructor(props) {
		super(props)
		this.submitForm = this.submitForm.bind(this)
	}
	
	componentDidMount() {
	
	}
	
	componentDidUpdate(prevProps, prevState) {
	
	}
	
	submitForm(formFields: FormFieldProps[]) {
	
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
		const formProps2 = [
			{
				index: 0,
				id: "zip",
				required: true,
				inputType: InputType.Text,
				label: "Zip"
			}, {
				index: 1,
				id: "street",
				required: true,
				inputType: InputType.Text,
				label: "Street"
			}, {
				index: 2,
				id: "state",
				inputType: InputType.Text,
				defaultText: "Missouri",
				label: "State"
			}, {
				index: 3,
				id: "city",
				inputType: InputType.Text,
				defaultText: "Columbia",
				label: "City"
			}
		]
		
		return (
			<div id="app">
				<Form title="NEW CONTAINER FORM" submitForm={this.submitForm}>
					<FormSection title="Subsection 1 Form" formFields={formProps} inputsPerRow={1}/>
					<FormSection title="Subsection 2 Form" formFields={formProps2} inputsPerRow={2}/>
					<FormSection title="Subsection 3 Form" formFields={formProps} inputsPerRow={3}/>
				</Form>
				<Form
					title={"Braden lika-do-da-cha-cha"}
					formFields={formProps}
					inputsPerRow={2}
					submitForm={this.submitForm}
				/>
			</div>
		)
	}
}