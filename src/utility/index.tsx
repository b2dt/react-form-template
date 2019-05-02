import * as _ from 'lodash'

export const Utility = {
  exists: val => {
    if(typeof val !== undefined && val !== null){
      return typeof val === 'string' ? val.length > 0 : true      
    }
  },
  isArrayEqual: (x: Array<any>, y: Array<any>, exclusions: Array<string> = []) => {
    return _(_.omit(x, exclusions)).xorWith(_.omit(y, exclusions), _.isEqual).isEmpty()
  },
  disablePageScroll: () => document.body.style.overflow = 'hidden',
  enablePageScroll: () => document.body.style.overflow = 'auto',    
  getRand: (min: number, max: number) => Math.floor((Math.random() * max) + min),
}