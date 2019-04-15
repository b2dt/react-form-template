import * as React from 'react'
import Form from "../form/form";

export default class FormSection extends Form {
	constructor(props) {
		super(props)
	}
	
	render() {
		const {props} = this
		let formFields = this.createForm()
		return (
			<div className={"form-section"}>
				<div className={"form-section-title"}>{props.title}</div>
				<div className={"title-separator"}/>
				{formFields}
			</div>
		)
	}
}