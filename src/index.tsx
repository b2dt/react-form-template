import "@babel/polyfill";
import * as React from 'react'
import {DOMAttributes} from 'react'
import * as ReactDOM from 'react-dom'
import App from "./components/app/app";
import {ValidationType} from "./utility/validation";

require('./components/app/app.scss')

declare module 'react' {


    interface HTMLAttributes<T> extends DOMAttributes<T> {
        validate?: ValidationType | Function;
        index?: number
        label?: string;
        type?: string;
        errormessage?: string;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)