import * as React from 'react'
import Form from '../form/form';
import FormSection from "../formSection/formSection";
import {FlatState, InputType} from "../../utility/formUtil";
import {Convert} from "../../utility/converter";
import {Validate} from "../../utility/validation";
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
	
	submitForm(form: FlatState[]) {
		let jsonForm = Convert.flatState.to.json(form)
		console.log(jsonForm)
	}
	
	render() {
		const {props} = this
		const formProps: FormFieldProps[] = [
			{
				index: 0,
				id: "rus-first-name",
				required: true,
				inputType: InputType.INPUT,
				placeholder: "BRONTS",
				defaultText: "TESTING",
				label: "First Name"
			}, {
				index: 1,
				id: "rus-last-name",
				required: true,
				inputType: InputType.INPUT,
				defaultText: "TESTING",
				label: "Last Name"
			}, {
				index: 2,
				id: "rus-id",
				inputType: InputType.INPUT,
				placeholder: "tso5912",
				defaultText: "TESTING",
				label: "User Id"
			}
		]
		const formProps2: FormFieldProps[] = [
			{
				index: 0,
				id: "zip",
				required: true,
				defaultText: "TESTING",
				inputType: InputType.INPUT,
				validation: Validate.zipCode,
				errorMsg: "Zip code requires 5 characters and only numbers",
				label: "Zip"
			}, {
				index: 1,
				id: "street",
				defaultText: "TESTING",
				required: true,
				inputType: InputType.INPUT,
				label: "Street"
			}, {
				index: 2,
				id: "state",
				inputType: InputType.INPUT,
				defaultText: "Missouri",
				label: "State"
			}, {
				index: 3,
				id: "city",
				inputType: InputType.INPUT,
				defaultText: "Columbia",
				label: "City"
			}
		]
		
		return (
			<div id="app">
				<Form title="NEW CONTAINER FORM" submitForm={this.submitForm}>
					<FormSection title="Subsection 1 Form" columns={2}>
						<FormSection formFields={formProps2}/>
						{/*	<div>
							<input id={"testing-stuff"} type={"text"}/>
						</div>
						<div>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur et libero ac
							fringilla. Vivamus vitae sem iaculis, semper nunc a, ultricies est. Sed sed ipsum velit.
							Praesent aliquet dui quis tellus ornare auctor. Mauris eu magna interdum, pretium dui at,
							porta mi. Maecenas eu condimentum metus. Duis quam nisi, fringilla a augue eu, lacinia
							tempor magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
							inceptos himenaeos.
							<div>
								WHAT UP STUFF
							</div>
						</div>*/}
						<FormSection formFields={formProps} columns={3}/>
					</FormSection>
					<FormSection title="Subsection 2 Form" formFields={formProps2} columns={2}/>
					<FormSection title="Subsection 3 Form" formFields={formProps} columns={3}/>
				</Form>
				{/*<Form
                    title={"Braden lika-do-da-cha-cha"}
                    formFields={formProps}
                    columns={2}
                    submitForm={this.submitForm}
                />*/}
			</div>
		)
	}
}