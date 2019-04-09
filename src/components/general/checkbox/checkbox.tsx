import * as React from 'react'
import classNames from 'classnames'

export interface CheckboxProps {
  id: string
  label: string
  toggled: boolean
  onToggle: () => any
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
  render(){
    const {props, state} = this,
          checkboxClasses = classNames("checkbox", {"toggled": props.toggled})
    return(
      <div id={props.id} className={checkboxClasses} onClick={() => props.onToggle()}>
        <div className="checkbox__label">
          <h1>{props.label}</h1>
        </div>
        <div className="checkbox__field">        
          <i className="far fa-check-circle checkbox__field-icon no"/>        
          <i className="fas fa-check-circle checkbox__field-icon yes"/>        
        </div>
      </div>
    )
  }
}