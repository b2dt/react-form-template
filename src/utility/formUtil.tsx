import * as React from 'react'
import {FormValues} from "../components/form/form";
import FormSection, {FormSectionProps} from "../components/formSection/formSection";
import {FormFieldProps} from "../models/formFieldProps";
import {number} from "prop-types";

export interface UpdateObj {
    sectionIndex?: number,
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
    mapper: {
        element: {
            sections: (children: JSX.Element[] | any, parentSectionProps: FormSectionProps) => {
                // console.log("About to map...", children, children.props)
                return React.Children.map(children, (child: JSX.Element, sectionIndex) => {
                    if (child.type.name == InputType.FORM_SECTION) {
                        if (child.props.children == null) {
                            return FormUtil.create.sectionProps(child.props, sectionIndex, parentSectionProps)
                        } else {
                            return {
                                ...child.props,
                                formSectionValues: FormUtil.mapper.element.sections(child.props.children, child.props)
                            }
                        }
                    } else {
                        if (child.props.children == null) {
                            console.log("No Children on current generic node: ", child.type, child)
                            let newProps = {index: sectionIndex}
                            return React.cloneElement(child, newProps)
                        } else {
                            console.log("Children on current generic node: ", child.type, child)
                            let newProps = {index: sectionIndex}
                            return React.cloneElement(child, newProps)
                        }
                    }
                })
            },
        }
    },
    state: {
        update: (fieldInfo: UpdateObj, formState: FormValues) => {
            if (fieldInfo.sectionIndex == undefined) { //Means not in a FormSection => no children

            }
            return null;
        },
        to: {
            sections: (state: FormSectionProps[] | JSX.Element[]) => {
                return null
            }
        }
    },
    create: {
        state: (children: JSX.Element[] | any) => {
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
