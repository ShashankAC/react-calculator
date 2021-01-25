import * as actionTypes from './actionTypes'

export function addCalculation(expression) {
    return  {
        type: actionTypes.ADD_CALCULATION,
        payload: {
            expression: expression
        }
    }
}

export function getPreviousCalculation(expression) {
    return  {
        type: actionTypes.GET_PREVIOUS_CALCULATION,
        payload: {
            expression: expression
        }
    }
}