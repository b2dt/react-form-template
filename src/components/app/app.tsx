import * as React from 'react'
import {Form, Section} from "react-lightning-form";
import {Test} from "../../data";

export interface AppPageProps {

}

export default class App extends React.Component<AppPageProps, any> {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}
	
	componentDidMount() {
	
	}
	
	onSubmit(formState: any) {
		console.log(formState)
	}
	
	render() {
		return (
			<div id="app">
				<Form
					id="termination-request-form"
					title="Termination Request Form"
					onSubmit={this.onSubmit}
					columns={4}
				>
					<input
						id="submitted-by"
						type="text"
						value="Brent Thoenen"
						label="Submitted By"
						disabled={true}
					/>
					<Section
						title="Search Family/Policy Number"
						columns={1}
						data={Test.searchPolicyNum}/>
					<Section
						title="Termination Information"
						columns={3}
						data={Test.information}/>
				</Form>
			</div>
		)
	}
}