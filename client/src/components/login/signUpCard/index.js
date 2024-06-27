import React, { useState } from 'react'
import { signUp } from '../../../services/login';
import {useNavigate} from 'react-router-dom'

function SignUpCard({setLoginType}) {
  const [payload, setPayload]  = useState({  email:'', username:'', password:''});
  
  const navigate = useNavigate()

  async function handleSignUp() {
    try {
       if (!payload?.email){
        alert('Email Required')
        return
       }
       if (!payload?.username){
        alert('user_name Required')
        return
       }
       if (!payload?.password){
        alert('password Required')
        return
      }
       await signUp(payload);
       setLoginType('sign-in')
    }
    catch (e) {
      alert(e?.message)
    }
  }
  
  
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-blue-500'>
      <div className='bg-white p-10 rounded-md'>

      <div className='flex flex-col mt-4'>
            <label className='text-slate-500'>User Name</label>
            <input className='border rounded-md p-2' value={payload?.username} onChange={(e) => setPayload((prev) => ({...prev, username:e.target.value}))}/>
        </div>

        <div className='flex flex-col mt-4'>
            <label className='text-slate-500'>Email</label>
            <input className='border rounded-md p-2' value={payload?.email} onChange={(e) => setPayload((prev) => ({...prev, email:e.target.value}))}/>
        </div>


        <div className='flex flex-col mt-4'>
            <label className='text-slate-500'>Password</label>
            <input className='border rounded-md p-2' value={payload?.password} onChange={(e) => setPayload((prev) => ({...prev, password:e.target.value}))}/>
        </div>

        <div className='bg-blue-500 text-center text-white mt-3 p-2 rounded-md hover:bg-blue-700 cursor-pointer' onClick={handleSignUp}>Sign up</div>

        <div className='mt-3'>
            Don't have an account please <span onClick={() => setLoginType('sign-in')} className='underline cursor-pointer'>Sign In</span>
        </div>
      </div>
    </div>
  )
}

export default SignUpCard