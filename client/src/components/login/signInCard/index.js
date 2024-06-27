import React, { useState } from 'react'
import {signIn} from '../../../services/login';
import { useNavigate } from "react-router-dom";




function SignInCard({setLoginType}) {
  const [payload, setPayload] = useState({email:'', password:''});

  
  const navigate = useNavigate()
 
  async function handleSignIn() {
    try {
      const response =  await signIn(payload);
      console.log('response', response)
      localStorage.setItem('token', response.token);
      navigate('/chat')
      window.location.reload()
    }
    catch (e) {
      console.log('e', e?.message)
      alert(e?.message)
    }
  }
  

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-blue-500'>
      <div className='bg-white p-10 rounded-md'>
       <div className='flex flex-col mt-4'>
            <label className='text-slate-500'>Email</label>
            <input className='border rounded-md p-2' value={payload?.email} onChange={(e) => setPayload((prev) => ({...prev, email:e.target.value}))}/>
        </div>

        <div className='flex flex-col mt-4'>
            <label className='text-slate-500'>Password</label>
            <input className='border rounded-md p-2' value={payload?.password} onChange={(e) => setPayload((prev) => ({...prev, password:e.target.value}))}/>
        </div>

        <div className='bg-blue-500 text-center text-white mt-3 p-2 rounded-md hover:bg-blue-700 cursor-pointer' onClick={handleSignIn}>Sign In</div>

        <div className='mt-3'>
            Don't have an account please <span onClick={() => setLoginType('sign-up')} className='underline cursor-pointer'>Sign up</span>
        </div>
      </div>
    </div>
  )
}

export default SignInCard