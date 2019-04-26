import * as React from 'react'
import {FormValues} from "../components/form/form";
import FormSection from "../components/formSection/formSection";

export interface UpdateObj {
	sectionIndex?: number,
	fieldIndex: number,
	newVal: string
}

enum Types {
	FORM_SECTION = "FormSection",
	FORM = "FORM"
}

export const FormUtil: any = {
	state: {
		update: (fieldInfo: UpdateObj, formState: FormValues) => {
			if (fieldInfo.sectionIndex == undefined) { //Means not in a FormSection => no children
			
			}
			return null;
		},
		create: (children: JSX.Element[] | any, parentProps: any) => {
			return React.Children.map(children, (child, sectionIndex) => {
				const {props} = child
				if (child.type == undefined)
					return child
				console.log("child type:" + child.type)
				if (child.type.name != undefined && child.type.name == Types.FORM_SECTION) {
					if (props.children == null) {
						console.log("null children")
						console.log(props)
						return props
					} else {
						console.log("not null children")
						console.log(props)
						return FormUtil.state.create(props.children, props)
					}
				} else {
					console.log("Not a form section")
					if (props.children == null) {
						console.log("null children")
						console.log(props)
						return child
					} else {
						console.log("not null children")
						console.log(props)
						return FormUtil.state.create(props.children, props)
					}
				}
			})
		}
	},
	children: {
		create: (children: JSX.Element[] | any, onChange: any) => {
			return React.Children.map(children, (child, sectionIndex) => {
				const {props} = child
				if (child.type.name == Types.FORM_SECTION) {
					console.log(props.title)
					if (props.children == null) {
						return (
							<FormSection
								columns={props.columns}
								title={props.title}
								index={sectionIndex}
								updateFieldValue={onChange}
								formFields={props.formFields}
							/>)
					} else {
						return <FormSection
							columns={props.columns}
							title={props.title}
							index={sectionIndex}
							updateFieldValue={onChange}
							formFields={props.formFields}>
							{FormUtil.children.create(child.props.children, onChange)}
						</FormSection>
					}
				} else {
					if (props.children == null) {
						let props = {onChange: onChange, sectionIndex: sectionIndex, index: 0}
						return React.cloneElement(child, props)
					} else {
						return FormUtil.children.create(child.props.children, onChange)
					}
				}
			})
		}
	},
	validate: {}
}
