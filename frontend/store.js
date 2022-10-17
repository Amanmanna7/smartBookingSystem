import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

const hostelReducer = (
  state = { allHostels: [], currentHostel: {} },
  action
) => {
  if (action.type == 'setHostels') {
    state.allHostels = action.payload
  } else if (action.type == 'setHostelById') {
    state.currentHostel = action.payload
  }
  return state
}

const rootReducer = combineReducers({
  hostel: hostelReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
