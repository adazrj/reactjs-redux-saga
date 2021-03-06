import { createReducer } from 'reduxsauce'
import * as Types from './actionType'

const INITIAL_STATE = {
  items: [],
  processing: false,
}

function handleAddStar(state = INITIAL_STATE, { payload }) {
  // actually you should send the reauest to the server ,but here just save locally
  console.log('add handleAddStar', payload)
  return {
    ...state,
    items: [...state.items, payload],
  }
}

function handleRemoveStar(state = INITIAL_STATE, { payload }) {
  // actually you should send the reauest to the server ,but here just save locally
  console.log('remove handleRemoveStar', payload)
  return {
    ...state,
    items: state.items.filter(item => item._id !== payload),
  }
}

function handleGetStarSuccessed(state = INITIAL_STATE, { payload }) {
  return {
    ...state,
    processing: false,
    items: payload.starsData.length === 0 ? state.items : payload.starsData,
    // todo server
  }
}

function handleGetStarFailed(state = INITIAL_STATE, { payload }) {
  console.error(payload)
  return {
    ...state,
    processing: false,
  }
}

function handleGetStarRequest(state = INITIAL_STATE) {
  return {
    ...state,
    processing: true,
  }
}
export const HANDLERS = {
  [Types.GETSTAR_REQUEST]: handleGetStarRequest,
  [Types.GETSTAR_SUCCESS]: handleGetStarSuccessed,
  [Types.GETSTAR_FAILURE]: handleGetStarFailed,
  [Types.REMOVESTAR_REQUEST]: handleRemoveStar,
  [Types.ADDSTAR_REQUEST]: handleAddStar,
}

export default createReducer(INITIAL_STATE, HANDLERS)
