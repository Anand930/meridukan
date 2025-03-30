import React,{useContext, useState} from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    //form state 
    const [form, setForm] = useState({
            email:"",
            password:"",
        })

        // form change function
        const handleFormChange = (e) =>{
            const {name,value} = e.target
            setForm((prevForm)=>({...prevForm,[name]:value}))
        }

    // login handler function
    const handleLogin = async(e) =>{
        e.preventDefault();
        if(!form.email || !form.password ){
            console.log("All fields are mandatory to fill");
            return;
        }
        const formData = {
        email: form.email,
        password: form.password
    }
        
        try {
            const response = await fetch('http://localhost:3000/api/user/login',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData),
                credentials:'include'
            })

            const userData = await response.json();
            console.log(userData);
            
            setUser(userData.user)
            localStorage.setItem('authenticated',"true")
            navigate('/')
        } catch (error) {
            console.log("Error in Signin ", error);
            alert("Error occured while signIN")
        }
        
    }
  return (
    <div className='items-center justify-center flex flex-col min-h-screen  '>
        <h1 className='text-pink-500 py-4 font-bold text-2xl'>Login</h1>
        <form className='border-4 border-pink-500 p-4 rounded-lg' onSubmit={handleLogin}>
        <Link to={'/'}><p className='text-right  text-pink-500  font-bold text-xl my-[-6px] hover:cursor-pointer '>X</p></Link>

            <div className='my-2'>
                <input className='text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg' type="text" placeholder='Enter Your Email' name="email" onChange={handleFormChange} />
            </div>
            <div className='my-2'>
                <input className='text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg' type="text" placeholder='Enter Your Password' name='password' onChange={handleFormChange}/>
            </div>
            <div className='my-2'>
                <button className='text-pink-500 outline-none border-4 px-2 border-pink-500 h-12 w-80 rounded-lg hover:bg-pink-500 hover:text-white font-bold text-xl'>Login</button>
            </div>
        <p className='text-black text-right'>Create an account <Link to={"/signin"}><span className='hover:cursor-pointer underline text-blue-700 '>Signup</span></Link></p>

        </form>
    </div>
  )
}

export default Login