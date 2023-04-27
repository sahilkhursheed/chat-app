import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values, setValue] = useState({
    username:'',
    password:'',
  })

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() =>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[navigate]);
  
  const handleValidation = () => {
    const {username, password} = values;
    if(username.length === "") {
      toast.error("Email and Password is required",toastOptions);
      return false;
  }
    else if(password === "") {
      toast.error("Email and Password is required",toastOptions);
      return false;
    } 
    return true; 
  }

  const handleChange = (event) => {
    setValue({...values,[event.target.name]: event.target.value})
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    if(handleValidation()){
      const {username, password} = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if(data.status === false){
          toast.error(data.msg, toastOptions);
        }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='Logo' />
            <h1>Snappy</h1>
          </div>
          <input type='text' placeholder='Username' name='username' onChange={(e) => handleChange(e)} min="3"/>
          <input type='password' placeholder='Password' name='password' onChange={(e) => handleChange(e)} min="8"/>
          <button type='submit'>Log In</button>
          <span>Don't have an account ? <Link to="/register">Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}
const FormContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color:#131324;
  .brand {
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;
    img{
      height:5rem;
    }
    h1{
      color:white;
      text-transform:uppercase;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
      background-color:transparent;
      border:0.1rem solid #4e0eff;
      padding:1rem;
      border-radius:0.4rem;
      font-size:1rem;
      color:white;
      width:100%;
      &:focus {
        border:0.1rem solid #997af0;
        outline:none;
      }
    }
    button{
      border:none;
      border-bottom:1px solid #131324;
      padding:1rem 2rem;
      border-radius:0.4rem;
      color:white;
      cursor:pointer;
      font-weight:bold;
      font-size:1rem;
      background-color:#997af0;
      text-transform:uppercase;
      text-transition:0.5s ease-in-out;
      &:hover{
        background-color:#4e0eff;
      }
    }
    span{
      color:white;
      text-transform:uppercase;
      a{
        color:#4e0eff;
        text-decoration:none;
        font-weight:bold;
      }
    }
  }

`;
export default Login