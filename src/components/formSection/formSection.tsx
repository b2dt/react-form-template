import * as React from 'react'
import Form from "../form/form";

export default class FormSection extends Form {
	constructor(props) {
		super(props)
	}
	
	render() {
		const{props} = this
		let formFields = this.createForm()
		return (
			<div>
				<h1>{props.title}</h1>
				{formFields}
			</div>
		)
	}
}