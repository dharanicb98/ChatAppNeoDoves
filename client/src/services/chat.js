import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL ||  'http://localhost:3001'

export const getUsers = async ( id ) => {
  try {
    const response = await axios.get(baseUrl + `/api/v1/messenger/users/`  )
     return response?.data
  }
  catch (e) {
    throw new Error(e?.response?.data?.message)
  }

}

export const getAllMessages = async ( username ) => {
  try {
    //  const response = await axios.post(baseUrl + `/api/v1/messenger/get-messages`, payload )
    const response = await axios.get(baseUrl + `/api/v1/messenger/messages/` + username )
     return response?.data
  }
  catch (e) {
    throw new Error(e?.response?.data?.message)
  }
}

