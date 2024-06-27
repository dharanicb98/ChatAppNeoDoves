import axios from 'axios';

const baseUrl = 'http://localhost:3001'

export const signIn = async ( payload ) => {
  try {
    const response = await axios.post(baseUrl + "/api/v1/user/signin", payload );
    return response?.data
  }
  catch (e) {
   
    throw new Error(e?.response?.data?.message)
  }

}

export const signUp = async ( payload ) => {
    try {
      const response = await axios.post(baseUrl + "/api/v1/user/signup", payload );
      return response?.data
    }
    catch (e) {
      throw new Error(e?.response?.data?.message)
    }
  
  }