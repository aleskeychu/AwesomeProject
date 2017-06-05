import { FETCHING_DATA, FETCHING_DATA_SUCCESS,
         FETCHING_DATA_FAILURE, QUERY_CHANGED,
         PAGE_FORWARD, PAGE_BACKWARD, OPEN_LABEL,
         CLOSE_LABEL } from './constants'

import getPeople from './api'

export function fetchData(query) {
  console.log("ACTION FETCH DATA, QUERY: " + query)
  return {
    type: FETCHING_DATA,
    query: query
  }
}

export function queryChanged(query) {
console.log("ACTION QUERY CHANGED")
  return {
    type: QUERY_CHANGED,
    query: query
  }
}

export function pageForward() {
console.log("ACTION PAGE FORWARD")
  return {
    type: PAGE_FORWARD
  }
}

export function pageBackward() {
  console.log("ACTION PAGE BACKWARD")
  return {
    type: PAGE_BACKWARD
  }
}

export function openLabel(index) {
  console.log("ACTION OPEN LABEL INDEX: " + index)
  return {
    type: OPEN_LABEL,
    index
  }
}

export function closeLabel(index) {
  console.log("ACTION CLOSE LABEL")
  return {
    type: CLOSE_LABEL,
  }
}
