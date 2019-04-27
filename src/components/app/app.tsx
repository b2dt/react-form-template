import * as React from 'react'
import Form from '../form/form';
import FormSection from "../formSection/formSection";
import {FormFieldProps} from "../../models/formFieldProps";
import Input from "../general/input/input";
import {InputType} from "../../utility/formUtil";

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

    submitForm(formFields: FormFieldProps[]) {
        console.log(formFields)
    }

    render() {
        const {props} = this
        const formProps = [
            {
                index: 0,
                id: "rus-first-name",
                required: true,
                inputType: InputType.INPUT,
                placeholder: "BRONTS",
                label: "First Name"
            }, {
                index: 1,
                id: "rus-last-name",
                required: true,
                inputType: InputType.INPUT,
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
        const formProps2 = [
            {
                index: 0,
                id: "zip",
                required: true,
                inputType: InputType.INPUT,
                label: "Zip"
            }, {
                index: 1,
                id: "street",
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
                        <div>
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
                        </div>
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