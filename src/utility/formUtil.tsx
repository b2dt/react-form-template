import * as React from 'react'
import {FormSectionProps} from "../components/formSection/formSection";
import * as _ from 'lodash'
import {FieldProps} from "../models/formFieldProps";
import {Derive} from "./dervivationUtil";

export interface UpdateObj {
	sectionIndices?: number[],
	fieldIndex: number,
	newVal: string
}

export interface FlatState {
	value: any,
	id: string,
	error: boolean
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
		resetProps: (sectionProps: FormSectionProps[] | JSX.Element[]): void => {
			sectionProps.forEach(props => {
				FormUtil.state.reset(props)
			})
		},
		reset: (props: FormSectionProps): void => {
			if (props.formSectionValues != undefined) {
				FormUtil.state.resetProps(props.formSectionValues)
			}
			if (props.formFields != undefined) {
				props.formFields.forEach(fields => {
					fields.defaultText = ""
				})
			}
		},
		updateValue: (fieldInfo: UpdateObj, sectionProps: any[]) => {
			let currIndex = fieldInfo.sectionIndices[0]
			fieldInfo.sectionIndices.splice(0, 1)
			let newSectionProps = sectionProps[currIndex]
			if (newSectionProps.formSectionValues != undefined && fieldInfo.sectionIndices.length != 0) {
				FormUtil.state.updateValue(fieldInfo, newSectionProps.formSectionValues)
			} else {
				let formField: FieldProps = newSectionProps.formFields[fieldInfo.fieldIndex]
				formField.defaultText = fieldInfo.newVal
				formField.showError = !FormUtil.validate(formField)
				return formField
			}
		},
		updateErrors: (sectionProps: FormSectionProps[]) => {
			sectionProps.forEach(sectProps => {
				if (sectProps.formSectionValues != undefined) {
					FormUtil.state.updateErrors(sectProps.formSectionValues)
				}
				if (sectProps.formFields != undefined) {
					sectProps.formFields.map(field => {
						field.showError = !FormUtil.validate(field)
					})
				}
			})
		},
		flatten: (formProps: FormSectionProps[] | JSX.Element[]): FlatState[] => {
			let flatState: FlatState[] = []
			formProps.forEach(props => {
				if (props.formSectionValues == undefined) {
					props.formFields.forEach(field => {
						if (!(field.defaultText == undefined || field.defaultText.trim() == "") || field.required) {
							flatState.push({
								value: Derive.value.from.formField(field),
								id: field.id,
								error: field.showError
							})
						}
					})
				} else {
					_.merge(flatState, FormUtil.state.flatten(props.formSectionValues))
				}
			})
			return flatState
		}
	},
	create: {
		state: (children: JSX.Element[] | any): FormSectionProps => {
			return FormUtil.mapper.element.sections(children, null);
		},
		sectionProps: (props: FormSectionProps, sectionIndex: number, parentProps: FormSectionProps) => {
			return {
				formFields: _.cloneDeep(props.formFields),
				formSectionValues: _.cloneDeep(props.formSectionValues),
				title: props.title,
				columns: props.columns == null ? parentProps.columns : props.columns,
				formFunctions: props.formFunctions,
				index: sectionIndex
			}
		},
	},
	validate: (formProps: FieldProps): boolean => {
		if (formProps.validation != undefined) {
			return formProps.validation(formProps.defaultText) && Derive.required.from.formField(formProps)
		} else
			return Derive.required.from.formField(formProps)
	}
}