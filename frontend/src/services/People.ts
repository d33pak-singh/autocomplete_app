import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8080/api/v1/people'

const getPeopleList = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}?query=${query}`)
    return response.data
  } catch (error) {
    throw error.response
  }
}

export  {
  getPeopleList
}
