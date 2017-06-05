const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24},
  { name: 'Jason', age: 44}
]
const baseurl = "https://itunes.apple.com/search?entity=musicVideo"

export default (query) => {
  console.log("API CALL QUERY: " + query);
  if (!query) {
    console.log("API CALL EMPTY QUERY")
    return null;
  }
  const url = baseurl + "&term=" + encodeURIComponent(query.trim())
  console.log("URL: " + url)
  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .catch((error) => {
      console.log("ERROR": error)
    })
}
