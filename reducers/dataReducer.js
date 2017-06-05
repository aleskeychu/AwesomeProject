import { QUERY_CHANGED, FETCHING_DATA, FETCHING_DATA_SUCCESS,
         FETCHING_DATA_FAILURE, PAGE_FORWARD, PAGE_BACKWARD,
         OPEN_LABEL, CLOSE_LABEL } from "../constants"

const initial_state = {
  data: [],
  max_page: 0,
  query: "",
  dataFetching: false,
  isFetching: false,
  error: false,
  page: 0,
  labelOpened: false,
  labelIndex: -1
}

export default function dataReducer(state = initial_state, action) {
  switch (action.type) {
    case OPEN_LABEL:
      console.log("REDUCE OPEN_LABEL")
      return {
        ...state,
        labelOpened: true,
        labelIndex: action.index
      }
    case CLOSE_LABEL:
      console.log("REDUCE CLOSE_LABEL")
      return {
        ...state,
        labelOpened: false,
        labelIndex: -1
      }
    case FETCHING_DATA:
      console.log("REDUCE FETCHING_DATA")
      return {
        ...state,
        data: [],
        max_page: 0,
        isFetching: true
      }
    case FETCHING_DATA_SUCCESS:
      console.log("REDUCE FETCHING_DATA_SUCCESS")
      return {
        ...state,
        isFetching: false,
        data: action.data,
        max_page: Math.ceil(action.data.length / 10),
        page: 0
      }
    case FETCHING_DATA_FAILURE:
      console.log("REDUCE FETCHING_DATA_FAILURE")
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case QUERY_CHANGED:
      console.log("REDUCE QUERY_CHANGED")
      return {
        ...state,
        query: action.query
      }
    case PAGE_FORWARD:
      console.log("REDUCE PAGE_FORWARD")
      return {
        ...state,
        page: state.page < state.max_page ? state.page + 1 : state.page
      }
    case PAGE_BACKWARD:
      console.log("REDUCE PAGE_BACKWARD")
      return {
        ...state,
        page: state.page > 0 ? state.page - 1 : state.page
      }
    default:
      return state
  }
}
