import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from "../constants"

const initial_state = {
  data: [],
  dataFetching: false,
  isFetching: false,
  error: false
}

export default function dataReducer(state = initial_state, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
