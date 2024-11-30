import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import cheetos from '/cheetos.png'


const Profile = () => {
  const [fullName, setFullName] = useState("Anand Kumar Sharma")
  const [Phone, setPhone] = useState(7701932076)
  const [Email, setEmail] = useState("anandkumarsharma93068@gmail.com")
  const [Username, setUsername] = useState("Anand930");
  const [Editable, setEditable] = useState(false)
  return (
    <div>
      <Navbar />
      <div className='text-center'>
        <div className='flex items-center justify-center mt-10'>
          <img className=' border-2 border-pink-500 rounded-full' width={"100px"} height={"100px"} src={cheetos} alt="" />
        </div>
        <div className='my-8 w-1/2 mx-auto'>
          <div className='flex items-center justify-center '>
            <div className='border-2 border-pink-500 w-1/4'>
              FullName
            </div>
            <input type="text" readOnly value={fullName} onChange={(e)=>setFullName(e.target.value)} className='outline-none border-2 border-pink-500 w-3/4 text-center'/>
          </div>
          <div className='flex items-center justify-center'>
            <div className='border-2 border-pink-500 w-1/4'>
              Phone NO.
            </div>
            <input type="text" readOnly={!Editable} value={Phone} onChange={(e)=>setPhone(Number(e.target.value))} className='outline-none  border-2 border-pink-500 w-3/4 text-center'/>
          </div>
          <div className='flex items-center justify-center'>
            <div className='border-2 border-pink-500 w-1/4'>
              Email Id
            </div>
            <input type="text" readOnly={!Editable} value={Email} onChange={(e)=>setEmail(e.target.Email)} className='outline-none border-2 border-pink-500 w-3/4 text-center'/>
          </div>
          <div className='flex items-center justify-center'>
            <div className='border-2 border-pink-500 w-1/4'>
              Username
            </div>
            <input type="text" readOnly={!Editable} value={Username} onChange={(e)=>setUsername(e.target.Username)} className='outline-none border-2 border-pink-500 w-3/4 text-center'/>
          </div>
          <div className='flex items-center justify-end mx-2 my-5 gap-5 '>
          <button className='border-2 border-pink-500 px-1 py-1 rounded-lg' onClick={()=>setEditable((val)=>!val)}>{Editable?"Save":"Edit"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
