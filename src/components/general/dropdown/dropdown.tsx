import * as React from 'react'
import classNames from 'classnames'
import * as _ from 'lodash'

export interface DropdownState {
  focused: boolean
}

export interface DropdownProps {
  id?: string
  classes?: string
  label?: string
  icon: string
  items: any[]
  selectedValue: any
  onSelect: (id: string) => any
}

export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props){
    super(props)    
    this.select = this.select.bind(this)
    this.getLabel = this.getLabel.bind(this)
    this.state = {
      focused: false
    }
  }
  select(e){
    this.props.onSelect(e.target.value)
  }
  setFocused(focused: boolean){
    this.setState({focused})
  }
  getLabel(){
    if(this.props.label){
      return(
        <div className="dropdown__label">
          <h1>{this.props.label}</h1> 
        </div>
      )
    }
    return null
  }
  render(){
    const {state, props} = this,
          id = props.id || '',    
          classes = classNames(
            props.classes ? `${props.classes} dropdown` : "dropdown",
            {"focused": state.focused}
          ),
          label = this.getLabel()
    
    let {items} = props
    
    if(props.label){
      items = [{id: "", value: props.label}, ...items]
    }
    
    items = items.map(item => <option key={item.id} className="dropdown__option" value={item.id}>{item.value}</option>)

    return(
      <div id={id} className={classes}>
        {label}
        <div className="dropdown__select-wrapper" title={props.selectedValue}>
          <i className={`dropdown__user-icon ${props.icon}`}/>
          <select 
            className="dropdown__select" 
            value={props.selectedValue} 
            onFocus={() => this.setFocused(true)}
            onBlur={() => this.setFocused(false)}
            onChange={this.select}
          >
            {items}
          </select>
        </div>
      </div>
    )
  }
}