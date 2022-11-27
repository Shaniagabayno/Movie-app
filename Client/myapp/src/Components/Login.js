import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import utils from '../Utils';

const authUrl = " http://localhost:2000/api/users/login"
const usersUrl = "http://localhost:2000/api/users"

function Login() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  const [msg, setMsg] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  //Login Button
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await utils.addItem(authUrl, loginData)
      if (data !== null && data.accessToken) {
        //Store The accessToken
        sessionStorage["userToken"] = data.accessToken

        //Compare username to see if they are valid
        if (loginData.username === data.username) {
          const { data: user } = await utils.PrivateData(usersUrl)
          for (const u of user) {
            const userName = u.username
            if (data.username === userName) {
              //Store the name of the user
              sessionStorage["userFullName"] = u.fullname
              navigate("/main")
            }
          }
        }
      } else {
        setMsg(true)

      }
    } catch (error) {
      console.error(error.message);
    }

  }

  const showPass = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <div id='main_bg_wrapper'>
      <h1 id='logo_title'>Marvel Movies</h1>
      <div id='inner-DivLogin'>
        <label className='label_form_login'> Username : </label>
        <input type="text" className='input-InputLogin' name="username" onChange={handleChange} required autoComplete='off' /> <br />
        <label className='label_form_login'>Password :</label>
        <input type={passwordShown ? "text" : "password"} className='input-InputLogin' name="password" onChange={handleChange} required autoComplete='off' /><FaRegEye size=".8em" className='icon' onClick={showPass} /><br />

      </div>
      <input type="button" className='btnLogin' value="Login" onClick={handleLogin} />
      {msg && <div id='warningDiv'><h5 id='msgAlert'>You have entered an invalid username/password !</h5> </div>}
    </div>
  )
}

export default Login