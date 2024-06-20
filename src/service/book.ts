import { client } from '../api/client'
import { newBooksEndpoint, bookEndpoint } from '../api/endpoint'

async function requestNewBooks () {
  const { data } = await client.get(newBooksEndpoint)
  return data
}

async function requestBook (params:string) {
  const { data } = await client.get(bookEndpoint + params)
  return data
}

export { requestNewBooks, requestBook }
