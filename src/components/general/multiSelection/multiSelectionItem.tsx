import * as React from 'react'
import classNames from 'classnames'

import {Utility} from '../../../utility'

export interface MultiSelectionItemProps {
  id: string
  value: string
  priority: number
  selected: boolean  
  disabled: boolean
  select: () => any
}

export const MultiSelectionItem: React.SFC<MultiSelectionItemProps> = ({
  ...props
}) => {  
  if(!Utility.exists(props.id) 
    || !Utility.exists(props.value) 
    || !Utility.exists(props.selected)){
      console.error("Error: Multi-selection items need 'id', 'value', and 'selected' properties and they can't be empty.")
      return null
  }
  
  const classes = classNames(
    "multi-selection__item", 
    {"selected": props.selected},
    {"disabled": !props.selected && props.disabled}
  ),
        priority = props.priority > 0 ? (          
          <div className="multi-selection__item-priority">
            <h1>{props.priority}</h1>
          </div>
        ) : null
    
  return(
    <div key={props.id} className={classes} title={props.value} onClick={props.select}>    
      <div className="multi-selection__item-label">
        <h1>{props.value}</h1>
      </div>
      {priority}
      <div className="multi-selection__item-icon">
        <i className="far fa-check-circle unselected-icon"/>
        <i className="fas fa-check-circle selected-icon"/>
      </div>
    </div>
  )
}