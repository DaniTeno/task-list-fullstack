export const useFetch = async (url, options) => {
  let data
  await fetch(url, options)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => data = json)
    .catch(error => console.log(error))
  return data
}