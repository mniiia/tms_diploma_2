import { client } from '../api/client'
import { newBooksEndpoint, bookEndpoint, searchEndpoint } from '../api/endpoint'

async function requestNewBooks () {
  const { data } = await client.get(newBooksEndpoint)
  return data
}

async function requestBook (params:string) {
  const { data } = await client.get(bookEndpoint + params)
  return data
}

async function requestSearch (params:string) {
  const { data } = await client.get(searchEndpoint + params)
  return data
}

export { requestNewBooks, requestBook, requestSearch }
