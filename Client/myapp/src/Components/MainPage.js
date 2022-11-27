import { useNavigate, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

function MainPage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    setUserName(sessionStorage["userFullName"])
  }, [])

  const MoviePage = () => {
    navigate("movies")
  }

  const SubscriptionsPage = () => {
    navigate("subscriptions")
  }

  const Logout = () => {
    navigate("/")
  }

  return (
    <div className='homePage'>
      <div className="top-nav">
        <span className='username-title'>Welcome Back, {userName} </span>
        <button className='btnNavigate' onClick={MoviePage}>Movies</button>
        <button className='btnNavigate' onClick={SubscriptionsPage}>Subscriptions</button>
        <button className='btnNavigate' onClick={Logout}>Log out</button>
      </div>

      <br />
      <Outlet />
    </div>
  )
}

export default MainPage