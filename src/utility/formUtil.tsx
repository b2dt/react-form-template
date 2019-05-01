import * as React from 'react'
import {FormSectionProps} from "../components/formSection/formSection";

export interface UpdateObj {
	sectionIndices?: number[],
	fieldIndex: number,
	newVal: string
}

export const enum InputType {
	FORM_SECTION = "FormSection",
	FORM = "Form",
	INPUT = "input",
	TEXTAREA = "textarea",
	CHECKBOX = "checkbox",
	BUTTON = "button",
	DROPDOWN = "dropdown",
}

export const FormUtil: any = {
	typecheck: {
		formSection: (object: any): object is FormSectionProps => {
			return !('type' in object)
		}
	},
	mapper: {
		element: {
			sections: (children: JSX.Element[] | any, parentSectionProps: FormSectionProps) => {
				return React.Children.map(children, (child: JSX.Element, sectionIndex) => {
					if (child.type.name == InputType.FORM_SECTION) {
						if (child.props.children == null) {
							return FormUtil.create.sectionProps(child.props, sectionIndex, parentSectionProps)
						} else {
							return {
								...child.props,
								formSectionValues: FormUtil.mapper.element.sections(child.props.children, child.props),
							}
						}
					} else {
						if (child.props.children == null) {
							let newProps = {index: sectionIndex}
							return React.cloneElement(child, newProps)
						} else {
							let newProps = {index: sectionIndex}
							return React.cloneElement(child, newProps)
						}
					}
				})
			},
		}
	},
	state: {
		update: (fieldInfo: UpdateObj, sectionProps: any[])=> {
			let currIndex = fieldInfo.sectionIndices[0]
			fieldInfo.sectionIndices.splice(0, 1)
			let newSectionProps = sectionProps[currIndex]
			
			if (newSectionProps.formSectionValues != undefined) {
				FormUtil.state.update(fieldInfo, newSectionProps.formSectionValues)
			} else {
				newSectionProps.formFields[fieldInfo.fieldIndex].defaultText = fieldInfo.newVal
			}
		},
	},
	create: {
		state: (children: JSX.Element[] | any): FormSectionProps => {
			return FormUtil.mapper.element.sections(children, null);
		},
		sectionProps: (props: FormSectionProps, sectionIndex: number, parentProps: FormSectionProps) => {
			return {
				formFields: props.formFields,
				formSectionValues: props.formSectionValues,
				title: props.title,
				columns: props.columns == null ? parentProps.columns : props.columns,
				updateFieldVal: props.updateFieldValue,
				index: sectionIndex
			}
		},
	},
	validate: {}
}
