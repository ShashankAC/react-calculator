import * as actionTypes from '../actions/actionTypes'

const initialState = {
    history: []
}

export default function historyReducer(state=initialState, {type, payload}) {
    switch(type) {
        case actionTypes.ADD_CALCULATION:
            return payload.expression
        case actionTypes.GET_PREVIOUS_CALCULATION:
            return payload.expression
        default:
            return state;
    }
}