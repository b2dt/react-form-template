import * as React from 'react'
import classNames from 'classnames'
import * as _ from 'lodash'

import {MultiSelectionItem} from './multiSelectionItem'

import {Utility} from '../../../utility'

export interface MultiSelectionProps {
  id: string
  label: string
  items: Array<any>
  error?: string
  maxLimit: number
  doReset?: boolean
  onSelect: (items: Array<any>) => any
}

export default class MultiSelection extends React.Component<MultiSelectionProps, any> {
  constructor(props){
    super(props)    
    this.setItems = this.setItems.bind(this)
    this.select = this.select.bind(this)
    this.handleSelectedItems = this.handleSelectedItems.bind(this)
    this.state = {
      items: []
    }
  }
  componentDidMount(){
    const {props} = this
    if(props.items.length > 0){
      this.setItems()
    }
  }
  componentDidUpdate(prevProps, prevState){
    const {props} = this
    if((prevProps.items.length < props.items.length 
      || !Utility.isArrayEqual(prevProps.items, props.items, ['selected', 'priority']))
      || (!prevProps.doReset && props.doReset)){
        this.setItems()
    }
  }
  setItems(){
    const {props} = this
    let updatedItems = [...props.items].map((item) => {return ((item.selected && item.priority) ? {...item} : {...item, selected: false, priority: 0})})
    this.setState({items: updatedItems})
  }
  select(id){
    const {props, state} = this,
          selectedItems = state.items.filter(item => item.selected),
          selectedItem = [...state.items].find(item => item.id === id)

    let items = []
    
    if(selectedItem.selected){
      items = state.items.map(item => {        
        if(item.id !== id && item.priority > selectedItem.priority){          
          item.priority = item.priority - 1
        }
        return item
      })
    }
    else{
      items = state.items
    }
    
    items = items.map(item => {     
      if(item.id === id){
        item.selected = !item.selected
        item.priority = item.selected ? selectedItems.length === 0 ? 1 : selectedItems.length + 1 : 0
      }
      return item
    })

    this.setState({items})
    this.props.onSelect(items)
  }
  handleSelectedItems(){
    const {state} = this
    if(state.items.filter(item => item.selected).length > 0){
      return _.sortBy(state.items, 'priority')
        .filter(item => item.selected)
        .map(item => (
          <div 
            key={item.priority} 
            className="selected-item"
            onClick={() => this.select(item.id)}
          >
            <div className="priority">
              <h1>{item.priority}</h1>
            </div>
            <div className="value">
              <h1>{item.value}</h1>
            </div>
            <div className="remove-icon">
              <i className="far fa-times-circle"/>
            </div>
          </div>
        ))  
    }
    
    return (
      <div className="no-inspection-reasons-selected-message">
        <h1>No {this.props.error} selected. <span className="highlight">(Select {this.props.error} above)</span></h1>
      </div>
    )
  }
  render(){
    const {props, state} = this,
          error = props.error ? props.error : "entries",
          selectedItemCount = state.items.filter(item => item.selected).length
    
    if(props.items.length === 0){
      return null
    }
    
    const items = state.items.map(item => (
      <MultiSelectionItem 
        key={item.id} 
        id={item.id} 
        priority={item.priority}
        value={item.value}
        selected={item.selected}
        disabled={selectedItemCount >= props.maxLimit}
        select={() => this.select(item.id)}
      />
    ))
    
    const selectedItems = this.handleSelectedItems()

    return(
      <div id={props.id} className="multi-selection">
        <div className="multi-selection__label">
          <h1>{props.label} ({selectedItemCount} / {props.items.length})</h1>
        </div>
        <div className="multi-selection__contents">
          <div className="multi-selection__items-wrapper">
            <div className="multi-selection__items scroll-bar light">
              {items}
            </div>    
          </div>    
          <div className="multi-selection__selected-items">
            {selectedItems}
          </div>        
        </div>    
      </div>
    )
  }
}