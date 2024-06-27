import React, { useState } from 'react'
import SignInCard from '../../components/login/signInCard';
import SignUpCard from '../../components/login/signUpCard';

function Login() {
  const [loginType, setLoginType] = useState('sign-in');


  return (
    <>
      {loginType === 'sign-in' ? 
      <SignInCard loginType={loginType} setLoginType={setLoginType} /> : 
      <SignUpCard loginType={loginType} setLoginType={setLoginType}/>}
    </>
  )
}

export default Login