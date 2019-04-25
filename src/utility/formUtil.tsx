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
		create: (formState: FormValues, children: JSX.Element[] | any) => {
		
		}
	},
	children: {
		create: (children: JSX.Element[] | any, onChange: any) => {
			return React.Children.map(children, (child, sectionIndex) => {
				const {props} = child
				if (props.children == null) {
					if (child.type.name == Types.FORM_SECTION) {
						return (
							<FormSection
								inputsPerRow={props.inputsPerRow}
								title={props.title}
								index={sectionIndex}
								updateFieldValue={onChange}
								formFields={props.formFields}
							/>)
					} else {
						let props = {onChange: onChange, sectionIndex: sectionIndex, index: 0}
						return React.cloneElement(child, props)
					}
				} else {
					console.log("Nested children...")
					return FormUtil.children.create(child.props.children, onChange)
				}
			})
		}
	},
	validate: {}
}
