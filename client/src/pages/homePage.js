import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';

function Homepage() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('/chat');
        window.location.reload()
    }, [navigate]);

  return (
    <div>Homepage</div>
  )
}

export default Homepage