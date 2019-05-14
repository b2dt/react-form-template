import * as React from "react";
import {FormFieldProps} from "../models/formFieldProps";
import {ColumnRange} from "../models/columnRange";
import Input from "../components/general/input/input";
import classNames from 'classnames'
import * as _ from 'lodash'
import {FlatState, FormUtil, InputType} from "./formUtil";
import FormSection, {FormSectionProps} from "../components/formSection/formSection";
import {FormFunctions} from "../components/form/form";
import Checkbox, {CheckboxState} from "../components/general/checkbox/checkbox";

export const sortFieldProps = (formFields: FormFieldProps[]) => {
	return _.sortBy(formFields, (field) => field.index)
}

export const Convert: any = {
	formFields: {
		to: {
			html: (formFields: FormFieldProps[], numOfColumns: ColumnRange, formFns: FormFunctions) => {
				let sortedFormFields = sortFieldProps(formFields)
				return sortedFormFields.map(field => (Convert.convert(field, numOfColumns, formFns)))
			},
		}
	},
	to: {
		sections: (formSectionProps: FormSectionProps[] | JSX.Element[], formFns: FormFunctions): JSX.Element[] => {
			let returnElements = []
			formSectionProps.forEach((props, index) => {
				if (FormUtil.typecheck.formSection(props)) {
					returnElements.push(
						<FormSection {...props} key={index} formFunctions={formFns} index={index}/>
					)
				} else {
					returnElements.push(props)
				}
			})
			return returnElements
		},
		checkbox: (textProps: FormFieldProps, columnClassName: string, formFns: FormFunctions) => {
			let classes = classNames("field", columnClassName)
			let toggled: boolean = textProps.defaultText == CheckboxState.CHECKED
			return (
				<div className={classes} key={textProps.id}>
					<Checkbox
						id={textProps.id}
						label={textProps.label}
						toggled={toggled}
						onToggle={formFns.updateFieldVal}
						index={textProps.index}
					/>
				</div>
			)
		},
		input: (textProps: FormFieldProps, columnClassName: string, formFns: FormFunctions) => {
			let classes = classNames('field', columnClassName, textProps.classes)
			return (
				<div className={classes} key={textProps.id}>
					<Input
						id={textProps.id}
						classes={"form-text-input"}
						label={textProps.label}
						index={textProps.index}
						formFns={formFns}
						errorMsg={textProps.errorMsg}
						showError={textProps.showError}
						required={textProps.required}
						validationFn={textProps.validation}
						inputProps={{
							type: "text",
							placeholder: textProps.placeholder,
							defaultValue: textProps.defaultText || ""
						}}
					/>
				</div>
			)
		},
		dropdown: (dropdownProps: FormFieldProps, columnClassName: string, formFns: FormFunctions) => {
			let classes = classNames("field", columnClassName)
		},
		textarea: (textAreaProps: FormFieldProps, columnClassName: string, formFns: FormFunctions) => {
			let classes = classNames("field", columnClassName)
		}
	},
	convert: (formProp: FormFieldProps, numOfColumns: ColumnRange, formFns: FormFunctions) => {
		let columnClassName = classNames({"col-one": numOfColumns == ColumnRange.ONE}, {"col-two": numOfColumns == ColumnRange.TWO}, {"col-three": numOfColumns == ColumnRange.THREE})
		if (formProp.inputType == InputType.INPUT)
			return Convert.to.input(formProp, columnClassName, formFns)
		else if (formProp.inputType == InputType.BUTTON)
			return Convert.to.button(formProp, columnClassName, formFns)
		else if (formProp.inputType == InputType.DROPDOWN)
			return Convert.to.dropdown(formProp, columnClassName, formFns)
		else if (formProp.inputType == InputType.TEXTAREA)
			return Convert.to.textarea(formProp, columnClassName, formFns)
		else if (formProp.inputType == InputType.CHECKBOX)
			return Convert.to.checkbox(formProp, columnClassName, formFns)
	},
	flatState: {
		to: {
			json: (flatState: FlatState[]) => {
				let obj = {}
				flatState.map(state => {
					obj[state.id] = state.value
				})
				return obj
			}
		}
	}
}
