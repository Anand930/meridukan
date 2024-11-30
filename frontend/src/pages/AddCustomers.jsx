import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const AddCustomers = () => {
    const [fullName,setFullName]  = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("TajNagar")
    return (
        <div>
            <Navbar />
            <div>
                <p className='font-bold text-3xl text-pink-600 flex items-center justify-center my-8 underline'>Customer Register Form</p>
                <div className='my-8 w-1/2 mx-auto'>
                    <div className='flex items-center justify-center '>
                        <div className='border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center'>
                            FullName
                        </div>
                        <input type="text"  value={fullName} onChange={(e) => setFullName(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center' />
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center'>
                            Phone NO.
                        </div>
                        <input type="text" value={Phone} onChange={(e) => setPhone(Number(e.target.value))} className='outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center' />
                    </div>
                    
                    <div className='flex  items-center justify-center'>
                        <div className='border-2 border-pink-500 w-1/4 h-10 flex items-center justify-center'>
                            Address
                        </div>
                        <input type="text"  value={Address} onChange={(e) => setAddress(e.target.Address)} className='outline-none border-2 border-pink-500 flex items-center justify-center h-10 w-3/4 text-center' />
                    </div>
                    <div className='flex items-center justify-end mx-2 my-5 gap-5 '>
                        <button className='border-2 border-pink-500 px-1 py-1 rounded-lg'>Add Customer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCustomers
